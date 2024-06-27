async function onLoadWelcome() {
  await includeHTML();
  await updateHeaderInitials();
  welcomeMobileUser();
  setTimeout(openSummary, 2000);
}

function welcomeMobileUser() {
  let greeting = actGreeting();
  let loggedInUserName = getLoggedInUserName();

  if (loggedInUserName == "Guest") {
    document.getElementById("greeting").innerHTML = greeting.slice(0, -1); // remove ","
    document.getElementById("loggedInUserName").innerHTML = "";
  } else {
    document.getElementById("greeting").innerHTML = greeting;
    document.getElementById("loggedInUserName").innerHTML = loggedInUserName;
  }
}
