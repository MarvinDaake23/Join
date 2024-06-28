let task = [];
let subtasks = [];
let subtaskCounter = 0;

let prios = ["Low", "Medium", "Urgent"];
let prioIndex = 0;

let selectedTaskContacts = [];

/**
 * Onload Function for the Add Task page
 */
async function onLoadAddTask() {
  await includeHTML();
  updateHeaderInitials();
  document.getElementById("closeButton").style.display = "none";
  contacts = await loadData("contacts");
  boardTasks = await loadData("boardtasks");
  loadContactList();
  prioChoose(1); //pre-selected medium
  // minimum date for new tasks is today
  document.getElementById("date").min = new Date().toLocaleDateString("fr-ca");
  listenToEnterButtonAtSubtaskInputField();
}

/**
 * function to search contacts when adding a task
 */
function searchContacts() {
  let search = document.getElementById("assignedContactsInputField").value.toLowerCase();
  let allContacts = document.querySelectorAll(".contactWrapperItem");
  if (search.length >= 1) {
    contactQuery(search, allContacts);
  } else {
  }
}

/**
 * function to search contacts - when editting a task (different input field)
 */
function searchContactsForEditTask() {
  let search = document.getElementsByClassName("assignedContactsInputFieldId")[1].value.toLowerCase();
  let allContacts = document.querySelectorAll(".contactWrapperItem");
  if (search.length >= 1) {
    contactQuery(search, allContacts);
  } else {
  }
}

/**
 * function to display only found contacts
 *
 * @param {*} search - Searchstring
 * @param {*} allContacts
 */
async function contactQuery(search, allContacts) {
  allContacts.forEach((container) => {
    let username = container.querySelector("#userNameInList").innerText.toLowerCase();
    if (username.includes(search)) {
      container.style.display = "flex";
    } else {
      container.style.display = "none";
    }
  });
}

/**
 * function to add a subtask when enter button is pressed in the input field
 */
function listenToEnterButtonAtSubtaskInputField() {
  let inputField = document.getElementById("subtaskInput");
  inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      let inputValue = inputField.value;
      if (inputValue) {
        document.getElementById("subtaskList").innerHTML += renderSubtaskListEntry(inputValue, subtaskCounter);
        inputField.value = "";
        subtaskCounter++;
      }
    }
  });
}

/**
 * function to add a subtask when enter button is pressed in the input field (while editing a task)
 */
function listenToEnterButtonAtSubtaskInputEditField(subtaskCounter) {
  let inputField = document.getElementById(`subtaskInput${subtaskCounter}`);
  inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      // Do work
      saveEdittedSubtask(subtaskCounter);
    }
  });
}

/**
 * function to render the subtasks in the list
 * @param {*} inputValue
 * @param {*} subtaskCounter
 * @returns
 */
function renderSubtaskListEntry(inputValue, subtaskCounter) {
  return `
        <li id="subtask${subtaskCounter}">
        <div class="listEntry">
          <span class="listEntrySpan" id="listEntry${subtaskCounter}">${inputValue}</span><span class="listEntryCheckSpan" style="display:none;">false</span>
          <div>
            <img src="./assets/img/subtaskPen.svg" onclick="showEditSubtask(${subtaskCounter})">
            <img src="./assets/img/subtaskBasket.svg" onclick="deleteSubtask(${subtaskCounter})">
          </div>
        </div>
      </li>`;
}

/**
 * deleting a subtask
 * @param {} i
 */
function deleteSubtask(i) {
  let subtask = document.getElementById(`subtask${i}`);
  document.getElementById("subtaskList").removeChild(subtask);
}

/**
 * function to edit an existing subtask
 * @param {*} subtaskCounter
 */
function showEditSubtask(subtaskCounter) {
  let value = document.getElementById(`listEntry${subtaskCounter}`).innerHTML;
  document.getElementById(`subtask${subtaskCounter}`).innerHTML = `
              <div class="subtaskInputField">
                <input id="subtaskInput${subtaskCounter}" value="${value}" form="" class="subtaskEdit" onblur="saveEdittedSubtask(${subtaskCounter})">
              </div>
              `;
  document.getElementById(`subtaskInput${subtaskCounter}`).focus();
  document.getElementById(`subtaskInput${subtaskCounter}`).selectionStart = document.getElementById(`subtaskInput${subtaskCounter}`).value.length;
  document.getElementById(`subtaskInput${subtaskCounter}`).selectionEnd = document.getElementById(`subtaskInput${subtaskCounter}`).value.length;
  listenToEnterButtonAtSubtaskInputEditField(subtaskCounter);
}

/**
 * function to save an editted subtask
 * @param {*} subtaskCounter
 */
function saveEdittedSubtask(subtaskCounter) {
  let inputValue = document.getElementById(`subtaskInput${subtaskCounter}`).value;
  if (inputValue) {
    document.getElementById(`subtask${subtaskCounter}`).innerHTML = `
        <div class="listEntry">
          <span class="listEntrySpan" id="listEntry${subtaskCounter}">${inputValue}</span>
          <div>
            <img src="./assets/img/subtaskPen.svg" onclick="showEditSubtask(${subtaskCounter})">
            <img src="./assets/img/subtaskBasket.svg" onclick="deleteSubtask(${subtaskCounter})">
          </div>
        </div>
`;
  } else {
    deleteSubtask(subtaskCounter);
  }
}

