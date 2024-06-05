/**
 * function to load the actual logged in user from local storage (saved in login.html)
 */
let userAsText = localStorage.getItem("user");
let user = JSON.parse(userAsText);

/**
 * onload function of the summary.html: renders actual data into the html page
 */
async function onLoadSummary() {
  await includeHTML();
  boardTasks = await loadData("boardtasks");
  document.getElementById("greeting").innerHTML = greetUser();
  document.getElementById("loggedInUserName").innerHTML = getLoggedInUserName();

  // fill 6 fields
  // total task amount
  document.getElementById("totalTasksCounter").innerHTML = boardTasks.length;

  // 4 categories ... done,feedback,progress,todo
  document.getElementById("totalTasksInProgressCounter").innerHTML =
    countTasksByCategory("progress");
  document.getElementById("totalTasksAwaitingFeedback").innerHTML =
    countTasksByCategory("feedback");
  document.getElementById("doneCounter").innerHTML =
    countTasksByCategory("done");
  document.getElementById("todoCounter").innerHTML =
    countTasksByCategory("todo");

  // urgent counter
  document.getElementById("urgentCounter").innerHTML =
    countTasksByPriority("Urgent");

  // upcoming deadline
  document.getElementById("upcomingDeadLine").innerHTML = boardTasks[0].dueDate;

  await updateHeaderInitials();
}

function countTasksByCategory(string) {
  let cnt = 0;
  for (let index = 0; index < boardTasks.length; index++) {
    if (boardTasks[index].category == string) {
      cnt++;
    }
  }
  return cnt;
}

function countTasksByPriority(string) {
  let cnt = 0;
  for (let index = 0; index < boardTasks.length; index++) {
    if (boardTasks[index].priority == string) {
      cnt++;
    }
  }
  return cnt;
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
    greeting = "Good night,";
  } else if (hour >= 6 && hour < 12) {
    // 6 - 11
    greeting = "Good morning,";
  } else if (hour >= 12 && hour < 18) {
    // 12 - 17
    greeting = "Good afternoon,";
  } else if (hour >= 18 && hour < 24) {
    // 18 - 23
    greeting = "Good evening,";
  }
  return greeting;
}

function goToBoardPage() {
  window.location = "board.html";
}

/**
 * function to sort the due Dates
 */
function sortDates() {
  boardTasks.sort((a, b) => (a.dueDate > b.dueDate ? -1 : 1));
}
