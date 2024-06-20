let prios = ["Low", "Medium", "Urgent"];
let subtasks = [];
let task = [];
let prioValue = null;
let cat;
let selectedTaskContacts = [];
let direction = "add";

let subtaskCounter = 0;

/**
 * Onload Function for the Add Task page
 */
async function onLoadAddTask() {
  await includeHTML();
  updateHeaderInitials();
  contacts = await loadData("contacts");
  boardTasks = await loadData("boardtasks");
  loadContactList();
  prioChoose(1); //pre-selected medium
  // minimum date for new tasks is today
  document.getElementById("date").min = new Date().toLocaleDateString("fr-ca");
  listenToEnterButtonAtSubtaskInputField();
}

function listenToEnterButtonAtSubtaskInputField() {
  let inputField = document.getElementById("subtaskInput");
  inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      // Do work
      let inputValue = inputField.value;
      document.getElementById("subtaskList").innerHTML += `
      <li id="subtask${subtaskCounter}">
        <div class="listEntry">
          <span id="listEntry${subtaskCounter}">${inputValue}</span>
          <div>
            <img src="./assets/img/subtaskPen.svg" onclick="editSubtaskCVO(${subtaskCounter})">
            <img src="./assets/img/subtaskBasket.svg" onclick="deleteSubtaskCVO(${subtaskCounter})">
          </div>
        </div>
      </li>`;
      // clean up
      inputField.value = "";
      subtaskCounter++;
    }
  });
}

function deleteSubtaskCVO(id) {
  let subtask = document.getElementById(`subtask${id}`);
  document.getElementById("subtaskList").removeChild(subtask);
}

function editSubtaskCVO(id) {
  let value = document.getElementById(`listEntry${id}`).innerHTML;
  document.getElementById(`subtask${id}`).innerHTML = `
              <input value="${value}" form="" class="subtaskEdit">
              `;
}

function toggleContactList() {
  document.getElementById("contactList").classList.toggle("dNone");
}

/**
 *  function to load the contact list with all saved contacts
 */
function loadContactList() {
  // sort contacts by first name
  sortContacts();
  let contactWrapper = document.getElementById("contactList");

  // first shown contact: logged in user
  let idOfLoggedInUser = getIdOfLoggedInUser();

  // nur wenns kein Gast ist
  if (idOfLoggedInUser !== undefined) {
    contactWrapper.innerHTML += renderContactWrapper(
      contacts[idOfLoggedInUser],
      idOfLoggedInUser
    );
    // add: ME
    document.getElementById("userNameInList").innerHTML += " (Me)";
  }

  for (let i = 0; i < contacts.length; i++) {
    if (i != idOfLoggedInUser) {
      const element = contacts[i];
      contactWrapper.innerHTML += renderContactWrapper(element, i);
    }
  }
}

/**
 * function to load all selected Contacts for new task
 */
function selectContacts(i) {
  if (selectedTaskContacts.indexOf(contacts[i]) == -1) {
    selectedTaskContacts.push(contacts[i]);
    console.log(selectedTaskContacts);
  } else {
    selectedTaskContacts.splice(selectedTaskContacts.indexOf(contacts[i]), 1);
    console.log(selectedTaskContacts);
  }
  loadContacts();
}

function visitBoard() {
  window.location = "board.html";
}

function loadContacts() {
  let sContacts = document.getElementById("selectedContacts");

  sContacts.innerHTML = "";

  for (let i = 0; i < selectedTaskContacts.length; i++) {
    const element = selectedTaskContacts[i];
    sContacts.innerHTML += renderSelectedContacts(element);
  }
}

/**
 * function to load all added subtasks
 */
function loadSubtaskList() {
  let subtask = document.getElementById("subtaskInput").value;
  if (subtask) {
    subtasks.push(subtask);
  }
  renderSubtaskList();
  inputClear();
}

function subtaskListInput(element, i) {
  return /* html*/ `
  <div id="bigSubtaskContainer${i}" class="bigSubtaskContainer">
        <li class="liCat">
            <div id="subtask" class="subtask">
                <div id="subtaskField${i}">${element}</div>
                <div class="editContainerSubtask">
                  <div onclick="editSubtaskList('${element}', ${i})" class="edit iconContainerSubtask"></div>
                  <div class="inputIconSmallLine"></div>
                  <div onclick="deleteSubtask(${i})" class="trashIcon iconContainerSubtask"></div>
                </div>
              </div>
        </li>
  </div>
`;
}

function renderSubtaskList() {
  let subtaskList = document.getElementById("subTasks");
  subtaskList.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    if (subtasks[i]) {
      subtaskList.innerHTML += subtaskListInput(subtasks[i], i);
    }
  }
}

