function load() {
  let menu = document.getElementById("icon");
  menu.addEventListener("click", mobnav);
  let link = document.getElementById("main_links");
  link.addEventListener("click", remnav);
  scorll();

  document.getElementById("contact_form").addEventListener("submit", validate);

  document.getElementById("contact_form").reset();

  document.getElementById("contact_form").addEventListener("reset", resetForm);
}

// ---------form validation

function validate(e) {
  hideAllErrors();

  if (formHasErrors()) {
    e.preventDefault();
    return false;
  }

  return true;
}

function resetForm(e) {
  if (confirm("Clear form?")) {
    hideAllErrors();

    document.getElementById("fname").focus();

    return true;
  }

  e.preventDefault();

  return false;
}

function showError(formField, errorId, errorFlag) {
  document.getElementById(errorId).style.display = "block";

  if (!errorFlag) {
    formField.focus();

    if (formField.type == "text") {
      formField.select();
    }
  }
}

function formHasErrors() {
  let errorFlag = false;

  let requiredFields = ["fname", "lname", "email"];

  for (let i = 0; i < requiredFields.length; i++) {
    let textField = document.getElementById(requiredFields[i]);

    if (!formFieldHasInput(textField)) {
      document.getElementById(requiredFields[i] + "_error").style.display =
        "block";

      if (!errorFlag) {
        textField.focus();
      }

      errorFlag = true;
    }
  }

  let regex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  );

  let email = document.getElementById("email").value;

  if (!regex.test(email)) {
    document.getElementById("email_error").style.display = "block";

    if (!errorFlag) {
      document.getElementById("email").focus();
      document.getElementById("email").select();
    }

    errorFlag = true;
  }

  return errorFlag;
}

function hideAllErrors() {
  let errorFields = document.getElementsByClassName("error");

  for (let i = 0; i < errorFields.length; i++) {
    errorFields[i].style.display = "none";
  }
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function formFieldHasInput(fieldElement) {
  if (fieldElement.value == null || trim(fieldElement.value) == "") {
    return false;
  }

  return true;
}

// --------------

function mobnav() {
  document.body.classList.toggle("nav_open");
}

function remnav() {
  document.body.classList.remove("nav_open");
}

function scorll() {
  const nav = document.getElementById("nav");
  const home = document.getElementById("home");

  let secOption = {
    rootMargin: "-450px 0px 0px 0px",
  };

  let homeObser = new IntersectionObserver(function (entries, homeObser) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        nav.classList.add("nav_scroll");
      } else {
        nav.classList.remove("nav_scroll");
      }
    });
  }, secOption);

  homeObser.observe(home);
}

document.addEventListener("DOMContentLoaded", load);
