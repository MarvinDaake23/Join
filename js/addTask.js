let categorys = ["Technical Task", "User Story"];
let prios = ["Low", "Medium", "Urgent"];
let subtasks = [];
let task = [];
let prioValue;
let cat;
let selectedTaskContacts = [];

/**
 * Onload Function for the Add Task page
 */
async function onLoadAddTask() {
  await includeHTML();
  updateHeaderInitials();
  init();
}

/**
 *  function to load the category wrapper with all saved categorys
 */
function loadWrapper() {
  let wrapperList = document.getElementById("wrapperList");

  for (let i = 0; i < categorys.length; i++) {
    wrapperList.innerHTML += /*html */ `
          <li onclick="chooseCategory(${i})"  class ="list">
              <span id="category${i}">
                  <div>${categorys[i]}</div>
              </span>
          </li>
          `;
  }
}

/**
 *  function to load the contact wrapper with all saved contacts
 */
function loadContactWrapper() {
  let contactWrapper = document.getElementById("wrapperListAt");

  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    contactWrapper.innerHTML += renderContactWrapper(element, i);
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
  let subtaskList = document.getElementById("subTasks");
  subtaskList.innerHTML = ``;

  if(subtask == ""){
  }else {
  subtasks.push(subtask);
  for (let i = 0; i < subtasks.length; i++) {
    subtaskList.innerHTML += subtaskListInput(subtasks[i], i);
  }
  inputClear();
}
}

function updateSubtasksList(i){
  let subtaskList = document.getElementById(`bigSubtaskContainer${i}`);
  for (let i = 0; i < subtasks.length; i++) {
    subtaskList.innerHTML = subtaskListInput(subtasks[i], i);
  }
  inputClearAmendedSubtask();
}

function subtaskListInput(element, i) {
  return /* html*/ `
  <div id="bigSubtaskContainer${i}" class="bigSubtaskContainer">
        <li class="liCat">
            <div id="subtask" class="subtask">
                <div id="subtaskField${i}">${element}</div>
                <div class="editContainerSubtask">
                  <div onclick="editSubtaskList('${element}', ${i})" class="edit iconContainerSubtask"></div>
                  <div class="smallLine iconContainerSubtask"></div>
                  <div onclick="deleteSubtask(${i})" class="trashIcon iconContainerSubtask"></div>
                </div>
            </div>
        </li>
  </div>
`;
}

function editSubtaskList(element, i) {
  let container = document.getElementById(`bigSubtaskContainer${i}`);
  container.innerHTML = templateEditSubtask(element, i);
}

function templateEditSubtask(element, i) {
  return /* html*/ `
  <input id="amendedSubtask${i}" value="${element}" class="subtaskInputField" type="text">
  <div class="editContainerSubtask">
    <img onclick="deleteSubtask(${i})"src="../assets/img/trash.png" class="iconContainerSubtask">
    <img src="../assets/img/littleLineSubtask.png" class="iconContainerSubtask">
    <img onclick="keepSubtask(${i})"src="../assets/img/check.png" class="iconContainerSubtask">
  </div>
  `;
}

function deleteSubtask(i){
  subtasks.splice(i, 1);
  updateSubtasksList(i);
}

function keepSubtask(i) {
  let newSubtask = document.getElementById(`amendedSubtask${i}`).value;  
  if (newSubtask.length > 1) {
      subtasks.splice(i, 1);
      subtasks.push(newSubtask)
      updateSubtasksList(i);
  }
}

/**
 * function to open all Wrapper on "AddTask" side
 */
/**
 
function to open all Wrapper on "AddTask" side*/
function openWrapper(i) {
  let wrapperList = document.getElementById(`wrapperList${i}`);
  let wrapper = document.getElementById(`wrapper${i}`);

  if (wrapperList.classList.contains(`dNone`)) {
    wrapperList.classList.remove(`dNone`);
    document.getElementById(`arrowUp${i}`).classList.remove(`dNone`);
    document.getElementById(`arrowDown${i}`).classList.add(`dNone`);
    wrapper.classList.add(`openBorader`);
    wrapperList.style.width = `${wrapper.offsetWidth}px`;
    document.getElementById(`wrapper${i}`).classList.add("blueOutlineInput");
  } else {
    wrapperList.classList.add(`dNone`);
    document.getElementById(`arrowUp${i}`).classList.add(`dNone`);
    document.getElementById(`arrowDown${i}`).classList.remove(`dNone`);
    wrapper.classList.remove(`openBorader`);
    document.getElementById(`wrapper${i}`).classList.remove("blueOutlineInput");
  }
}

