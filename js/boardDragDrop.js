/*
 * function to check which element is being moved
 */
function startDragging(id) {
  currentDraggedElement = id;
  // add class with rotation
  document.getElementById(`boardTask${id}`).classList.add("rotate");
}

/**
 * function for placing the selected container into the container below
 */
function allowDrop(ev) {
  ev.preventDefault();
}

function addHighlightTodo() {
  document.getElementById("todo").classList.add("highlightBorder");
}

function removeHighlightTodo() {
  document.getElementById("todo").classList.remove("highlightBorder");
}

function addHighlightProgress() {
  document.getElementById("progress").classList.add("highlightBorder");
}

function removeHighlightProgress() {
  document.getElementById("progress").classList.remove("highlightBorder");
}

function addHighlightFeedback() {
  document.getElementById("feedback").classList.add("highlightBorder");
}

function removeHighlightFeedback() {
  document.getElementById("feedback").classList.remove("highlightBorder");
}

function addHighlightDone() {
  document.getElementById("done").classList.add("highlightBorder");
}

function removeHighlightDone() {
  document.getElementById("done").classList.remove("highlightBorder");
}

function removeAllHighlights() {
  document.getElementById("todo").classList.remove("highlightBorder");
  document.getElementById("progress").classList.remove("highlightBorder");
  document.getElementById("feedback").classList.remove("highlightBorder");
  document.getElementById("done").classList.remove("highlightBorder");
}

/**
 * function to change the category so that the container is loaded correctly when reloaded
 */
async function moveTo(category) {
  removeAllHighlights();
  boardTasks[currentDraggedElement]["category"] = category;
  renderAllBoardTasks();
  // clear input field
  document.getElementById("findInput").value = "";
  // update Firebase!
  await putData("boardtasks", boardTasks);
}

function moveTaskCategoryUp(id) {
  let boardtask = boardTasks[id].category;
  if (boardtask == "progress") {
    boardTasks[id].category = "todo";
  } else if (boardtask == "feedback") {
    boardTasks[id].category = "progress";
  } else if (boardtask == "done") {
    boardTasks[id].category = "feedback";
  }
  renderAllBoardTasks();
}

function moveTaskCategoryDown(id) {
  let boardtask = boardTasks[id].category;
  if (boardtask == "todo") {
    boardTasks[id].category = "progress";
  } else if (boardtask == "progress") {
    boardTasks[id].category = "feedback";
  } else if (boardtask == "feedback") {
    boardTasks[id].category = "done";
  }
  renderAllBoardTasks();
}
