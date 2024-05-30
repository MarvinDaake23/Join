let doneBulian = false;
let boardTasks = [];

/*
let boardTasks = [
  {
    id: 0,
    type: "User Story",
    title: "Join Projekt",
    description: "build a Kanban board",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback",
    priority: "Low",
    dueDate: "23-05-2024",
  },
  {
    id: 2,
    type: "User Story",
    title: "Rasen mähen",
    description: "Kein Bock",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Christoph",
        lastName: "Völker",
        profilColor: "#FF7A00",
      },
    ],
    category: "todo",
    priority: "High",
    dueDate: "29-05-2024",
  },
  {
    id: 1,
    type: "Technical Task",
    title: "Saufen",
    description: "Das muss man immer machen",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "todo",
    priority: "High",
    dueDate: "29-05-2024",
  },
];
*/

let currentDraggedElement;

/**
 * function to initialize the board page
 */
async function boardInit() {
  boardTasks = await loadData("boardtasks");
  updateHTML();
  //includeHTML();  - edit christoph
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
    console.log(element);
    Subtasks.innerHTML += renderBoardBigContainerSubtasks(element, j);
  }
}

/*
 *function to render all boarTasks
 */
function updateHTML() {
  renderTodos();
  renderProgress();
  renderAwaitFeedback();
  renderDone();
}

/**
 * function for filtering and rendering all tasks with the category "To Do"
 */
function renderTodos() {
  let todo = boardTasks.filter((t) => t["category"] == "todo");
  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    document.getElementById("todo").innerHTML += renderBoardTask(
      element,
      index
    );
    loadPrioBoardTask(index);
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
  let inProgress = boardTasks.filter((t) => t["category"] == "progress");
  document.getElementById("progress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("progress").innerHTML += renderBoardTask(
      element,
      index
    );
    loadPrioBoardTask(index);
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
  let feedback = boardTasks.filter((t) => t["category"] == "feedback");
  document.getElementById("feedback").innerHTML = "";

  for (let index = 0; index < feedback.length; index++) {
    const element = feedback[index];
    document.getElementById("feedback").innerHTML += renderBoardTask(
      element,
      index
    );
    loadPrioBoardTask(index);
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
  let done = boardTasks.filter((t) => t["category"] == "done");
  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("done").innerHTML += renderBoardTask(
      element,
      index
    );
    loadPrioBoardTask(index);
    loadContactInBoardTask(index);
  }

  if (done.length == 0) {
    document.getElementById("done").innerHTML =
      renderBoardTaskPlaceholderDone();
  }
}

/**
 *  function to render the priority of each task in the small view
 */
function loadContactInBoardTask(i) {
  let contacts = document.getElementById("boardTaskContacts");
  for (let j = 0; j < boardTasks[i]["assignedTo"].length; j++) {
    const element = boardTasks[i]["assignedTo"][j];
    contacts.innerHTML += renderBoardTaskContacts(element);
  }
}

/**
 * function to render the priority of each task
 */
function loadPrioBoardTask(i) {
  let prio = document.getElementById("boardTaskPrio");
  if (boardTasks[i]["priority"] == "Low") {
    prio.classList.add("lowPrioImg");
  }
  if (boardTasks[i]["priority"] == "Medium") {
    prio.classList.add("medPrioImg");
  }
  if (boardTasks[i]["priority"] == "Urgent") {
    prio.classList.add("highPrioImg");
  }
}

/*
 * function to check which element is being moved
 */
function startDragging(id) {
  currentDraggedElement = id;
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

function done(j) {
  if (doneBulian == true) {
    document.getElementById(`checkBox${j}`).src =
      "../assets/img/Property 1=hover checked.png";
    doneBulian = false;
  } else {
    document.getElementById(`checkBox${j}`).src =
      "../assets/img/Property 1=Default.png";
    doneBulian = true;
  }
}
