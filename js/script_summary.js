// load user from local storage
let userAsText = localStorage.getItem("user");
let user = JSON.parse(userAsText);

function onLoadSummary() {
  document.getElementById("loggedInUserName").innerHTML = user.User;
}
