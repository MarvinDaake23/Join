rememberBulian = true;

function iconWhiteToBlue() {
    let icon = document.getElementById('icon');
    if(window.innerWidth < 750){
        icon.src = '../assets/img/join-icon-white.png';
        setTimeout(changeIcon, 700)
    }
    setTimeout(zIndexChange, 900)
}

function changeIcon() {
    icon.src = '../assets/img/join-icon-blue.png';
} 
function zIndexChange() {
    document.getElementById('whiteB').style.zIndex ="-1";
}

function signUp() {
    let logIn = document.getElementById('logIn');
    logIn.innerHTML = ``; 
    logIn.innerHTML += /*HTML*/ `

        <img onclick="backToLogIn()" class="backArrow" src="../assets/img/arrow-left-line.png">
        <div id="headline" class="headline">
            <h1>Sign up</h1>
            <div class="line"></div>
        </div>

        <div class="logInSection">
            <div class="inputfield">
                <input type="text" placeholder="Name" required>
                <div class="inputIcons">
                    <img class="personIcon hover" src="../assets/img/person.png">
                </div>
            </div>
            <div class="inputfield">
                <input type="text" placeholder="Email" required>
                <div class="inputIcons">
                    <img class="mailIcon hover" src="../assets/img/mail.png">
                </div>
            </div>
            <div class="inputfield">
                <input type="text" placeholder="Password" required>
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
            <span> I Accept the <span class="blueText">Privacy policy</span></span>
        </div>
        <div class="signInButtonSection">
            <button class="signInButton hover" onclick="signUpSuccessful()">Sign up</button>
        </div>
    </div>

    <div class="informationSection">
        <span class="hover">Privacy Policy</span>
        <span class="hover">Legal notice</span>
    </div>
    `; 
        document.getElementById('headline').style.marginTop = '0px';
    document.getElementById('signUpSection').style.display ="none";
}

function remember(){
    if (rememberBulian == true) {
        document.getElementById('checkButton').src = '../assets/img/Property 1=hover checked.png';
        rememberBulian = false;
    }
    else {
        document.getElementById('checkButton').src = '../assets/img/Property 1=Default.png';
        rememberBulian = true;
    }
}

function backToLogIn() {
    let logIn = document.getElementById('logIn');
    logIn.innerHTML = ``; 
    logIn.innerHTML += /*HTML*/ `
          <div class="headline">
            <h1>Log in</h1>
            <div class="line"></div>
        </div>

        <div class="logInSection">
            <div class="inputfield">
                <input type="text" placeholder="Email" required>
                <div class="inputIcons">
                    <img class="mailIcon hover" src="../assets/img/mail.png">
                </div>
            </div>
            <div class="inputfield">
                <input type="text" placeholder="Password" required>
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
            <button class="logInUserButton hover">Log in</button>
            <button class="logInGuestButton hover" >Guest Log in</button>
        </div>
    </div>

    <div class="informationSection">
        <span class="hover">Privacy Policy</span>
        <span class="hover">Legal notice</span>
    </div>
    `;
    document.getElementById('signUpSection').style.display = "block";
}

function signUpSuccessful(){
    document.getElementById('logIn').innerHTML += /*HTML*/`
        <div id="signInSuccessful" class="signInSuccessful">You Signed Up successful</div>
    `;
    setTimeout(backToLogIn, 1600);
}

