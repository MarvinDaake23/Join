function renderLogInHTML() {
  return `
<form onsubmit="logIn(); return false;" id="logIn" class="logIn">
<div class="headline">
  <h1>Log in</h1>
  <div class="line"></div>
</div>

<div class="logInSection">
  <div class="inputfield">
    <input id="email" type="email" placeholder="Email" required />
    <div class="inputIcons">
      <img class="mailIcon hover" src="../assets/img/mail.png" />
    </div>
  </div>
  <div id="inputfieldPassword" class="inputfield">
    <input
      id="password"
      type="password"
      placeholder="Password"
      required
    />
    <div class="inputIcons">
      <img class="lockIcon hover" src="../assets/img/lock.png" />
    </div>
  </div>
</div>

<div class="rememberMe">
  <input type="checkbox" id="rememberMe" name="rememberMe" />
  <label for="rememberMe">Remember Me</label>
</div>

<div class="logInButtonSection">
  <button type="submit" class="logInUserButton hover">Log in</button>
  <button
    type="button"
    onclick="guestLogIn()"
    class="logInGuestButton hover"
  >
    Guest Log in
  </button>
</div>
</form>`;
}

function renderSignUpHTML() {
  return `
    <form onsubmit="signUpSuccessful(); return false;" class="logIn">
        <img onclick="showLogIn()" class="backArrow hover" src="../assets/img/arrow-left-line.png">
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

        <div class="acceptPolicyCheckbox">
        <input onclick="checkEnableButton()" type="checkbox" id="acceptPolicy" name="acceptPolicy">
        <label for="acceptPolicy">I accept the <a target="_blank" href="privacyPolicyExternal.html" class="blueText">Privacy policy</a></label>
        </div>

        <div class="signInButtonSection">
            <button id="registerButton" class="signInButton hover" type="submit" disabled>Sign up</button>
        </div>
        </div>


    </form>

`;
}
