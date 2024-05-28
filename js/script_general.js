/* GENERAL FUNCTIONS */

// breakpoint of viewport width
let vwBreak = 480;


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
