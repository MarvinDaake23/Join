let expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

let doneBulian = false;
let boardTasks = [];

let currentDraggedElement;

function showAddTask(column) {
  document.getElementById("modalBackground").style.display = "block";
  // update form
  document
    .getElementById("addTaskForm")
    .setAttribute("onsubmit", `addTask(${column});return false;`);
  prioChoose(1);
  loadContactList();
  document.getElementById("date").min = new Date().toLocaleDateString("fr-ca");
  listenToEnterButtonAtSubtaskInputField();
}

function closeModal() {
  document.getElementById("modalBackground").style.display = "none";
}

/**
 * function to initialize the board page
 */
async function boardInit() {
  await includeHTML();
  updateHeaderInitials();
  boardTasks = await loadData("boardtasks");
  contacts = await loadData("contacts");
  updateHTML();
}

function loadContacteditWrapper() {
  // sort contacts by first name
  sortContacts();

  let contactWrapper = document.getElementById("editwrapperListAt");

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    contactWrapper.innerHTML += renderContactWrapper(element, i);
  }
}

function inputeditSelector() {
  let subtaskInput = document.getElementById("editsubtaskInput");
  subtaskInput.addEventListener("focus", function () {
    inputFocus();
  });
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

async function removeboardBigContainer() {
  document.getElementById("background").classList.add("d-none");
  document.getElementById("boardBigContainer").classList.add("d-none");
  boardInit();
}

/**
 * function to render the lists in the large view of the task
 */
function loadBoardBigContainerLists(i) {
  if (boardTasks[i].subtasks) {
    loadBoardBigContainerSubtasks(i);
  }
  if (boardTasks[i].assignedTo) {
    loadBoardBigContainerContacts(i);
  }
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
  for (let j = 0; j < boardTasks[i].subtasks.length; j++) {
    const element = boardTasks[i].subtasks[j];
    let src = "";
    if (element.complete == false) {
      src = "../assets/img/Property 1=Default.png";
    } else {
      src = "../assets/img/Property 1=hover checked.png";
    }
    Subtasks.innerHTML += renderBoardBigContainerSubtasks(element, j, i, src);
  }
}

/**
 *  function to render all boardTasks
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
    let subtasks = boardTask.subtasks;
    let assignedTo = boardTask.assignedTo;

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
    if (subtasks && subtasks.length != 0) {
      loadProgressbar(index, subtasks.length, finished);
    }
    //loadPrioBoardTask(index); -> christoph

    if (assignedTo) {
      // nur wenn kontakte zugeordnet sind, rendern
      loadContactInBoardTask(index);
    }
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
  // clear input field
  document.getElementById("findInput").value = "";
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

function searchTask() {
  let search = document.getElementById("findInput").value.toLowerCase();
  let boardTaskClass = document.querySelectorAll(".boardCard");

  if (search.length >= 3) {
    taskQuery(search, boardTaskClass);
  } else {
    /*
    boardTaskClass.forEach((container) => {
      container.style.display = "flex";
    });
    */
    // besser: neu rendern!
    renderAllBoardTasks();
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
      // wie viele sind noch drin
      checkIfEmptyContainer1();
      checkIfEmptyContainer2();
      checkIfEmptyContainer3();
      checkIfEmptyContainer4();
    }
  });
}

async function checkIfEmptyContainer1() {
  let all = document.querySelectorAll("#todo > div").length;
  let invisible = document.querySelectorAll(
    '#todo > div[style*="display: none"]'
  ).length;
  if (all == invisible) {
    document.getElementById("todoPlaceholder").style.display = "flex";
  }
}

async function checkIfEmptyContainer2() {
  let all = document.querySelectorAll("#progress > div").length;
  let invisible = document.querySelectorAll(
    '#progress > div[style*="display: none"]'
  ).length;
  if (all == invisible) {
    document.getElementById("progressPlaceholder").style.display = "flex";
  }
}

async function checkIfEmptyContainer3() {
  let all = document.querySelectorAll("#feedback > div").length;
  let invisible = document.querySelectorAll(
    '#feedback > div[style*="display: none"]'
  ).length;
  if (all == invisible) {
    document.getElementById("feedbackPlaceholder").style.display = "flex";
  }
}

async function checkIfEmptyContainer4() {
  let all = document.querySelectorAll("#done > div").length;
  let invisible = document.querySelectorAll(
    '#done > div[style*="display: none"]'
  ).length;
  if (all == invisible) {
    document.getElementById("donePlaceholder").style.display = "flex";
  }
}

async function deleteTask(i) {
  boardTasks.splice(i, 1);
  // neu hochladen
  await putData("boardtasks", boardTasks);
  removeboardBigContainer();
  updateHTML();
}

