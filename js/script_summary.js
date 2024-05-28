// load user from local storage
let userAsText = localStorage.getItem("user");
let user = JSON.parse(userAsText);

function onLoadSummary() {
  document.getElementById("greeting").innerHTML = greetUser();
  document.getElementById("loggedInUserName").innerHTML = user.User;
}

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
