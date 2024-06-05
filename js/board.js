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

function fillWithPlaceholders() {
  document.getElementById("todo").innerHTML = renderBoardTaskPlaceholderTodo();
  document.getElementById("progress").innerHTML =
    renderBoardTaskPlaceholderProgress();
  document.getElementById("feedback").innerHTML =
    renderBoardTaskPlaceholderFeedback();
  document.getElementById("done").innerHTML = renderBoardTaskPlaceholderDone();
}

function renderAllBoardTasks() {
  fillWithPlaceholders();
  for (let index = 0; index < boardTasks.length; index++) {
    const boardTask = boardTasks[index];
    let finished = boardTask.finishedSubtasks;
    let subtaskCount = boardTask.subtasks;
    if (boardTask.category == "todo") {
      document.getElementById("todo").innerHTML += renderBoardTask(
        boardTask,
        index
      );
      //placeholder unsichtbar machen
      document.getElementById("todoPlaceholder").style.display = "none";
    } else if (boardTask.category == "progress") {
      document.getElementById("progress").innerHTML += renderBoardTask(
        boardTask,
        index
      );
      //placeholder unsichtbar machen
      document.getElementById("progressPlaceholder").style.display = "none";
    } else if (boardTask.category == "feedback") {
      document.getElementById("feedback").innerHTML += renderBoardTask(
        boardTask,
        index
      );
      //placeholder unsichtbar machen
      document.getElementById("feedbackPlaceholder").style.display = "none";
    } else if (boardTask.category == "done") {
      document.getElementById("done").innerHTML += renderBoardTask(
        boardTask,
        index
      );
      //placeholder unsichtbar machen
      document.getElementById("donePlaceholder").style.display = "none";
    }
    //loadProgressbar(index, progressName, subtaskCount.length, finished);
    if (subtaskCount.length != 0) {
      loadProgressbar(index, subtaskCount.length, finished);
    }
    loadPrioBoardTask(index);
    loadContactInBoardTask(index);
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
    //prio.innerHTML = "Low";
  }
  if (boardTasks[i]["priority"] == "Medium") {
    prio.classList.add("medPrioImg");
    //prio.innerHTML = "Medium";
  }
  if (boardTasks[i]["priority"] == "Urgent") {
    prio.classList.add("highPrioImg");
    //prio.innerHTML = "Urgent";
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

async function done(j, i) {
  if (boardTasks[i]["subtasks"][j]["complete"] == false) {
    document.getElementById(`${i}checkBox${j}`).src =
      "../assets/img/Property 1=hover checked.png";
    boardTasks[i]["subtasks"][j]["complete"] = true;
    boardTasks[i]["finishedSubtasks"]++;
  } else {
    document.getElementById(`${i}checkBox${j}`).src =
      "../assets/img/Property 1=Default.png";
    boardTasks[i]["subtasks"][j]["complete"] = false;
    boardTasks[i]["finishedSubtasks"]--;
  }
  await putData("boardtasks", boardTasks);
  updateHTML();
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
  let search = document.getElementById("findInput").value.toLowerCase();
  let boardTaskClass = document.querySelectorAll(".boardCard");

  if (search.length > 3) {
    taskQuery(search, boardTaskClass);
  } else {
    boardTaskClass.forEach((container) => {
      container.style.display = "flex";
    });
  }
}

async function taskQuery(search, boardTaskClass) {
  boardTaskClass.forEach((container) => {
    let title = container.querySelector("#title").innerText.toLowerCase();
    let description = container
      .querySelector("#description")
      .innerText.toLowerCase();
    if (title.includes(search) || description.includes(search)) {
      container.style.display = "flex";
    } else {
      container.style.display = "none";
    }
  });
}

async function deleteTask(i) {
  boardTasks.splice(i, 1);
  // neu hochladen
  await putData("boardtasks", boardTasks);
  removeboardBigContainer();
  updateHTML();
}

function rendersubtask() {
  let newTask = document.getElementById('boardBigContainer');
  newTask.innerHTML =``; 

  newTask.innerHTML = rendersubtaskTemplate();
}