/**
 * function to toggle display of the contact list (on/off)
 */
function toggleContactList() {
  document.getElementById("contactList").classList.toggle("dNone");
  // wenn aktuell ausgeklappt muss es auch anders zu schließen gehen!
  if (document.getElementById("contactList").classList.length == 1) {
    document.getElementById("body").setAttribute("onclick", "toggleContactList();");
  } else {
    document.getElementById("body").setAttribute("onclick", "");
  }
}

/**
 * displaying the contact list
 */
function showContactList() {
  document.getElementById("contactList").classList.remove("dNone");
}

/**
 * function to return the actual subtasks when adding a task to the board
 * @returns subtask array
 */
function extractSubtasksForTask() {
  let subtasks = [];
  let list = document.querySelectorAll(".listEntrySpan");
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    subtasks.push(element.innerHTML);
  }
  return subtasks;
}

/**
 * function to return the already checked subtasks (important when editting a task)
 * @returns checks array
 */
function extractSubtasksCheckForTask() {
  let checks = [];
  let list = document.querySelectorAll(".listEntryCheckSpan");
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.innerHTML == "true") {
      checks.push(true);
    } else {
      checks.push(false);
    }
  }
  return checks;
}

/**
 *  function to load the contact list with all saved contacts
 */
function loadContactList() {
  sortContacts();
  let contactWrapper = document.getElementById("contactList");
  contactWrapper.innerHTML = "";
  let idOfLoggedInUser = getIdOfLoggedInUser();
  if (idOfLoggedInUser !== undefined) {
    contactWrapper.innerHTML += renderContactWrapper(contacts[idOfLoggedInUser], idOfLoggedInUser);
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
 * function to load all selected contacts for new task
 */
function selectContacts(i) {
  if (selectedTaskContacts.indexOf(contacts[i]) == -1) {
    selectedTaskContacts.push(contacts[i]);
  } else {
    selectedTaskContacts.splice(selectedTaskContacts.indexOf(contacts[i]), 1);
  }
  showSelectedContacts();
}

/**
 * function to switch to the board site after adding a task
 */
function visitBoard() {
  window.location = "board.html";
}

/**
 * function to render the selected contacts with a maximum
 */
function showSelectedContacts() {
  let sContacts = document.getElementById("selectedContacts");
  sContacts.innerHTML = "";
  let maxAmount = 4;
  let amount = selectedTaskContacts.length;
  let more = amount - maxAmount;
  if (amount <= maxAmount) {
    for (let i = 0; i < amount; i++) {
      const element = selectedTaskContacts[i];
      sContacts.innerHTML += renderSelectedContacts(element);
    }
  } else {
    for (let i = 0; i < maxAmount; i++) {
      const element = selectedTaskContacts[i];
      sContacts.innerHTML += renderSelectedContacts(element);
    }
    sContacts.innerHTML += renderSelectedContactsMore(more);
  }
}

/**
 * Function to select the priority
 */
function prioChoose(i) {
  resetPrioContainers();
  if (i === 2) {
    document.getElementById("prioHigh").classList.add("highPrioBackground");
    document.getElementById("highPrioImg").classList.add("highPrioImageChange");
    prioIndex = 2;
  } else if (i === 1) {
    document.getElementById("prioMed").classList.add("medPrioBackground");
    document.getElementById("medPrioImg").classList.add("medPrioImageChange");
    prioIndex = 1;
  } else if (i === 0) {
    document.getElementById("prioLow").classList.add("lowPrioBackground");
    document.getElementById("lowPrioImg").classList.add("lowPrioImageChange");
    prioIndex = 0;
  }
}

/**
 * Function to reset the priority
 */
function resetPrioContainers() {
  document.getElementById("prioHigh").classList.remove("highPrioBackground");
  document.getElementById("highPrioImg").classList.remove("highPrioImageChange");
  document.getElementById("prioMed").classList.remove("medPrioBackground");
  document.getElementById("medPrioImg").classList.remove("medPrioImageChange");
  document.getElementById("prioLow").classList.remove("lowPrioBackground");
  document.getElementById("lowPrioImg").classList.remove("lowPrioImageChange");
}

/**
 * function for adding a task to the board (into the wanted category)
 */
async function addTask(column) {
  subtasks = extractSubtasksForTask();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = prios[prioIndex];
  let category = document.getElementById("category").value;
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
  let data = generateDataForTask(title, description, date, prio, category, taskCategory);
  boardTasks.push(data);
  await putData("boardtasks", boardTasks);
  visitBoard();
}

/**
 * function for collecting all the data for the new task
 * @param {*} title
 * @param {*} description
 * @param {*} date
 * @param {*} prio
 * @param {*} category
 * @param {*} taskCategory
 * @returns
 */
function generateDataForTask(title, description, date, prio, category, taskCategory) {
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
  for (let index = 0; index < selectedTaskContacts.length; index++) {
    const contact = selectedTaskContacts[index];
    let json = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      profileColor: contact.profileColor,
    };
    data.assignedTo.push(json);
  }
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

/**
 * function to clear the assigned contacts and subtasks when pressing the "clear"-button
 */
function clearAssignedContactsAndSubtasks() {
  selectedTaskContacts = [];
  showSelectedContacts();
  document.getElementById("subtaskList").innerHTML = "";
}
