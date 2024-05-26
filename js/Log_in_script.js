rememberBulian = true;

const BASE_URL =
  "https://remotestorage-a7059-default-rtdb.europe-west1.firebasedatabase.app/";

let responsetoJsonUsers = [];

function onloadfunction() {
  iconWhiteToBlue();
  loadUserData();
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
                <input id="user" type="text" placeholder="Name" required>
                <div class="inputIcons">
                    <img class="personIcon hover" src="../assets/img/person.png">
                </div>
            </div>
            <div class="inputfield">
                <input id="email" type="text" placeholder="Email" required>
                <div class="inputIcons">
                    <img class="mailIcon hover" src="../assets/img/mail.png">
                </div>
            </div>
            <div class="inputfield">
                <input id="password" type="text" placeholder="Password" required>
                <div class="inputIcons">
                    <img class="lockIcon hover" src="../assets/img/lock.png">
                </div>
            </div>
            <div class="inputfield">
                <input type="text" placeholder="Confrim Password" required>
                <div class="inputIcons">
                    <img class="lockIcon hover" src="../assets/img/lock.png">
                </div>
            </div>
        </div>

        <div class="acceptPolicy">
            <img src="../assets/img/Property 1=Default.png" id="checkButton" class="checkButton hover" onclick="remember()"></button>
            <span> I Accept the <a href="../html/privacy_policy.html" class="blueText">Privacy policy</a></span>
        </div>
        <div class="signInButtonSection">
            <button class="signInButton hover" type="submit">Sign up</button>
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

function remember() {
  if (rememberBulian == true) {
    document.getElementById("checkButton").src =
      "../assets/img/Property 1=hover checked.png";
    rememberBulian = false;
  } else {
    document.getElementById("checkButton").src =
      "../assets/img/Property 1=Default.png";
    rememberBulian = true;
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
                <input id="email" type="text" placeholder="Email" required>
                <div class="inputIcons">
                    <img class="mailIcon hover" src="../assets/img/mail.png">
                </div>
            </div>
            <div class="inputfield">
                <input id="password" type="text" placeholder="Password" required>
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
  let regsiter = document.getElementById("registerSection");

  if (rememberBulian == false) {
    regsiter.innerHTML += /*HTML*/ `
        <div id="signInSuccessful" class="feedback">You Signed Up successful</div>
    `;
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

    setTimeout(backToLogIn, 1600);
  } else {
    regsiter.innerHTML += /*HTML*/ `
        <div id="signInNoSuccessful" class="feedback">you must accept the Privacy policy</div>
        `;
    setTimeout(removeNoSuccessfullSignUp, 4000);
  }
}

function logIn() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let regsiter = document.getElementById("registerSection");
  let user = objectInToArray.find(
    (u) => u.email == email.value && u.password == password.value
  );

  if (user) {
    regsiter.innerHTML += /*HTML*/ `
        <div id="signInNoSuccessful" class="feedback">Sign in successful</div>
        `;
    setTimeout(openSummary, 2000);
  } else {
    regsiter.innerHTML += /*HTML*/ `
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

  setTimeout(openSummary, 1500);
  login.innerHTML += /*HTML*/ `
        <div id="signInNoSuccessful" class="feedback">Sign in as Guest successful</div>
        `;
}
