rememberBulian = true;


function iconAnimation(){
    
}

function signUp() {
    let logIn = document.getElementById('logIn');
    logIn.innerHTML = ``; 
    logIn.innerHTML += /*HTML*/ `

        <img class="backArrow" src="../assets/img/arrow-left-line.png">
        <div id="headline" class="headline">
            <h1>Sign up</h1>
            <div class="line"></div>
        </div>

        <div class="logInSection">
            <div class="inputfield">
                <input type="text" placeholder="Name" required>
                <div class="inputIcons">
                    <img class="mailIcon hover" src="../assets/img/person.png">
                </div>
            </div>
            <div class="inputfield">
                <input type="text" placeholder="Email" required>
                <div class="inputIcons">
                    <img class="lockIcon hover" src="../assets/img/lock.png">
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
            <img src="../assets/img/Rectangle 5.png" id="checkButton" class="checkButton hover" onclick="remember()"></button>
            <span> I Accept the Privacy policy</span>
        </div>
        <div class="signInButtonSection">
            <button class="signInButton hover" onclick="">Sign up</button>
        </div>
    </div>

    <div class="informationSection">
        <span class="hover">Privacy Policy</span>
        <span class="hover">Legal notice</span>
    </div>
    `; 
    document.getElementById('')
    document.getElementById('headline').style.marginTop = '0px';
}

function remember(){
    if (rememberBulian == true) {
        document.getElementById('checkButton').src = '../assets/img/Property 1=checked.png';
        rememberBulian = false;
    }
    else {
        document.getElementById('checkButton').src = '../assets/img/Rectangle 5.png';
        rememberBulian = true;
    }
}