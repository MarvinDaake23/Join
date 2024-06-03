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

function loadContacts() {
  let sContacts = document.getElementById("selectedContacts");

  sContacts.innerHTML = "";

  for (let i = 0; i < selectedTaskContacts.length; i++) {
    let element = selectedTaskContacts[i];

    sContacts.innerHTML += renderSelectedContacts(element, i);
  }
}

function loadContacts() {
  let sContacts = document.getElementById("selectedContacts");

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
  subtasks.push(subtask);
  subtaskList.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    subtaskList.innerHTML += subtaskListInput(subtasks[i]);
  }
  inputClear();
}

function editSubtaskList(i) {
  let editInput = document.getElementById(`subtaskField`);
  if (editInput) {
      // Erstelle ein Eingabefeld und setze seinen Wert auf den aktuellen Subtask-Wert
      let input = document.createElement('input');
      input.type = 'text';
      input.value = editInput.innerText;

      // Füge dem Eingabefeld einen Event-Listener hinzu, um die Bearbeitung zu beenden
      input.addEventListener('blur', function() {
          editInput.innerText = this.value;
      });

      // Ersetze das Anzeigefeld durch das Eingabefeld
      editInput.innerHTML = '';
      editInput.appendChild(input);
      input.focus();
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
 * function for bringing together all data from the input fields
 */
function addTask() {
  let title = document.getElementById("title").value;
  let desription = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = prios[prioValue];
  let category = categorys[cat];
  addTaskIntoArray(title, desription, date, prio, category);
}

/**
 * function to pass all data into an array
 */
function addTaskIntoArray(title, desription, date, prio, category) {
  async function addTaskIntoArray(title, desription, date, prio, category) {
    await fetch(BASE_URL + "tasks.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        type: "User Story",
        title: title,
        description: desription,
        subtasks: subtasks,
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
        category: category,
        priority: prio,
        dueDate: date,
      }),
    });

    task.push(temTask);
  }
  task.push(temTask);
}
