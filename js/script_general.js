/* GENERAL FUNCTIONS */

/**
 * function to show the popup when clicking on the header initials
 */
function showHeaderPopup() {
  // disable onclick
  document.getElementById("body").setAttribute("onclick", "");
  document.getElementById("headerPopup").style.display = "flex";
  sleep(0).then(() => {
    document
      .getElementById("body")
      .setAttribute("onclick", "closeHeaderPopup()");
  });
}

function closeHeaderPopup() {
  document.getElementById("headerPopup").style.display = "none";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
