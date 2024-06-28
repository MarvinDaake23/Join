/**
 * function to transform the add task modal to edit task
 * @param {} id
 */
function updateAddTaskFormToEditTask(id) {
  document.getElementsByClassName("formVertLineId")[1].classList.add("d-none");
  document.getElementsByClassName("addTaskHeadline")[1].classList.add("d-none");
  document.getElementsByClassName("headLine")[1].style.display = "flex";
  document.getElementsByClassName("headLine")[1].style.justifyContent = "flex-end";
  document.getElementsByClassName("addTaskFormId")[1].setAttribute("onsubmit", `editTask(${id});return false;`);
  document.getElementsByClassName("createButton")[1].innerHTML = "Edit Task";
  document.getElementsByClassName("lowerSpans")[1].style.display = "none";
  document.getElementsByClassName("clearButton")[1].style.display = "none";
  document.getElementsByClassName("lower")[1].style.justifyContent = "flex-end";
  document.getElementsByClassName("upper")[1].style.gap = "20px"; // instead of 50px
  document.getElementsByClassName("closeButtonId")[1].setAttribute("onclick", "removeboardBigContainer()");
  document.getElementsByClassName("assignedContactsInputFieldId")[1].setAttribute("onclick", "toggleContactListForEditTask()");
  document.getElementsByClassName("assignedContactsInputFieldId")[1].setAttribute("oninput", "showContactListForEditTask(); searchContactsForEditTask()");
  document.getElementsByClassName("prioLowId")[1].setAttribute("onclick", "prioChooseForEditTask(0)");
  document.getElementsByClassName("prioMedId")[1].setAttribute("onclick", "prioChooseForEditTask(1)");
  document.getElementsByClassName("prioHighId")[1].setAttribute("onclick", "prioChooseForEditTask(2)");
}

/**
 * function the reset the colors of the priority containers when editting a task
 */
function resetPrioContainersForEditTask() {
  document.getElementsByClassName("prioHighId")[1].classList.remove("highPrioBackground");
  document.getElementsByClassName("highPrioImgId")[1].classList.remove("highPrioImageChange");
  document.getElementsByClassName("prioMedId")[1].classList.remove("medPrioBackground");
  document.getElementsByClassName("medPrioImgId")[1].classList.remove("medPrioImageChange");
  document.getElementsByClassName("prioLowId")[1].classList.remove("lowPrioBackground");
  document.getElementsByClassName("lowPrioImgId")[1].classList.remove("lowPrioImageChange");
}

/**
 * function the set the colors of the priority containers when editting a task
 */
function prioSelectForEditTask(prio) {
  if (prio === "Urgent") {
    document.getElementsByClassName("prioHighId")[1].classList.add("highPrioBackground");
    document.getElementsByClassName("highPrioImgId")[1].classList.add("highPrioImageChange");
    prioIndex = 2;
  } else if (prio === "Medium") {
    document.getElementsByClassName("prioMedId")[1].classList.add("medPrioBackground");
    document.getElementsByClassName("medPrioImgId")[1].classList.add("medPrioImageChange");
    prioIndex = 1;
  } else if (prio === "Low") {
    document.getElementsByClassName("prioLowId")[1].classList.add("lowPrioBackground");
    document.getElementsByClassName("lowPrioImgId")[1].classList.add("lowPrioImageChange");
    prioIndex = 0;
  }
}

/**
 * function to pre-fill the values of the displayed task when editting a task
 * @param {} id
 */
function fillEditTaskFormWithValues(id) {
  document.getElementsByClassName("titleId")[1].value = boardTasks[id].title;
  document.getElementsByClassName("descriptionId")[1].value = boardTasks[id].description;
  document.getElementsByClassName("dateId")[1].value = boardTasks[id].dueDate;
  document.getElementsByClassName("categoryId")[1].value = boardTasks[id].type;
  let prio = boardTasks[id].priority;
  prioSelectForEditTask(prio);
  selectedTaskContacts = boardTasks[id].assignedTo;
  if (selectedTaskContacts !== undefined) {
    showSelectedContactsForEditTask();
  }
  loadContactListForEditTask();
  let subtasks = [];
  let subtasksCheck = [];
  let subtaskList = boardTasks[id].subtasks;
  if (subtaskList !== undefined) {
    for (let index = 0; index < subtaskList.length; index++) {
      const element = subtaskList[index];
      subtasks.push(element.subtaskText);
      subtasksCheck.push(element.complete);
    }
  }
  let subtaskUL = document.getElementsByClassName("subtaskListId")[1];
  for (let index = 0; index < subtasks.length; index++) {
    const element = subtasks[index];
    const elementChecked = subtasksCheck[index];
    subtaskUL.innerHTML += `
      <li id="subtask${index}">
      <div class="listEntry">
        <span class="listEntrySpan" id="listEntry${index}">${element}</span><span class="listEntryCheckSpan" style="display:none;">${elementChecked}</span>
        <div>
          <img src="./assets/img/subtaskPen.svg" onclick="showEditSubtask(${index})">
          <img src="./assets/img/subtaskBasket.svg" onclick="deleteSubtaskinEditTask(${index})">
        </div>
      </div>
    </li>`;
  }
}

/**
 * function to show the modal for editing a task
 * @param {*} id
 */
