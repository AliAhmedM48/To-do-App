// ~ HTML Elemets
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");

// ~ Varibales
const usersArr = getFromLocalStorage();
const regex = {
  //#region
  username:
    /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  //#endregion
};

function setToLocalStorage(key) {
  //#region
  localStorage.setItem(key, JSON.stringify(usersArr));
  //#endregion
}

function getFromLocalStorage() {
  //#region
  return JSON.parse(localStorage.getItem("usersArr")) || [];
  //#endregion
}

function signUp() {
  //#region

  if (!validation()) return;

  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  saveData(user);
  resetForm();
  location.href = "login.html";
  //#endregion
}

function isNotValide(element) {
  //#region
  element.classList.add("ring-1", "ring-red-300");
  element.classList.remove("focus:ring-neonBlueColor");
  element.nextElementSibling.classList.remove("hidden");
  element.nextElementSibling.nextElementSibling.classList.remove("hidden");
  //#endregion
}

function isValide(element) {
  //#region
  element.classList.remove("ring-1", "ring-red-300");
  element.classList.add("focus:ring-neonBlueColor");
  element.nextElementSibling.classList.add("hidden");
  element.nextElementSibling.nextElementSibling.classList.add("hidden");
  //#endregion
}

function emailIsUsed() {
  //#region
  emailInput.classList.add("ring-1", "ring-red-300");
  emailInput.classList.remove("focus:ring-neonBlueColor");
  emailInput.nextElementSibling.classList.remove("hidden");
  emailInput.nextElementSibling.nextElementSibling.classList.remove("hidden");
  emailInput.nextElementSibling.nextElementSibling.innerHTML = `This email address is already
                            registered <a href="login.html" class="text-[#fcabe1] sm:text-blue-200 font-semibold">Login
                                here.</a>`;
  //#endregion
}

function emailIsNotUsed() {
  //#region
  emailInput.classList.remove("ring-1", "ring-red-300");
  emailInput.classList.add("focus:ring-neonBlueColor");
  emailInput.nextElementSibling.classList.add("hidden");
  emailInput.nextElementSibling.nextElementSibling.classList.add("hidden");
  emailInput.nextElementSibling.nextElementSibling.innerHTML = `Please enter a valid email address.`;
  //#endregion
}

function checkNewEmail() {
  //#region
  for (let index = 0; index < usersArr.length; index++) {
    if (
      emailInput.value.toLowerCase() === usersArr[index].email.toLowerCase()
    ) {
      console.log(usersArr[index].email);
      return false;
    }
  }
  return true;
  //#endregion
}

function validateInput(element, regex) {
  //#region

  return regex.test(element.value);
  //#endregion
}

function validation() {
  //#region
  const valideUsername = validateInput(usernameInput, regex.username);
  const valideEmail = validateInput(emailInput, regex.email);
  const validePassword = validateInput(passwordInput, regex.password);

  valideUsername ? isValide(usernameInput) : isNotValide(usernameInput);
  validePassword ? isValide(passwordInput) : isNotValide(passwordInput);

  emailIsNotUsed();
  if (valideEmail) {
    isValide(emailInput);
    if (checkNewEmail()) emailIsNotUsed();
    else emailIsUsed();
  } else isNotValide(emailInput);

  return valideUsername && valideEmail && validePassword && checkNewEmail();
  //#endregion
}

function saveData(data) {
  //#region
  const key = "usersArr";
  usersArr.push(data);
  setToLocalStorage(key);
  //#endregion
}

function resetForm() {
  //#region
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  emailIsNotUsed();
  //#endregion
}

usernameInput.addEventListener("input", function () {
  validateInput(usernameInput, regex.username)
    ? isValide(usernameInput)
    : isNotValide(usernameInput);
});

passwordInput.addEventListener("input", function () {
  validateInput(passwordInput, regex.password)
    ? isValide(passwordInput)
    : isNotValide(passwordInput);
});

emailInput.addEventListener("input", function () {
  emailIsNotUsed();

  if (!validateInput(emailInput, regex.email)) {
    isNotValide(emailInput);
    return;
  }
  isValide(emailInput);
  checkNewEmail() ? emailIsNotUsed() : emailIsUsed();
});

submitBtn.addEventListener("click", signUp);

form.addEventListener("keydown", function (event) {
  if (event.key == "Enter" && document.activeElement != submitBtn) signUp();
});
