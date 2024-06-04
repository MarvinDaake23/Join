let doneBulian = false;
let boardTasks = [];

let currentDraggedElement;

/**
 * function to initialize the board page
 */
async function boardInit() {
  await includeHTML(); //- edit christoph
  updateHeaderInitials(); // edit christoph
  boardTasks = await loadData("boardtasks");
  updateHTML();
}

/**
 * function to render the large view of the task
 */
function loadBoardBigContainer(i) {
  let bigContainer = document.getElementById("boardBigContainer");
  bigContainer.innerHTML = renderBoardBigContainer(i);
  loadBoardBigContainerLists(i);
  document.getElementById("background").classList.remove("d-none");
  document.getElementById("boardBigContainer").classList.remove("d-none");
}

function removeboardBigContainer() {
  document.getElementById("background").classList.add("d-none");
  document.getElementById("boardBigContainer").classList.add("d-none");
}

/**
 * function to render the lists in the large view of the task
 */
function loadBoardBigContainerLists(i) {
  loadBoardBigContainerContacts(i);
  loadBoardBigContainerSubtasks(i);
}

/**
 * function to render the priority of each task in the big large view
 */
function loadBoardBigContainerContacts(i) {
  let assignedToContactsInput = document.getElementById(
    "boardBigContainerAssignedToContactsInput"
  );
  for (let j = 0; j < boardTasks[i]["assignedTo"].length; j++) {
    const element = boardTasks[i]["assignedTo"][j];
    assignedToContactsInput.innerHTML +=
      renderBoardBigContainerContacts(element);
  }
}

/**
 * function to render selected subtasks for the task
 */
function loadBoardBigContainerSubtasks(i) {
  let Subtasks = document.getElementById("boardBigContainerSubtasks");
  for (let j = 0; j < boardTasks[i]["subtasks"].length; j++) {
    const element = boardTasks[i]["subtasks"][j];
    let src = "";
    if (element["complete"] == false) {
      src = "../assets/img/Property 1=Default.png";
    } else {
      src = "../assets/img/Property 1=hover checked.png";
    }
    Subtasks.innerHTML += renderBoardBigContainerSubtasks(element, j, i, src);
  }
}

/**
 *  function to render all boarTasks
 */
function updateHTML() {
  renderAllBoardTasks();
}

function renderAllBoardTasks() {
  for (let index = 0; index < boardTasks.length; index++) {
    const boardTask = boardTasks[index];
    let finished = boardTask.finishedSubtasks;
    let subtaskCount = boardTask.subtasks;
    if (boardTask.category == "todo") {
      document.getElementById("todo").innerHTML += renderBoardTask(
        boardTask,
        index
      );
    } else if (boardTask.category == "progress") {
      document.getElementById("progress").innerHTML += renderBoardTask(
        boardTask,
        index
      );
    } else if (boardTask.category == "feedback") {
      document.getElementById("feedback").innerHTML += renderBoardTask(
        boardTask,
        index
      );
    } else if (boardTask.category == "done") {
      document.getElementById("done").innerHTML += renderBoardTask(
        boardTask,
        index
      );
    }
    //loadProgressbar(index, progressName, subtaskCount.length, finished);
    loadProgressbar(index, subtaskCount.length, finished);
    loadPrioBoardTask(index);
    loadContactInBoardTask(index);
  }
}

/**
 * function for filtering and rendering all tasks with the category "To Do"
 */
function renderTodos() {
  let progressName = "todo";
  let todo = boardTasks.filter((t) => t["category"] == "todo");
  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < todo.length; index++) {
    let element = todo[index];
    let finished = element["finishedSubtasks"];
    let subtaskCount = element["subtasks"];
    document.getElementById("todo").innerHTML += renderBoardTask(
      element,
      index
    );
    loadProgressbar(index, progressName, subtaskCount.length, finished);
    loadPrioBoardTask(element, index); // element dazu
    loadContactInBoardTask(index);
  }

  if (todo.length == 0) {
    document.getElementById("todo").innerHTML =
      renderBoardTaskPlaceholderTodo();
  }
}

/**
 * function for filtering and rendering all tasks with the category "In progess"
 */
function renderProgress() {
  let progressName = "progress";
  let inProgress = boardTasks.filter((t) => t["category"] == "progress");
  document.getElementById("progress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    let finished = element["finishedSubtasks"];
    let subtaskCount = element["subtasks"];
    document.getElementById("progress").innerHTML += renderBoardTask(
      element,
      index
    );
    loadProgressbar(index, progressName, subtaskCount.length, finished);
    loadPrioBoardTask(element, index); // element dazu
    loadContactInBoardTask(index);
  }

  if (inProgress.length == 0) {
    document.getElementById("progress").innerHTML =
      renderBoardTaskPlaceholderProgress();
  }
}

