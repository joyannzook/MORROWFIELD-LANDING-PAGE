/* ==========================================================================
   Morrowfield Community Finance — Landing Website
   Progressive enhancement and Google Forms enquiry submission.
   ========================================================================== */

(function () {
  "use strict";

  var MOBILE_BREAKPOINT = window.matchMedia("(min-width: 901px)");

  /* ------------------------------------------------------------------
     Express Interest navigation
     ------------------------------------------------------------------ */
  function configureEnquiryLinks() {
    var links = document.querySelectorAll("[data-express-interest]");

    Array.prototype.forEach.call(links, function (link) {
      link.setAttribute("href", "#express-interest");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.addEventListener("click", function () {
        var category = link.getAttribute("data-loan-category");
        if (!category) return;

        var options = document.querySelectorAll(
          'input[name="entry.1754856868"]'
        );
        Array.prototype.forEach.call(options, function (option) {
          option.checked = option.value === category;
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Enquiry form
     ------------------------------------------------------------------ */
  function initInterestForm() {
    var form = document.getElementById("morrowfield-interest-form");
    if (!form) return;

    var whatsappInput = document.getElementById("interest-whatsapp");
    var whatsappMessage = document.getElementById("whatsapp-required-message");
    var status = document.getElementById("interest-form-status");
    var submitButton = document.getElementById("interest-form-submit");
    var target = document.querySelector('iframe[name="morrowfield-form-target"]');
    var contactOptions = form.querySelectorAll('input[name="entry.1289286055"]');
    var submitting = false;
    var submissionTimer = null;
    var awaitingFrameLoad = false;

    function selectedContactMethod() {
      var selected = form.querySelector('input[name="entry.1289286055"]:checked');
      return selected ? selected.value : "";
    }

    function updateWhatsAppRequirement() {
      var whatsappSelected = selectedContactMethod() === "WhatsApp";
      whatsappInput.required = whatsappSelected;
      whatsappMessage.hidden = !whatsappSelected;
      whatsappInput.setAttribute("aria-required", String(whatsappSelected));
      if (whatsappSelected && !whatsappInput.value.trim()) {
        whatsappInput.setAttribute("aria-describedby", "whatsapp-required-message");
      } else {
        whatsappInput.removeAttribute("aria-describedby");
      }
    }

    Array.prototype.forEach.call(contactOptions, function (option) {
      option.addEventListener("change", updateWhatsAppRequirement);
    });
    updateWhatsAppRequirement();

    function setStatus(message, kind) {
      status.textContent = message;
      status.className = "form-status" + (kind ? " form-status--" + kind : "");
    }

    function validateForm() {
      updateWhatsAppRequirement();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (selectedContactMethod() === "WhatsApp" && !whatsappInput.value.trim()) {
          setStatus("Please enter your WhatsApp number because WhatsApp is your selected contact method.", "error");
          whatsappInput.focus();
        } else {
          setStatus("Please complete all required fields before submitting.", "error");
        }
        return false;
      }

      if (selectedContactMethod() === "WhatsApp" && !whatsappInput.value.trim()) {
        setStatus("Please enter your WhatsApp number because WhatsApp is your selected contact method.", "error");
        whatsappInput.focus();
        return false;
      }
      return true;
    }

    if (target) {
      target.addEventListener("load", function () {
        if (!awaitingFrameLoad || !submitting) return;
        awaitingFrameLoad = false;
        window.clearTimeout(submissionTimer);
        submitting = false;
        submitButton.disabled = false;
        submitButton.textContent = "Submit Expression of Interest";
        setStatus("Your submission request has been sent. This page cannot independently confirm that Google Forms stored it. Morrowfield will follow up using your selected contact method.", "success");
        form.reset();
        updateWhatsAppRequirement();
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (submitting || !validateForm()) return;

      submitting = true;
      awaitingFrameLoad = true;
      submitButton.disabled = true;
      submitButton.textContent = "Submitting…";
      setStatus("Submitting your expression of interest…", "pending");

      submissionTimer = window.setTimeout(function () {
        if (!submitting) return;
        submitting = false;
        awaitingFrameLoad = false;
        submitButton.disabled = false;
        submitButton.textContent = "Submit Expression of Interest";
        setStatus("We could not confirm the submission in this browser. Please try again. If the problem continues, contact Morrowfield through an approved channel.", "error");
      }, 15000);

      HTMLFormElement.prototype.submit.call(form);
    });
  }

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  function initNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");

    if (!toggle || !nav) return;

    function setNav(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      setNav(false);
      toggle.focus();
    });

    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setNav(false);
    });

    function handleBreakpoint(event) {
      if (event.matches) setNav(false);
    }

    if (typeof MOBILE_BREAKPOINT.addEventListener === "function") {
      MOBILE_BREAKPOINT.addEventListener("change", handleBreakpoint);
    } else if (typeof MOBILE_BREAKPOINT.addListener === "function") {
      MOBILE_BREAKPOINT.addListener(handleBreakpoint);
    }
  }

  /* ------------------------------------------------------------------
     Maintainable copyright year
     ------------------------------------------------------------------ */
  function initYear() {
    var yearEl = document.getElementById("year");
    if (!yearEl) return;

    var currentYear = new Date().getFullYear();
    if (currentYear > 0) yearEl.textContent = String(currentYear);
  }

  function init() {
    configureEnquiryLinks();
    initInterestForm();
    initNavigation();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
