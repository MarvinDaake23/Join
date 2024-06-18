let responsetoJsonUsers = [];

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
  iconWhiteToBlue();
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

function iconWhiteToBlue() {
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

function signUp() {
  let logIn = document.getElementById("registerSection");
  logIn.innerHTML = ``;
  logIn.innerHTML += /*HTML*/ `

    <form onsubmit="signUpSuccessful(); return false;" class="logIn">
        <img onclick="backToLogIn()" class="backArrow hover" src="../assets/img/arrow-left-line.png">
        <div id="headline" class="headline">
            <h1>Sign up</h1>
            <div class="line"></div>
        </div>

        <div class="logInSection">
            <div class="inputfield">
                <input required id="user" title="first and last name needed (first letters big)" type="text" placeholder="Name" pattern="[A-Z][a-z]+\\s[A-Z][a-z]+">
                <div class="inputIcons">
                    <img class="personIcon hover" src="../assets/img/person_small.png">
                </div>
            </div>
            <div class="inputfield">
                <input id="email" type="email" placeholder="Email" required>
                <div class="inputIcons">
                    <img class="mailIcon hover" src="../assets/img/mail.png">
                </div>
            </div>
            <div class="inputfield" id="inputfieldPassword">
                <input id="password" type="password" placeholder="Password" required>
                <div class="inputIcons">
                    <img class="lockIcon hover" src="../assets/img/lock.png">
                </div>
            </div>
            <div class="inputfield" id="inputfieldPasswordConfirm">
                <input id="confirmPassword" type="password" placeholder="Confirm Password" required onkeyup="checkSamePassword();checkEnableButton()";>
                <div class="inputIcons">
                    <img class="lockIcon hover" src="../assets/img/lock.png">
                </div>
            </div>
        </div>

        <!--
        <div class="acceptPolicy">
            <img src="../assets/img/Property 1=Default.png" id="checkButton" class="checkButton hover" onclick="toggleAcceptedPolicy()"></button>
            <span>I accept the <a target="_blank" href="privacyPolicyExternal.html" class="blueText">Privacy policy</a></span>
        </div>
        -->


        <div class="acceptPolicyCheckbox">
        <input onclick="checkEnableButton()" type="checkbox" id="acceptPolicy" name="acceptPolicy">
        <label for="acceptPolicy">I accept the <a target="_blank" href="privacyPolicyExternal.html" class="blueText">Privacy policy</a></label>
        </div>




        <div class="signInButtonSection">
            <button id="registerButton" class="signInButton hover" type="submit" disabled>Sign up</button>
        </div>
        </div>

        <div class="informationSection">
            <span class="hover">Privacy Policy</span>
            <span class="hover">Legal notice</span>
        </div>
    </form>

    `;
  document.getElementById("headline").style.marginTop = "0px";
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

function backToLogIn() {
  let logIn = document.getElementById("registerSection");
  logIn.innerHTML = ``;
  logIn.innerHTML += /*HTML*/ `
    <div id="registerSection">
    <form onsubmit="logIn(); return false;" id="logIn" class="logIn">
        <div class="headline">
            <h1>Log in</h1>
            <div class="line"></div>
        </div>

        <div class="logInSection">
            <div class="inputfield">
                <input id="email" type="email" placeholder="Email" required>
                <div class="inputIcons">
                    <img class="mailIcon hover" src="../assets/img/mail.png">
                </div>
            </div>
            <div class="inputfield">
                <input id="password" type="password" placeholder="Password" required>
                <div class="inputIcons">
                    <img class="lockIcon hover" src="../assets/img/lock.png">
                </div>
            </div>
            <div class="rememberSection">
                <img src="../assets/img/Property 1=Default.png" id="checkButton" class="checkButton hover" onclick="remember()"></button>
                <span>Remember me</span>
            </div>
        </div>

        <div class="logInButtonSection">
            <button type="submit" class="logInUserButton hover">Log in</button>
            <button type="button" onclick="guestLogIn()" class="logInGuestButton hover">Guest Log in</button>
        </div>
    </form>
    </div>

    <div class="informationSection">
        <span class="hover">Privacy Policy</span>
        <span class="hover">Legal notice</span>
    </div>

    `;
  document.getElementById("signUpSection").style.display = "block";
}

async function signUpSuccessful() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let user = document.getElementById("user").value;
  let register = document.getElementById("registerSection");

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

  setTimeout(backToLogIn, 1600);
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
  let register = document.getElementById("registerSection");
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
        <div id="signInNoSuccessful" class="feedback">email or passowrd are false</div>
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
