
/**
 * function to load the actual logged in user from local storage (saved in login.html)
 */
let userAsText = localStorage.getItem("user");
let user = JSON.parse(userAsText);


/**
 * onload function of the summary.html: renders actual data into the html page
 */
function onLoadSummary() {
  document.getElementById("greeting").innerHTML = greetUser();
  document.getElementById("loggedInUserName").innerHTML = user.User;
}

/**
 * function to get an adequate greeting for the actual time
 * @returns a greeting (string)
 */
function greetUser() {
  // create a new Date object
  let now = new Date();
  // get the current hour (from 0 to 23)
  let hour = now.getHours();
  let greeting = [];
  // depending on actual hour, generate a greeting
  if (hour >= 0 && hour < 6) {
    // 0 - 5
    greeting = "Good night";
  } else if (hour >= 6 && hour < 12) {
    // 6 - 11
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    // 12 - 17
    greeting = "Good afternoon";
  } else if (hour >= 18 && hour < 24) {
    // 18 - 23
    greeting = "Good evening";
  }
  return greeting;
}