function showEditTask(id) {
  document.getElementById("modalShowTask").classList.add("d-none");
  document.getElementById("modalEditTask").classList.remove("d-none");
  updateAddTaskFormToEditTask(id);
  document.getElementsByClassName("dateId")[1].min = new Date().toLocaleDateString("fr-ca");
  fillEditTaskFormWithValues(id);
  listenToEnterButtonAtSubtaskInputFieldEditTask();
}

/**
 * function to save/update an editted task
 * @param {*} id
 */
async function editTask(id) {
  boardTasks[id].title = document.getElementsByClassName("titleId")[1].value;
  boardTasks[id].description = document.getElementsByClassName("descriptionId")[1].value;
  boardTasks[id].dueDate = document.getElementsByClassName("dateId")[1].value;
  boardTasks[id].type = document.getElementsByClassName("categoryId")[1].value;
  boardTasks[id].priority = prios[prioIndex];
  boardTasks[id].assignedTo = selectedTaskContacts;
  boardTasks[id].subtasks = generateJSONFromSubtasks();
  await putData("boardtasks", boardTasks);
  removeboardBigContainer();
}

/**
 * function to select assigned contacts when editing a task
 * @param {*} i
 */
function selectContactsForEditTask(i) {
  let firstName = contacts[i].firstName;
  let lastName = contacts[i].lastName;
  if (selectedTaskContacts === undefined) {
    selectedTaskContacts = [];
  }
  let index = selectedTaskContacts.findIndex((obj) => obj.firstName == firstName && obj.lastName == lastName);
  if (index == -1) {
    selectedTaskContacts.push(contacts[i]);
  } else {
    selectedTaskContacts.splice(index, 1);
  }
  showSelectedContactsForEditTask();
}

/**
 * function to show the selected contacts when editing a task with a maximum of 4
 */
function showSelectedContactsForEditTask() {
  let sContacts = document.getElementsByClassName("selectedContactsId")[1];
  sContacts.innerHTML = "";
  if (selectedTaskContacts !== undefined) {
    let amount = selectedTaskContacts.length;
    let maxAmount = 4;
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
      sContacts.innerHTML += renderSelectedContactsMore(amount);
    }
  }
}

/**
 * function to load and display the contact list when editing a task
 */
function loadContactListForEditTask() {
  sortContacts();
  let contactWrapper = document.getElementsByClassName("contactListId")[1];
  contactWrapper.innerHTML = "";
  let idOfLoggedInUser = getIdOfLoggedInUser();
  if (idOfLoggedInUser !== undefined) {
    let checked = checkIfContactIsSelected(idOfLoggedInUser);
    contactWrapper.innerHTML += renderContactWrapperForEditTask(contacts[idOfLoggedInUser], idOfLoggedInUser, checked);
    document.getElementById("userNameInList").innerHTML += " (Me)";
  }
  for (let i = 0; i < contacts.length; i++) {
    if (i != idOfLoggedInUser) {
      const element = contacts[i];
      let checked = checkIfContactIsSelected(i);
      contactWrapper.innerHTML += renderContactWrapperForEditTask(element, i, checked);
    }
  }
}

/**
 * function to listen to the enter button when entering a subtask when editting a task
 */
function listenToEnterButtonAtSubtaskInputFieldEditTask() {
  let inputField = document.getElementsByClassName("subtaskInputId")[1];
  inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      let inputValue = inputField.value;
      if (inputValue) {
        document.getElementsByClassName("subtaskListId")[1].innerHTML += renderSubtaskListEntry(inputValue, subtaskCounter);
        inputField.value = "";
        subtaskCounter++;
      }
    }
  });
}

/**
 * function to collect the actually entered subtasks when editing a task
 * @returns subtasks array
 */
function generateJSONFromSubtasks() {
  let subtasks = [];
  let subtasksText = extractSubtasksForTask();
  let subtasksChecks = extractSubtasksCheckForTask();
  for (let index = 0; index < subtasksText.length; index++) {
    const subtask = subtasksText[index];
    const check = subtasksChecks[index];
    let json = {
      subtaskText: subtask,
      complete: check,
    };
    subtasks.push(json);
  }
  return subtasks;
}

/**
 * function to delete a subtask when editing a task
 * @param {} i
 */
function deleteSubtaskinEditTask(i) {
  let subtask = document.getElementById(`subtask${i}`);
  document.getElementsByClassName("subtaskListId")[1].removeChild(subtask);
}

/**
 * function to toggle the display of the contact list when editting a task
 */
function toggleContactListForEditTask() {
  document.getElementsByClassName("contactListId")[1].classList.toggle("dNone");
}

/**
 * function to display the contact list when editting a task
 */
function showContactListForEditTask() {
  document.getElementsByClassName("contactListId")[1].classList.remove("dNone");
}

/**
 * function to display the correct colors for the  priority when editting a task
 * @param {*} i
 */
function prioChooseForEditTask(i) {
  resetPrioContainersForEditTask();
  if (i === 2) {
    document.getElementsByClassName("prioHighId")[1].classList.add("highPrioBackground");
    document.getElementsByClassName("highPrioImgId")[1].classList.add("highPrioImageChange");
    prioIndex = 2;
  } else if (i === 1) {
    document.getElementsByClassName("prioMedId")[1].classList.add("medPrioBackground");
    document.getElementsByClassName("medPrioImgId")[1].classList.add("medPrioImageChange");
    prioIndex = 1;
  } else if (i === 0) {
    document.getElementsByClassName("prioLowId")[1].classList.add("lowPrioBackground");
    document.getElementsByClassName("lowPrioImgId")[1].classList.add("lowPrioImageChange");
    prioIndex = 0;
  }
}
