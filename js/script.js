const BASE_URL =
  "https://remotestorage-a7059-default-rtdb.europe-west1.firebasedatabase.app/";

/* Background colors for profile initials */
let backgroundProfileColors = [
  "#0038FF",
  "#00BEE8",
  "#1FD7C1",
  "#6E52FF",
  "#9327FF",
  "#C3FF2B",
  "#FC71FF",
  "#FF4646",
  "#FF5EB3",
  "#FF745E",
  "#FF7A00",
  "#FFA35E",
  "#FFBB2B",
  "#FFC701",
  "#FFE62B",
];

function getRandomBackgroundColor() {
  // random color from list
  let new_profileColor =
    backgroundProfileColors[
      Math.floor(Math.random() * backgroundProfileColors.length)
    ];
  return new_profileColor;
}

async function onLoadExtraPages() {
  await includeHTML();
  updateHeaderInitials();
}

async function onLoadExtraPagesExternal() {
  await includeHTML();
  updateLinksExternalPage();
}

async function updateLinksExternalPage() {
  document.getElementById("privacyLink").href = "privacyPolicyExternal.html";
  document.getElementById("legalNoticeLink").href = "legalNoticeExternal.html";
}

// database functions
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function putData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/* GENERAL FUNCTIONS */

// breakpoint of viewport width
let vwBreak = 620;

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

/**
 * log out function: deletes the local storage user and shows the loginpage
 */
function logOutUser() {
  localStorage.removeItem("user");
  localStorage.getItem("cred");
  window.location = "index.html";
}

/**
 * function to go back to the previous visited page
 */
function goToPreviousPage() {
  window.history.back();
}