async function rendersubtask(i) {
  let newTask = document.getElementById("boardBigContainer");
  let title = boardTasks[i]["title"];
  let description = boardTasks[i]["description"];
  let dueDate = boardTasks[i]["dueDate"];
  loadData("contacts");

  direction =
    "edit"; /* Change the direction for rendering the subtask, not from "AddTask" but to "board" view */
  newTask.innerHTML = ``;
  newTask.innerHTML = rendersubtaskTemplate(title, description, dueDate, i);
  loadContacteditWrapper();
  inputeditSelector();

  subtasks.splice(0, subtasks.length);
  for (let j = 0; j < boardTasks[i]["subtasks"].length; j++) {
    let response = await fetch(
      `${BASE_URL}boardtasks/${i}/subtasks/${j}/subtaskText.json`
    );
    let responseJson = await response.json();
    subtasks.push(responseJson);
  }

  let sContacts = document.getElementById("selectedContacts");
  for (let x = 0; x < selectedTaskContacts.length; x++) {
    const element = selectedTaskContacts[x];
    sContacts.innerHTML += renderSelectedContacts(element);
  }

  editrenderSubtaskList(i);
}

function editopenWrapper(i) {
  let wrapperList = document.getElementById(`editwrapperList${i}`);
  let wrapper = document.getElementById(`editwrapper${i}`);

  if (wrapperList.classList.contains(`d-none`)) {
    wrapperList.classList.remove(`d-none`);
    document.getElementById(`editarrowUp${i}`).classList.remove(`d-none`);
    document.getElementById(`editarrowDown${i}`).classList.add(`d-none`);
    wrapper.classList.add(`openBorader`);
    wrapperList.style.width = `${wrapper.offsetWidth}px`;
    document
      .getElementById(`editwrapper${i}`)
      .classList.add("blueOutlineInput");
  } else {
    wrapperList.classList.add(`d-none`);
    document.getElementById(`editarrowUp${i}`).classList.add(`d-none`);
    document.getElementById(`editarrowDown${i}`).classList.remove(`d-none`);
    wrapper.classList.remove(`openBorader`);
    document
      .getElementById(`editwrapper${i}`)
      .classList.remove("blueOutlineInput");
  }
}

function prioChoose(i) {
  if (prioValue === i) {
    prioValue = null;
    resetPrioContainers();
  } else {
    prioValue = i;
    resetPrioContainers();
    if (prioValue === 2) {
      document.getElementById("prio high").classList.add("highPrioBackground");
      document
        .getElementById("highPrioImg")
        .classList.add("highPrioImageChange");
    }
    if (prioValue === 1) {
      document.getElementById("prio med").classList.add("medPrioBackground");
      document.getElementById("medPrioImg").classList.add("medPrioImageChange");
    }
    if (prioValue === 0) {
      document.getElementById("prio low").classList.add("lowPrioBackground");
      document.getElementById("lowPrioImg").classList.add("lowPrioImageChange");
    }
  }
}

async function editTask(i) {
  let edittitle = document.getElementById(`edittitle${i}`).value;
  let editdescription = document.getElementById(`editdescription${i}`).value;
  let editdate = document.getElementById(`editdate${i}`).value;
  let prio = prios[prioValue];
  let category = document.getElementById("category").value; //categorys[cat];

  boardTasks[i].title = edittitle;
  boardTasks[i].description = editdescription;
  boardTasks[i].date = editdate;

  /*  boardTasks[i].prio = prio;
 boardTasks[i].category = category; */
  await putData("boardtasks", boardTasks);
  boardInit();
}

function editInputFocus() {
  let editaddTaskinEditTask = document.getElementById("editaddTaskinEditTask");
  let editimgContainerSubtask = document.getElementById(
    "editimgContainerSubtask"
  );

  editaddTaskinEditTask.classList.add("d-none");
  editimgContainerSubtask.classList.remove("d-none");
}

function editInputBlur() {
  let editaddTaskinEditTask = document.getElementById("editaddTaskinEditTask");
  let editimgContainerSubtask = document.getElementById(
    "editimgContainerSubtask"
  );

  editaddTaskinEditTask.classList.remove("d-none");
  editimgContainerSubtask.classList.add("d-none");
}

async function editloadSubtaskList(i) {
  subtask = document.getElementById("editsubtaskInput").value;
  let json = {
    subtaskText: subtask,
    complete: false,
  };
  if (json) {
    boardTasks[i].subtasks.push(json);
  }
  editrenderSubtaskList(i);
  editinputClear();
}

function editrenderSubtaskList(i) {
  let subtaskList = document.getElementById("editsubTasks");
  subtaskList.innerHTML = ``;

  for (let j = 0; j < boardTasks[i].subtasks.length; j++) {
    subtaskList.innerHTML += subtaskListInput(
      boardTasks[i].subtasks[j].subtaskText,
      j
    );
  }
}

function editinputClear() {
  document.getElementById("editsubtaskInput").value = "";
}
