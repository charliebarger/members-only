const submitForm = document.getElementById("submitSignIn");
const username = document.getElementById("username-input");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById(" confirm-password");
let submitAttempt = false;
submitForm.addEventListener("click", validate);
username.addEventListener("keyup", removeError);
passwordInput.addEventListener("keyup", removePasswordError);
confirmPasswordInput.addEventListener("keyup", removePasswordError);

function removeError(e) {
  if (username.value === "") {
    submitAttempt = false;
  }
  if (/\s/.test(username.value)) {
    usernameError.style.display = "block";
    usernameError.textContent = "No White Spaces";
  } else if (
    (username.value.length > 20 || username.value.length) < 5 &&
    submitAttempt
  ) {
    usernameError.style.display = "block";
    usernameError.textContent = "Username must be between 5 and 20 characters";
    return false;
  } else {
    usernameError.style.display = "none";
    usernameError.textContent = "";
  }
}

function removePasswordError(e) {
  if (passwordInput.value === "") {
    submitAttempt = false;
  }
  if (
    passwordInput.value.length > 20 ||
    (passwordInput.value.length < 5 && submitAttempt)
  ) {
    passwordError.style.display = "block";
    passwordError.textContent = "Username must be between 5 and 20 characters";
    return false;
  } else {
    passwordError.style.display = "none";
    passwordError.textContent = "";
  }
}

function validate(e) {
  if (!validateUsername(e) || !validatePassword(e)) {
    e.preventDefault();
  }
}

function validateUsername(e) {
  if (/\s/.test(username.value)) {
    usernameError.style.display = "block";
    usernameError.textContent = "No White Spaces";
    return false;
  }
  if (
    (username.value.length > 20 || username.value.length < 5) &&
    username.value != ""
  ) {
    usernameError.style.display = "block";
    usernameError.textContent = "Username must be between 5 and 20 characters";
    submitAttempt = true;
    return false;
  }
  return true;
}

function validatePassword(e) {
  if (passwordInput.value == "" || confirmPasswordInput.value == "") {
    return true;
  }
  if (passwordInput.value.length > 20 || passwordInput.value.length < 5) {
    passwordError.style.display = "block";
    passwordError.textContent = "Password must be between 5 and 20 characters";
    submitAttempt = true;
    return false;
  }
  if (passwordInput.value != confirmPasswordInput.value) {
    passwordError.style.display = "block";
    passwordError.textContent = "Passwords do not match";
    submitAttempt = true;
    return false;
  }
  return true;
}