/**
 * function to select the category
 */
function chooseCategory(i) {
  let placeholder = document.getElementById("placeholder");
  let choose = document.getElementById(`category${i}`).innerHTML;
  placeholder.innerHTML = choose;
  cat = i;
}

/**
 * function to alert if required dield is empty
 */
function checkRequiredInputs() {
  let title = document.getElementById("title").value;
  let alert = document.getElementById("requiredInputAddTask");

  if (!title) {
    alert.innerHTML = `
    This field is required
    `;
  } else {
    alert.innerHTML = "";
    document.getElementById("title").classList.add("blueOutlineInput");
  }

  let titleInput = document.getElementById("title");
  titleInput.addEventListener("blur", checkRequiredInputs);
  titleInput.addEventListener("input", checkRequiredInputs);
}

function checkCategory() {
  let category = document.getElementById("placeholder");
  let alert = document.getElementById("requiredCategory");

  if ((category.innerHTML = "Select task Category")) {
    alert.innerHTML = `
    This field is required
    `;
  } else {
    alert.innerHTML = "";
    document.getElementById("wrapper").classList.add("blueOutlineInput");
  }
}

// document.getElementById('addTaskForm').addEventListener('submit', function (event) {
//   // Alle Fehlermeldungen entfernen
//   let errorMessages = document.querySelectorAll('.error-message');
//   errorMessages.forEach(function (message) {
//     message.textContent = '';
//   });

//   // Überprüfen, ob die Felder gültig sind
//   let isValid = true;
//   let fields = event.target.elements;
//   for (let i = 0; i < fields.length; i++) {
//     if (fields[i].hasAttribute('required') && !fields[i].validity.valid) {
//       let errorMessage = fields[i].nextElementSibling;
//       if (fields[i].validity.valueMissing) {
//         errorMessage.textContent = 'Dieses Feld ist erforderlich.';
//       } else if (fields[i].type === 'email' && fields[i].validity.typeMismatch) {
//         errorMessage.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
//       }
//       isValid = false;
//     }
//   }

//   // Wenn das Formular nicht gültig ist, verhindern wir das Absenden
//   if (!isValid) {
//     event.preventDefault();
//   }
// });

/**
 * function to select the priority
 */
function prioChoose(i) {
  prioValue = i;

  resetPrioContainers();

  if (prioValue == 2) {
    document.getElementById("prio high").classList.add("highPrioBackground");
    document.getElementById("highPrioImg").classList.add("highPrioImageChange");
  }
  if (prioValue == 1) {
    document.getElementById("prio med").classList.add("medPrioBackground");
    document.getElementById("medPrioImg").classList.add("medPrioImageChange");
  }
  if (prioValue == 0) {
    document.getElementById("prio low").classList.add("lowPrioBackground");
    document.getElementById("lowPrioImg").classList.add("lowPrioImageChange");
  }
}

/**
 *function to reset the priority
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
 * function to clear the input field
 */
function inputClearAmendedSubtask() {
  let subtaskInputAmended = document.getElementById(`amendedSubtask`);
  subtaskInputAmended.value = ``;
  inputBlur();
}

/**
 * function for bringing together all data from the input fields
 */
async function addTask() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = prios[prioValue];
  let category = categorys[cat];
  let data = generateDataForTask(title, description, date, prio, category);
  boardTasks.push(data);
  // update firebase
  await putData("boardtasks", boardTasks);
  // zur board seite
  visitBoard();
}

function generateDataForTask(title, description, date, prio, category) {
  // Create JSON
  let data = {
    title: title,
    description: description,
    subtasks: "",
    finishedSubtasks: [],
    assignedTo: [],
    type: category,
    priority: prio,
    dueDate: date,
    category: "todo",
  };

  /*wichtig!*/
  for (let index = 0; index < selectedTaskContacts.length; index++) {
    const contact = selectedTaskContacts[index];
    let json = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      profileColor: contact.profileColor,
    };
    data.assignedTo.push(json);
  }

  return data;
}
