function inputFocusInput() {
  return /*html */ `
      <div class="subtaskSettingContainer">
          <div onclick="inputClear()" class="imgContainerSubtaskCancle"></div>
          <div class="seperator"></div>
          <div onclick="loadSubtaskList()" class="imgContainerSubtaskSubmit"></div>
      </div>
      `;
}

function renderContactWrapper(element,i) {
  return /*html */ `
            <li>
                <label class="contactWrapperItem">
                    <input type="checkbox" onchange="selectContacts(${i})">
                    <div class="contactNameContainer">
                        <span>${element.firstName} ${element.lastName}</span>
                        <div class="initials initSmall" style="background-color:${element.profileColor}">
                            ${element.firstName[0]}${element.lastName[0]}
                        </div>
                    </div>
                </label>
            </li>
    `;
}

function subtaskListInput(subtask) {
  return /* html*/ `
          <li class="liCat">
              <div id="subtask">
                  <div>${subtask}</div>
              <div>
          </li>
      `;
}

function renderBoardTask(element, i) {
  return /* html*/ `
        <div draggable="true" ondragstart="startDragging(${element["id"]})" class="boardCard" onclick="loadBoardBigContainer(${i})">
            <div id="" class="boardType">${element["type"]}</div>
            <div class="boardTitle">${element["title"]}</div>
            <div class="boardDescription">${element["description"]}</div>
            <div class="progress">
                <div id="progressBackground" class="progressBackground">
                    <div id="progressbar${i}" class="progressbar" role="progresbar"></div>
                </div>
                <div>Subtasks</div>
            </div>
            <div class="boardTaskFooter">
                <div class="boardTaskContacts" id="boardTaskContacts"></div>
                <div id="boardTaskPrio"></div>
            </div>
        </div>
    `;
}

function renderBoardTaskContacts(element) {
  return /*html */ `
        <div class="initials initSmall " style="background-color:${element["profilColor"]}">
            <span>${element["firstName"][0]}${element["lastName"][0]}</span>
        </div>
    `;
}

function renderBoardBigContainer(i) {
  return /*html */ `
            <div class="boardBigContainerHeader">
                <div class="boardBigContainerType" id="boardBigContainerType">${boardTasks[i]["type"]}</div>
                <img src="./assets/img/close.png" onclick="removeboardBigContainer()"  class="boardBigContainerClose">
            </div>
            <div class="boardBigContainerTitle" id="boardBigContainerTitle">${boardTasks[i]["title"]}</div>
            <div class="boardBigContainerDescription" id="boardBigContainerDescription">${boardTasks[i]["description"]}</div>
            <div class="boardContainerStatus">
                <div class="boardBigContainerdate">
                    <span>Due date:</span>
                    <div class="boardBigContainerDateInput" id="boardBigContainerDateInput">${boardTasks[i]["dueDate"]}</div>
                </div>
                <div class="boardBigContainerPrio">
                    <span>Priority:</span>
                    <div>
                        <div class="boardBigContainerPrioInput" id="boardBigContainerPrioInput">${boardTasks[i]["priority"]}</div>
                        <div class="boardBigContainerPrioInputImg"></div>
                    </div>
            </div>
            </div>
            <div class="boardBigContainerAssignedTo">
                <span>Assigned To:</span>
                <div id="boardBigContainerAssignedToContactsInput">
            </div>
            </div>
            <div class="subtaskSection">
                <span>Subtasks</span>
                <div class="boardBigContainerSubtasks" id="boardBigContainerSubtasks">
            </div>
            </div>
            <div class="editConatiner">
                <img src="./assets/img/delete.png"><div class="editText">Delete</div>
                <div class="seperator"></div>
                <img src="./assets/img/edit.png"><div class="editText">Edit</div>
            </div>
    `;
}

function renderBoardBigContainerContacts(element) {
  return /*html */ `
        <div class="boardContacts">
            <div style="background-color:${element["profilColor"]}" class="contactIcon initials initSmall">${element["firstName"][0]} ${element["lastName"][0]}</div>
            <div class="contactName">${element["firstName"]} ${element["lastName"]}</div>
        </div>
    `;
}

function renderBoardBigContainerSubtasks(element,j) {
  return /* html*/ `
        <div class="SubtaskRow">
            <img id="checkBox${j}" class="checkBox" onclick="done(${j},${element})" src="../assets/img/Property 1=Default.png" >
            <div class="boardBigContainerSubtasksSingleInput">${element["subtaskText"]}</div>
        </div>
    `;
}

function renderBoardTaskPlaceholderTodo() {
  return /*html */ `
        <div class="emptyPlaceholder">No Task To Do</div>
    `;
}

function renderBoardTaskPlaceholderProgress() {
  return /*html */ `
        <div class="emptyPlaceholder">No Task in progress</div>
    `;
}

function renderBoardTaskPlaceholderFeedback() {
  return /*html */ `
        <div class="emptyPlaceholder">No Task for Feedback</div>
    `;
}

function renderBoardTaskPlaceholderDone() {
  return /*html */ `
        <div class="emptyPlaceholder">No Task done</div>
    `;
}
