let categorys = ["Technical Task", "User Story"];
let prios = ["Low", "Medium", "Urgent"];
let subtasks = [];
let task = [];
let prioValue;
let cat;



function prioChoose(i) {
    prioValue = i;
  }
  
function chooseCategory(i) {
    let placeholder = document.getElementById("placeholder");
    let choose = document.getElementById(`category${i}`).innerHTML;
    placeholder.innerHTML = choose;
    cat = i;
  }
  
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

function loadContactWrapper(){
    let contactWrapper = document.getElementById('wrapperListAt');

    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        console.log(element);
        contactWrapper.innerHTML += renderContactWrapper(element);
        
    }
}
  
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
  
function inputSelector() {
    let subtaskInput = document.getElementById("subtaskInput");
    subtaskInput.addEventListener("focus", function () {
      inputFocus();
    });
  }
  
function inputFocus() {
    let imgContainer = document.getElementById("imgContainerSubtask");
    imgContainer.classList.remove("imgContainerBackground");
    imgContainer.innerHTML = inputFocusInput();
  }
  
function inputBlur() {
    let imgContainer = document.getElementById("imgContainerSubtask");
    imgContainer.classList.add("imgContainerBackground");
    imgContainer.innerHTML = ``;
  }
  
function inputClear() {
    let subtaskInput = document.getElementById("subtaskInput");
    subtaskInput.value = ``;
    inputBlur();
  }
  

  
function addTask() {
    let title = document.getElementById("title").value;
    let desription = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let prio = prios[prioValue];
    let category = categorys[cat];
    addTaskIntoArray(title,desription,date,prio,category);
    // addToBoard();
    
  }

  function addTaskIntoArray(title,desription,date,prio,category){
    let temTask = {
      titel: title,
      desription: desription,
      assignedTo: "",
      dueDate: date,
      prio: prio,
      category: category,
      subtask: subtasks,
    };
    task.push(temTask);
  }

