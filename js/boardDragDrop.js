let currentDraggedElement;

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

/**
 * function to highlight the todo-column when dragging over
 */
function addHighlightTodo() {
  document.getElementById("todo").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the todo-column
 */
function removeHighlightTodo() {
  document.getElementById("todo").classList.remove("highlightBorder");
}

/**
 * function to highlight the progress-column when dragging over
 */
function addHighlightProgress() {
  document.getElementById("progress").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the progress-column
 */
function removeHighlightProgress() {
  document.getElementById("progress").classList.remove("highlightBorder");
}

/**
 * function to highlight the feedback-column when dragging over
 */
function addHighlightFeedback() {
  document.getElementById("feedback").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the feedback-column
 */
function removeHighlightFeedback() {
  document.getElementById("feedback").classList.remove("highlightBorder");
}

/**
 * function to highlight the done-column when dragging over
 */
function addHighlightDone() {
  document.getElementById("done").classList.add("highlightBorder");
}

/**
 * function to remove the highlight of the done-column
 */
function removeHighlightDone() {
  document.getElementById("done").classList.remove("highlightBorder");
}

/**
 * function to remove all the highlights from the column
 */
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
  document.getElementById("findInput").value = "";
  await putData("boardtasks", boardTasks);
}

/**
 * function to move task on category up (mobile view)
 * @param {} id
 */
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

/**
 * function to move task on category down (mobile view)
 * @param {} id
 */
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
