//let responsetoJsonUsers = [];

function checkForLocalStorageCookie() {
  // check local storage
  let credAsText = localStorage.getItem("cred");

  if (credAsText) {
    cred = JSON.parse(credAsText);
    document.getElementById("email").value = cred[0];
    document.getElementById("password").value = cred[1];
    document.getElementById("rememberMe").checked = true;
  }
}

function onloadfunction() {
  startAnimation();
  showLogIn();
  loadUserData();
  checkForLocalStorageCookie();
  // depending on vw set the link targets
  if (window.innerWidth < vwBreak) {
    document.getElementById("privacyLink").setAttribute("target", "_self");
    document.getElementById("legalLink").setAttribute("target", "_self");
  }
}

async function loadUserData() {
  let response = await fetch(BASE_URL + "users.json");
  responseAsJson = await response.json();
  objectInToArray = Object.values(responseAsJson);
}

function startAnimation() {
  let icon = document.getElementById("icon");
  if (window.innerWidth < 750) {
    icon.src = "../assets/img/join-icon-white.png";
    setTimeout(changeIcon, 700);
  }
  setTimeout(zIndexChange, 900);
}

function changeIcon() {
  icon.src = "../assets/img/join-icon-blue.png";
}

function zIndexChange() {
  document.getElementById("whiteB").style.zIndex = "-1";
}

function showSignUp() {
  document.getElementById("middleSection").innerHTML = renderSignUpHTML();
  //document.getElementById("headline").style.marginTop = "0px";
  document.getElementById("signUpSection").style.display = "none";
}

function checkSamePassword() {
  if (
    (document.getElementById("password").value ==
      document.getElementById("confirmPassword").value) &
    (document.getElementById("password").value.length > 0)
  ) {
    document.getElementById("inputfieldPasswordConfirm").style.border =
      "1px solid black";
    return true;
  } else {
    document.getElementById("inputfieldPasswordConfirm").style.border =
      "1px solid red";
    return false;
  }
}

function checkEnableButton() {
  if (document.getElementById("acceptPolicy").checked & checkSamePassword()) {
    document.getElementById("registerButton").disabled = false;
    document.getElementById("registerButton").style.opacity = "1";
  } else {
    document.getElementById("registerButton").disabled = true;
    document.getElementById("registerButton").style.opacity = "0.5";
  }
}

function showLogIn() {
  document.getElementById("middleSection").innerHTML = renderLogInHTML();
  document.getElementById("signUpSection").style.display = "block";
}

async function signUpSuccessful() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let user = document.getElementById("user").value;
  let register = document.getElementById("middleSection");

  // add newly registered user to contacts and update firebase
  addUserToContacts(user, email);

  await fetch(BASE_URL + "users.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      User: user,
      email: email,
      password: password,
    }),
  });
  loadUserData();

  register.innerHTML += `<div id="signInSuccessful" class="feedback">You Signed Up successful</div>`;

  setTimeout(showLogIn(), 1600);
}

function saveCredentialsToLocalStorage() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cred = [email, password];
  let credAsText = JSON.stringify(cred);
  localStorage.setItem("cred", credAsText);
}

function logIn() {
  if (document.getElementById("rememberMe").checked) {
    saveCredentialsToLocalStorage();
  } else {
    localStorage.removeItem("cred");
  }

  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let register = document.getElementById("middleSection");
  let user = objectInToArray.find(
    (u) => u.email == email.value && u.password == password.value
  );

  if (user) {
    register.innerHTML += /*HTML*/ `
        <div id="signInNoSuccessful" class="feedback">Sign in successful</div>
        `;
    // akt. user ins local storage speichern
    let userAsText = JSON.stringify(user);
    localStorage.setItem("user", userAsText);

    /* was passiert hier?
    document.getElementById("inputfieldPassword").classList.add("outlineBlue");
    */

    setTimeout(openSummary, 2000);
  } else {
    register.innerHTML += /*HTML*/ `
        <div id="signInNoSuccessful" class="feedback">wrong email/password</div>
        `;
    setTimeout(removeNoSuccessfullSignUp, 2000);
  }
}

function removeNoSuccessfullSignUp() {
  document.getElementById("signInNoSuccessful").remove();
}

function openSummary() {
  window.location = "summary.html";
}

function guestLogIn() {
  let login = document.getElementById("logIn");

  // Guest ins Localstorage
  let user = { User: "Guest" };
  let userAsText = JSON.stringify(user);
  localStorage.setItem("user", userAsText);

  setTimeout(openSummary, 1500);
  login.innerHTML += /*HTML*/ `
        <div id="signInNoSuccessful" class="feedback">Sign in as Guest successful</div>
        `;
}

async function addUserToContacts(user, email) {
  let contacts = await loadData("contacts");
  // split username
  let nameArray = user.split(" ");
  let new_firstName = nameArray[0];
  let new_lastName = nameArray[1];
  let data = {
    firstName: new_firstName,
    lastName: new_lastName,
    email: email,
    phoneNumber: "",
    profileColor: getRandomBackgroundColor(),
  };
  await putData(`contacts/${contacts.length}`, data);
}
