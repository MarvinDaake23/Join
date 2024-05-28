let categorys = ["Technical Task", "User Story"];
let prios = ["Low", "Medium", "Urgent"];
let subtasks = [];
let task = [];
let prioValue;
let cat;

/**
 *  function to load the contact wrapper with all saved categorys
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
    console.log(element);
    contactWrapper.innerHTML += renderContactWrapper(element,i);
  }
}

function selectContacts(i) {
  console.log(i);
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
  console.log(subtasks);
}

/**
 * function to open all Wrapper on "AddTask" side
 */
function openWrapper(i) {
  if (document.getElementById(`wrapperList${i}`).classList.contains(`dNone`)) {
    document.getElementById(`wrapperList${i}`).classList.remove(`dNone`);
    document.getElementById(`arrowUp${i}`).classList.remove(`dNone`);
    document.getElementById(`arrowDown${i}`).classList.add(`dNone`);
    document.getElementById(`wrapper${i}`).classList.add(`openBorader`);
  } else {
    document.getElementById(`wrapperList${i}`).classList.add(`dNone`);
    document.getElementById(`arrowUp${i}`).classList.add(`dNone`);
    document.getElementById(`arrowDown${i}`).classList.remove(`dNone`);
    document.getElementById(`wrapper${i}`).classList.remove(`openBorader`);
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
 * function to select the priority
 */
function prioChoose(i) {
  prioValue = i;
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
          type: 'User Story',
          title: title,
          description: desription,
          subtasks: subtasks,
          finishedSubtasks: [],
          assignedTo: [
              {
                  firstName: 'Anton',
                  lastName: 'Mayer',
                  profilColor: '#FF7A00',
              },
              {
                  firstName: 'Benedikt',
                  lastName: 'Ziegler',
                  profilColor: '#9327FF',
              },
          ],
          category: category,
          priority: prio,
          dueDate: date,
        })
        });
    
    task.push(temTask);
  }
  task.push(temTask);
}
