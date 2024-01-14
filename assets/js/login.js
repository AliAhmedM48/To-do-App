// ~ HTML Elemets
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

function saveLogged() {
  //#region
  localStorage.setItem("logged", JSON.stringify(true));
  //#endregion
}

function getFromLocalStorage() {
  //#region
  return JSON.parse(localStorage.getItem("usersArr")) || [];
  //#endregion
}

function signIn() {
  //#region

  if (!validation()) return;

  const user = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  if (checkNewEmail()) {
    loginFeebback.classList.remove("hidden");
    loginFeebback.innerHTML = `This email address is not
                            registered <a href="signup.html" class="text-[#fcabe1] sm:text-blue-200 font-semibold">Sign up.</a>`;
  } else {
    for (let index = 0; index < usersArr.length; index++) {
      if (
        user.email.toLowerCase() === usersArr[index].email.toLowerCase() &&
        user.password === usersArr[index].password
      ) {
        console.log("done");
        saveLogged();
        resetForm();
        location.href = "index.html";
        return;
      }
    }
    loginFeebback.classList.remove("hidden");
    loginFeebback.innerHTML = `Invalid password.`;
  }
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
  const valideEmail = validateInput(emailInput, regex.email);
  const validePassword = validateInput(passwordInput, regex.password);

  valideEmail ? isValide(emailInput) : isNotValide(emailInput);
  validePassword ? isValide(passwordInput) : isNotValide(passwordInput);

  return valideEmail && validePassword;
  //#endregion
}

function resetForm() {
  //#region
  emailInput.value = "";
  passwordInput.value = "";
  emailIsNotUsed();

  //#endregion
}

passwordInput.addEventListener("input", function () {
  validateInput(passwordInput, regex.password)
    ? isValide(passwordInput)
    : isNotValide(passwordInput);
  loginFeebback.classList.add("hidden");
});

emailInput.addEventListener("input", function () {
  validateInput(emailInput, regex.email)
    ? isValide(emailInput)
    : isNotValide(emailInput);
  loginFeebback.classList.add("hidden");
});

submitBtn.addEventListener("click", signIn);

form.addEventListener("keydown", function (event) {
  if (event.key == "Enter" && document.activeElement != submitBtn) signIn();
});
