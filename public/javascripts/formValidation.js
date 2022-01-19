const submitForm = document.getElementById("submitSignIn");
const usernameInput = document.getElementById("username-input");
const username = document.getElementById("username-input");
const usernameError = document.getElementById("username-error");
let submitAttempt = false;
submitForm.addEventListener("click", validate);
usernameInput.addEventListener("keyup", removeError);

function removeError(e) {
  console.log(submitAttempt);
  if (/\s/.test(username.value)) {
    usernameError.classList.remove("hide");
    usernameError.textContent = "No White Spaces";
  } else if (
    (username.value.length > 20 || username.value.length) < 5 &&
    submitAttempt
  ) {
    usernameError.classList.remove("hide");
    usernameError.textContent = "Username must be between 5 and 20 characters";
    return false;
  } else {
    usernameError.classList.add("hide");
    usernameError.textContent = "";
  }
}

function validate(e) {
  if (/\s/.test(username.value)) {
    e.preventDefault();
    usernameError.classList.remove("hide");
    usernameError.textContent = "No White Spaces";
    return false;
  }
  if (username.value.length > 20 || username.value.length < 5) {
    e.preventDefault();
    usernameError.classList.remove("hide");
    usernameError.textContent = "Username must be between 5 and 20 characters";
    submitAttempt = true;
    return false;
  }
  return true;
}