function editSubtaskList(element, i) {
  let bigSubtaskContainer = document.getElementById(`bigSubtaskContainer${i}`);

  bigSubtaskContainer.innerHTML = `
    <li class="liCat" id="liCat${i}">
      <div class="relativeContainer">
        <input type="text" id="editSubtaskInput${i}" value="${element}" class="editInput">
        <div class="editContainerSubtask positionFinalEditContainer">
          <div class="iconContainerSubtask inputIconTrash" onclick="deleteSubtask(${i})">
          </div>
          <div class="inputIconSmallLineEdit">
          </div>
          <div class="iconContainerSubtask inputIconCheck" onclick="saveEditedSubtask(${i})">
          </div>
        </div>
      </div>
    </li>
  `;

  document.getElementById(`liCat${i}`).classList.add(`noMarker`);
  document
    .getElementById(`bigSubtaskContainer${i}`)
    .classList.remove(`bigSubtaskContainer`);
}

function saveEditedSubtask(i) {
  let editedValue = document.getElementById(`editSubtaskInput${i}`).value;
  if (editedValue) {
    subtasks[i] = editedValue;
  } else {
    subtasks.splice(i, 1); // Remove the subtask if the edited value is empty
  }
  if (direction == "add") {
    renderSubtaskList();
  }
  if (direction == "edit") {
    editrenderSubtaskList();
  }
}

function deleteSubtask(i) {
  subtasks.splice(i, 1);
  renderSubtaskList();
}

function inputClear() {
  document.getElementById("subtaskInput").value = "";
}

/**
 * function to open all Wrapper on "AddTask" site
 */
function openWrapper(i) {
  let wrapperList = document.getElementById(`wrapperList${i}`);
  let wrapper = document.getElementById(`wrapper${i}`);

  if (wrapperList.classList.contains(`dNone`)) {
    wrapperList.classList.remove(`dNone`);
    document.getElementById(`arrowUp${i}`).classList.remove(`dNone`);
    document.getElementById(`arrowDown${i}`).classList.add(`dNone`);
    wrapper.classList.add(`openBoarder`);
    wrapperList.style.width = `${wrapper.offsetWidth}px`;
    document.getElementById(`wrapper${i}`).classList.add("blueOutlineInput");
  } else {
    wrapperList.classList.add(`dNone`);
    document.getElementById(`arrowUp${i}`).classList.add(`dNone`);
    document.getElementById(`arrowDown${i}`).classList.remove(`dNone`);
    wrapper.classList.remove(`openBoarder`);
    document.getElementById(`wrapper${i}`).classList.remove("blueOutlineInput");
  }
}

/**
 * Function to select the priority
 */
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

/**
 * Function to reset the priority
 */
function resetPrioContainers() {
  document.getElementById("prio high").classList.remove("highPrioBackground");
  document
    .getElementById("highPrioImg")
    .classList.remove("highPrioImageChange");
  document.getElementById("prio med").classList.remove("medPrioBackground");
  document.getElementById("medPrioImg").classList.remove("medPrioImageChange");
  document.getElementById("prio low").classList.remove("lowPrioBackground");
  document.getElementById("lowPrioImg").classList.remove("lowPrioImageChange");
}

/**
 * function to check whether the input field subtask is selected
 */
function inputSelector() {
  let subtaskInput = document.getElementById("subtaskInput");
  subtaskInput.addEventListener("focus", function () {
    inputFocus();
  });
}

/**
 * function for changing the icons when the input field is selected
 */
function inputFocus() {
  let imgContainer = document.getElementById("imgContainerSubtask");
  imgContainer.classList.remove("imgContainerBackground");
  imgContainer.innerHTML = inputFocusInput();
}

/**
 * function to change the icon if the input field is not selected
 */
function inputBlur() {
  let imgContainer = document.getElementById("imgContainerSubtask");
  imgContainer.classList.add("imgContainerBackground");
  imgContainer.innerHTML = ``;
}

/**
 * function to clear the input field
 */
function inputClear() {
  let subtaskInput = document.getElementById("subtaskInput");
  subtaskInput.value = ``;
  inputBlur();
}

/**
 * function for bringing together all data from the input fields
 */
async function addTask(column) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = prios[prioValue];
  let category = document.getElementById("category").value; //categorys[cat];
  let taskCategory = [];

  switch (column) {
    case 1:
      taskCategory = "todo";
      break;
    case 2:
      taskCategory = "progress";
      break;
    case 3:
      taskCategory = "feedback";
      break;
    default:
      taskCategory = "todo";
  }

  let data = generateDataForTask(
    title,
    description,
    date,
    prio,
    category,
    taskCategory
  );
  boardTasks.push(data);
  // update firebase
  await putData("boardtasks", boardTasks);
  // zur board seite
  visitBoard();
}

function generateDataForTask(
  title,
  description,
  date,
  prio,
  category,
  taskCategory
) {
  // Create JSON
  let data = {
    title: title,
    description: description,
    subtasks: [],
    finishedSubtasks: 0,
    assignedTo: [],
    type: category,
    priority: prio,
    dueDate: date,
    category: taskCategory,
  };

  /*contacts!*/
  for (let index = 0; index < selectedTaskContacts.length; index++) {
    const contact = selectedTaskContacts[index];
    let json = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      profileColor: contact.profileColor,
    };
    data.assignedTo.push(json);
  }

  /*subtasks*/
  for (let index = 0; index < subtasks.length; index++) {
    const subtask = subtasks[index];
    let json = {
      subtaskText: subtask,
      complete: false,
    };
    data.subtasks.push(json);
  }

  return data;
}
