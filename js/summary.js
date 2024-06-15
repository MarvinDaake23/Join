/**
 * onload function of the summary.html: renders actual data into the html page
 */
async function onLoadSummary() {
  await includeHTML();
  boardTasks = await loadData("boardtasks");
  greetUser();
  fillSummaryFields()
  await updateHeaderInitials();
}


function fillSummaryFields() {
  document.getElementById("totalTasksCounter").innerHTML = boardTasks.length;
  document.getElementById("totalTasksInProgressCounter").innerHTML = countTasksByCategory("progress");
  document.getElementById("totalTasksAwaitingFeedback").innerHTML = countTasksByCategory("feedback");
  document.getElementById("doneCounter").innerHTML = countTasksByCategory("done");
  document.getElementById("todoCounter").innerHTML = countTasksByCategory("todo");
  document.getElementById("urgentCounter").innerHTML = countTasksByPriority("Urgent");

  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
  let deadline = new Date(findUpcomingDeadline());
  document.getElementById("upcomingDeadLine").innerHTML = `
      ${monthNames[deadline.getMonth()]}
      ${deadline.getDate()},
      ${deadline.getFullYear()}
  `;
}


function greetUser() {
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
 * Returns an adequate greeting for the actual time
 * @returns {string}
 */
function actGreeting() {
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
 * function to sort the due Dates, aufsteigend sortieren ab heute
 */
function findUpcomingDeadline() {
  let boardTasksTemp = [];

  for (let index = 0; index < boardTasks.length; index++) {
    const element = boardTasks[index];
    if (element.category != "done") {
      boardTasksTemp.push(element);
    }
  }

  boardTasksTemp.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  return boardTasksTemp[0].dueDate;
}
