/* Morrowfield enquiry form and responsive navigation */
(function () {
  "use strict";
  var desktop = window.matchMedia("(min-width: 901px)");
  function initInterestForm() {
    var form=document.getElementById("morrowfield-interest-form"), toggle=document.getElementById("interest-form-toggle");
    if(!form||!toggle)return;
    var whatsapp=document.getElementById("interest-whatsapp"), hint=document.getElementById("whatsapp-required-message");
    var status=document.getElementById("interest-form-status"), submit=document.getElementById("interest-form-submit"), clearButton=document.getElementById("interest-form-clear");
    var confirmationDialog=document.getElementById("submission-confirmation");
    var confirmationMessage=document.getElementById("submission-confirmation-message");
    var confirmationReminder=document.getElementById("submission-confirmation-reminder");
    var confirmationClose=document.getElementById("submission-confirmation-close");
    var submitting=false;
    function selected(name){return form.querySelector('input[name="'+name+'"]:checked');}
    function setStatus(message,kind){status.textContent=message;status.className="form-status"+(kind?" form-status--"+kind:"");}
    function clearError(field,error){
      field.classList.remove("is-invalid");error.textContent="";error.hidden=true;
      field.querySelectorAll("input").forEach(function(input){input.removeAttribute("aria-invalid");});
    }
    function showError(field,error,message){
      field.classList.add("is-invalid");error.textContent=message;error.hidden=false;
      field.querySelectorAll("input").forEach(function(input){input.setAttribute("aria-invalid","true");});
    }
    function expand(open,scroll){
      toggle.setAttribute("aria-expanded",String(open));form.hidden=!open;
      if(open&&scroll)window.requestAnimationFrame(function(){toggle.scrollIntoView({behavior:"smooth",block:"start"});});
    }
    toggle.addEventListener("click",function(){expand(toggle.getAttribute("aria-expanded")!=="true",false);});
    function updateWhatsApp(){
      var choice=selected("entry.1289286055"),required=Boolean(choice&&choice.value==="WhatsApp");
      whatsapp.required=required;whatsapp.setAttribute("aria-required",String(required));hint.hidden=!required;
      if(!required||whatsapp.value.trim())clearError(whatsapp.closest(".form-field"),document.getElementById("interest-whatsapp-error"));
    }
    function resetFormState(clearStatus){
      submitting=false;
      form.reset();
      form.querySelectorAll(".form-field").forEach(function(field){
        var error=field.querySelector(".form-field__error");
        if(error)clearError(field,error);
      });
      submit.disabled=false;
      submit.textContent="Submit Expression of Interest";
      submit.classList.remove("has-validation-error");
      if(clearStatus)setStatus("","");
      updateWhatsApp();
    }
    if(clearButton)clearButton.addEventListener("click",function(){
      resetFormState(true);
      expand(true,false);
      document.getElementById("interest-full-name").focus();
    });
    function validate(){
      updateWhatsApp();var invalid=[];
      var name=document.getElementById("interest-full-name"),email=document.getElementById("interest-email");
      [
        {el:name,id:"interest-full-name-error",ok:name.value.trim().length>0,msg:"Please enter your full name"},
        {el:email,id:"interest-email-error",ok:email.value.trim().length>0&&email.validity.valid,msg:email.value.trim()?"Please enter a valid email address":"Please enter your email address"},
        {el:whatsapp,id:"interest-whatsapp-error",ok:!whatsapp.required||whatsapp.value.trim().length>0,msg:"A WhatsApp number is required because you selected WhatsApp."}
      ].forEach(function(item){
        var field=item.el.closest(".form-field"),error=document.getElementById(item.id);
        if(item.ok)clearError(field,error);else{showError(field,error,item.msg);invalid.push({field:field,control:item.el});}
      });
      [
        ["entry.1754856868","interest-loan-error","Please select a loan category."],
        ["entry.1289286055","interest-contact-error","Please choose your preferred contact method."],
        ["entry.375428151","interest-consent-error","Please confirm your consent to continue."]
      ].forEach(function(item){
        var control=form.querySelector('input[name="'+item[0]+'"]'),field=control.closest("fieldset"),error=document.getElementById(item[1]);
        if(selected(item[0]))clearError(field,error);else{showError(field,error,item[2]);invalid.push({field:field,control:control});}
      });
      if(invalid.length){
        setStatus("Please review the highlighted fields before submitting.","error");
        invalid[0].field.scrollIntoView({behavior:"smooth",block:"center"});
        window.setTimeout(function(){invalid[0].control.focus({preventScroll:true});},250);
        submit.classList.add("has-validation-error");return false;
      }
      submit.classList.remove("has-validation-error");return true;
    }
    form.addEventListener("input",function(event){
      var field=event.target.closest(".form-field");if(!field)return;
      var error=field.querySelector(".form-field__error");if(!error||error.hidden)return;
      if(event.target.type==="email"&&(!event.target.value.trim()||!event.target.validity.valid))return;
      if(event.target.value.trim())clearError(field,error);
    });
    form.addEventListener("change",function(event){
      if(event.target.name==="entry.1289286055")updateWhatsApp();
      var field=event.target.closest(".form-field"),error=field&&field.querySelector(".form-field__error");
      if(error&&selected(event.target.name))clearError(field,error);
    });
    if(confirmationClose&&confirmationDialog){
      confirmationClose.addEventListener("click",function(){confirmationDialog.close();});
      confirmationDialog.addEventListener("close",function(){
        resetFormState(true);
        expand(false,false);
        toggle.focus();
      });
    }
    form.addEventListener("submit",function(event){
      event.preventDefault();if(submitting||!validate())return;
      submitting=true;submit.disabled=true;submit.textContent="Sending…";
      setStatus("Sending your expression of interest…","pending");
      var contact=selected("entry.1289286055");
      var prefersWhatsApp=Boolean(contact&&contact.value==="WhatsApp");
      try{
        HTMLFormElement.prototype.submit.call(form);
        setStatus("Your enquiry form has been sent from this page.","success");
        if(confirmationMessage)confirmationMessage.textContent="Your browser has sent your enquiry form to Google Forms.";
        if(confirmationReminder){
          confirmationReminder.textContent=prefersWhatsApp
            ?"You selected WhatsApp. Please keep the number you provided available for Morrowfield's follow-up."
            :"Please check the email address you provided, including your Inbox and Spam/Junk folders, for Morrowfield's welcome message. Email providers may place legitimate messages in Spam/Junk.";
        }
        if(confirmationDialog&&typeof confirmationDialog.showModal==="function"){
          confirmationDialog.showModal();
        }else{
          window.alert("Thank you! Your interest form has been sent. "+(prefersWhatsApp
            ?"Please keep your WhatsApp available for Morrowfield's follow-up."
            :"Please check your email Inbox and Spam/Junk folders for Morrowfield's welcome message."));
          resetFormState(true);expand(false,false);
        }
      }catch(error){
        submitting=false;submit.disabled=false;submit.textContent="Submit Expression of Interest";
        setStatus("We could not send the form from this page. Please try again.","error");
      }
    });
    resetFormState(true);
    window.addEventListener("pageshow",function(){resetFormState(true);expand(false,false);});
  }
  function configureEnquiryLinks(){
    document.querySelectorAll("[data-express-interest]").forEach(function(link){
      link.setAttribute("href","#express-interest");link.removeAttribute("target");link.removeAttribute("rel");
      link.addEventListener("click",function(){
        var category=link.getAttribute("data-loan-category");
        if(category)document.querySelectorAll('input[name="entry.1754856868"]').forEach(function(input){input.checked=input.value===category;});
        var form=document.getElementById("morrowfield-interest-form"),toggle=document.getElementById("interest-form-toggle");
        if(form&&toggle&&form.hidden){form.hidden=false;toggle.setAttribute("aria-expanded","true");}
      });
    });
  }
  function initNavigation(){
    var button=document.querySelector(".nav-toggle"),nav=document.getElementById("primary-nav");if(!button||!nav)return;
    function setNav(open){button.setAttribute("aria-expanded",String(open));button.setAttribute("aria-label",open?"Close menu":"Open menu");nav.classList.toggle("is-open",open);document.body.classList.toggle("nav-open",open);}
    button.addEventListener("click",function(){setNav(button.getAttribute("aria-expanded")!=="true");});
    nav.addEventListener("click",function(event){if(event.target.closest("a"))setNav(false);});
    document.addEventListener("keydown",function(event){if(event.key==="Escape"&&button.getAttribute("aria-expanded")==="true"){setNav(false);button.focus();}});
    document.addEventListener("click",function(event){if(button.getAttribute("aria-expanded")==="true"&&!nav.contains(event.target)&&!button.contains(event.target))setNav(false);});
    function breakpoint(event){if(event.matches)setNav(false);}
    if(desktop.addEventListener)desktop.addEventListener("change",breakpoint);else if(desktop.addListener)desktop.addListener(breakpoint);
  }
  function init(){configureEnquiryLinks();initInterestForm();initNavigation();var year=document.getElementById("year");if(year)year.textContent=String(new Date().getFullYear());}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
