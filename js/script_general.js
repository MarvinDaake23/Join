/* GENERAL FUNCTIONS */

// breakpoint of viewport width
let vwBreak = 480;

function getLoggedInUserName() {
  let user = [];

  // check local storage
  let userAsText = localStorage.getItem("user");

  if (userAsText == null) {
    user = { User: "Guest" };
  } else {
    user = JSON.parse(userAsText);
  }
  return user.User;
}

function updateHeaderInitials() {
  // guest
  let user = getLoggedInUserName();

  if (user == "Guest") {
    document.getElementById("headerInitialsDesktop").innerHTML = user[0];
    document.getElementById("headerInitialsMobile").innerHTML = user[0];
  } else {
    //normal user
    let nameArray = user.split(" ");
    document.getElementById(
      "headerInitialsMobile"
    ).innerHTML = `${nameArray[0][0]}${nameArray[1][0]}`;
    document.getElementById(
      "headerInitialsDesktop"
    ).innerHTML = `${nameArray[0][0]}${nameArray[1][0]}`;
  }
}

/**
 * function to show the popup when clicking on the header initials
 */
function showHeaderPopup() {
  // disable onclick function from body
  document.getElementById("body").setAttribute("onclick", "");
  // show popup
  document.getElementById("headerPopup").style.display = "flex";
  // set onclick function after delay
  sleep(0).then(() => {
    document
      .getElementById("body")
      .setAttribute("onclick", "closeHeaderPopup()");
  });
}

/**
 * function to show the popup when clicking on the header initials
 */
function showHeaderPopupMobile() {
  // disable onclick function from body
  document.getElementById("body").setAttribute("onclick", "");
  // show popup
  document.getElementById("headerPopupMobile").style.display = "flex";
  // set onclick function after delay
  sleep(0).then(() => {
    document
      .getElementById("body")
      .setAttribute("onclick", "closeHeaderPopupMobile()");
  });
}

/**
 * function to close the header popup when clicking anywhere else
 */
function closeHeaderPopup() {
  document.getElementById("headerPopup").style.display = "none";
}

/**
 * function to close the header popup when clicking anywhere else
 */
function closeHeaderPopupMobile() {
  document.getElementById("headerPopupMobile").style.display = "none";
}

/**
 * delay function (necessary for making a scrollbar invisible)
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
