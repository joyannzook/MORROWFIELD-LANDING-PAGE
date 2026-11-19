/* ==========================================================================
Morrowfield Community Finance — Landing Website
Lightweight progressive enhancement only.
The website must remain usable if this file fails to load.
#ERROR!

(function () {
use strict;

/* ------------------------------------------------------------------
CONFIGURATION — SINGLE SOURCE OF TRUTH
------------------------------------------------------------------
Replace the placeholder below with the approved Google Form URL.

Example:
var GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/FORM_ID/viewform";

This is the ONLY place the enquiry destination is defined. Every
Express Interest link on the page is wired from this value.

If this value is left unconfigured, the links keep their in-page
fallback and a console warning is emitted. The site is NOT to be
declared integration-complete until this is set and verified.
------------------------------------------------------------------ */
var PLACEHOLDER = "REPLACE_WITH_GOOGLE_FORM_URL";
var GOOGLE_FORM_URL = PLACEHOLDER;

var MOBILE_BREAKPOINT = window.matchMedia("(min-width: 901px)");

/* ------------------------------------------------------------------
Enquiry links
------------------------------------------------------------------ */
function isConfigured(url) {
return (
typeof url === "string" &&
url !== PLACEHOLDER &&
url.length > 0 &&
/^https:\/\//i.test(url)
);
}

function configureEnquiryLinks() {
var links = document.querySelectorAll("[data-express-interest]");

if (!isConfigured(GOOGLE_FORM_URL)) {
if (window.console && console.warn) {
console.warn(
  "[Morrowfield] GOOGLE_FORM_URL is not configured. " +
  "Express Interest links remain at their in-page fallback. " +
  "See README → Integration blockers."
);
}
return;
}

Array.prototype.forEach.call(links, function (link) {
var label = link.getAttribute("aria-label") || link.textContent.trim();

link.setAttribute("href", GOOGLE_FORM_URL);
link.setAttribute("target", "_blank");
link.setAttribute("rel", "noopener noreferrer");
link.setAttribute("aria-label", label + " (opens the enquiry form in a new tab)");
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

/* ------------------------------------------------------------------
Initialise
------------------------------------------------------------------ */
function init() {
configureEnquiryLinks();
initNavigation();
initYear();
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();