/**
 * function for filtering and rendering all tasks with the category "Await Feedback"
 */
function renderAwaitFeedback() {
  let progressName = "feedback";
  let feedback = boardTasks.filter((t) => t["category"] == "feedback");
  document.getElementById("feedback").innerHTML = "";

  for (let index = 0; index < feedback.length; index++) {
    const element = feedback[index];
    let finished = element["finishedSubtasks"];
    let subtaskCount = element["subtasks"];
    document.getElementById("feedback").innerHTML += renderBoardTask(
      element,
      index
    );
    loadProgressbar(index, progressName, subtaskCount.length, finished);
    loadPrioBoardTask(element, index); // element dazu
    loadContactInBoardTask(index);
  }

  if (feedback.length == 0) {
    document.getElementById("feedback").innerHTML =
      renderBoardTaskPlaceholderFeedback();
  }
}

/**
 * function for filtering and rendering all tasks with the category "Done"
 */
function renderDone() {
  let progressName = "done";
  let done = boardTasks.filter((t) => t["category"] == "done");
  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    let finished = element["finishedSubtasks"];
    let subtaskCount = element["subtasks"];
    document.getElementById("done").innerHTML += renderBoardTask(
      element,
      index
    );
    loadProgressbar(index, progressName, subtaskCount.length, finished);
    loadPrioBoardTask(element, index); // element dazu
    loadContactInBoardTask(index);
  }

  if (done.length == 0) {
    document.getElementById("done").innerHTML =
      renderBoardTaskPlaceholderDone();
  }
}

/**
 *  function to render the contacts of each task in the small view
 */
function loadContactInBoardTask(i) {
  let contacts = document.getElementById(`boardTaskContacts${i}`);
  for (let j = 0; j < boardTasks[i]["assignedTo"].length; j++) {
    const element = boardTasks[i]["assignedTo"][j];
    contacts.innerHTML += renderBoardTaskContacts(element);
  }
}

/**
 * function to render the priority of each task
 */
function loadPrioBoardTask(i) {
  // element dazu
  let prio = document.getElementById(`boardTaskPrio${i}`);
  if (boardTasks[i]["priority"] == "Low") {
    prio.classList.add("lowPrioImg");
    prio.innerHTML = "Low";
  }
  if (boardTasks[i]["priority"] == "Medium") {
    prio.classList.add("medPrioImg");
    prio.innerHTML = "Medium";
  }
  if (boardTasks[i]["priority"] == "Urgent") {
    prio.classList.add("highPrioImg");
    prio.innerHTML = "Urgent";
  }
}

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
 * function to change the category so that the container is loaded correctly when reloaded
 */
async function moveTo(category) {
  boardTasks[currentDraggedElement]["category"] = category;
  updateHTML();
  // update Firebase!
  await putData("boardtasks", boardTasks);
}

function done(j, i) {
  if (boardTasks[i]["subtasks"][j]["complete"] == false) {
    document.getElementById(`${i}checkBox${j}`).src =
      "../assets/img/Property 1=hover checked.png";
    boardTasks[i]["subtasks"][j]["complete"] = true;
  } else {
    document.getElementById(`${i}checkBox${j}`).src =
      "../assets/img/Property 1=Default.png";
    boardTasks[i]["subtasks"][j]["complete"] = false;
  }
}

function loadProgressbar(index, subEndCount, finished) {
  let currentProgressbar = document.getElementById(`progressBar${index}`);
  let progress = finished / subEndCount;
  let width = progress * 100;
  currentProgressbar.innerHTML = renderProgressbar(
    subEndCount,
    finished,
    width
  );
}

//
function searchTask() {
  let search = document.getElementById("findInput").value;
  let boardTaskClass = document.querySelectorAll('boardCard');

  let idTodo = document.getElementById("todo");

  search = search.toLowerCase();
  if (search.length > 3) {
    taskQuery(idTodo, search ,boardTaskClass);
  }
}

async function taskQuery(idTodo, search, boardTaskClass) {
  boardTaskClass.forEach(container => {
    let title = container.querySelector('#title').innerText.toLowerCase();
    if (title.includes(search)) {
      container.style.display ='flex';
    }
    else{
      container.style.display = 'none'
    }
  })
}

 