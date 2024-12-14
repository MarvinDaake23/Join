function inputFocusInput() {
  return /*html */ `
      <div class="subtaskSettingContainer">
          <div onclick="inputClear()" class="imgContainerSubtaskCancle"></div>
          <div class="seperator"></div>
          <div onclick="loadSubtaskList()" class="imgContainerSubtaskSubmit"></div>
      </div>
      `;
}

function renderContactWrapper(element, i) {
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

function renderEditContactWrapper(element, i) {
  return /*html */ `
            <li>
                <label class="contactWrapperItem">
                    <input type="checkbox" onchange="editSelectContacts(${i})">
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

function renderBoardTask(element, index) {
  return /* html*/ `
        <div id="boardTask${index}" draggable="true" ondragstart="startDragging(${index})" class="boardCard" onclick="loadBoardBigContainer(${index})">
            <div id="" class="boardType ${element["type"].split(" ").join("")}">${element["type"]}</div>
            <div id="title" class="boardTitle">${element["title"]}</div>
            <div id="description" class="boardDescription">${element["description"]}</div>
            <div id="progressBar${index}" class="progress">
            
            </div>
            <div class="boardTaskFooter">
                <div class="boardTaskContacts" id="boardTaskContacts${index}"></div>
                <!-- <div id="boardTaskPrio${index}"></div> -->
                <div class="${element.priority}"></div>
            </div>
        </div>
    `;
}

function renderProgressbar(subEndCountLength, finished, width) {
  return /*html */ `
        <div class="progressBackground">
            <div style="width:${width}%" class="progressbar" role="progresbar"></div>
        </div>
        <div>${finished}/${subEndCountLength} Subtasks</div>
            `;
}

function renderBoardTaskContacts(element) {
  return /*html */ `
        <div class="initials initSmall" style="background-color:${element["profileColor"]}; margin-left: -10px;">
            <span>${element["firstName"][0]}${element["lastName"][0]}</span>
        </div>
    `;
}

function renderBoardBigContainer(i) {
  return /*html */ `
            <div class="boardBigContainerHeader">
                <div class="boardBigContainerType ${boardTasks[i]["type"].split(" ").join("")}" id="boardBigContainerType">${boardTasks[i]["type"]}</div>
                <img src="./assets/img/close.png" onclick="removeBoardBigContainer()"  class="boardBigContainerClose">
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
                <div onclick="deleteTask(${i})"><img src="./assets/img/delete.png"><div class="editText">Delete</div></div>
                <div class="seperator"></div>
                <div onclick="rendersubtask(${i})">
                <img src="./assets/img/edit.png"><div class="editText">Edit</div>
                <div>
            </div>
    `;
}

function renderBoardBigContainerContacts(element) {
  return /*html */ `
        <div class="boardContacts">
            <div style="background-color:${element["profileColor"]}" class="contactIcon initials initSmall">${element["firstName"][0]}${element["lastName"][0]}</div>
            <div class="contactName">${element["firstName"]} ${element["lastName"]}</div>
        </div>
    `;
}

function renderBoardBigContainerSubtasks(element, j, i, src) {
  return /* html*/ `
        <div class="subTaskRow">
            <img id="${i}checkBox${j}" class="checkBox" onclick="done(${j}, ${i})" src="${src}" >
            <div class="boardBigContainerSubtasksSingleInput">${element["subtaskText"]}</div>
        </div>
    `;
}

function renderBoardTaskPlaceholderTodo() {
  return /*html */ `
        <div id="todoPlaceholder" class="emptyPlaceholder">No Task To Do</div>
    `;
}

function renderBoardTaskPlaceholderProgress() {
  return /*html */ `
        <div id="progressPlaceholder" class="emptyPlaceholder">No Task in progress</div>
    `;
}

function renderBoardTaskPlaceholderFeedback() {
  return /*html */ `
        <div id="feedbackPlaceholder" class="emptyPlaceholder">No Task for Feedback</div>
    `;
}

function renderBoardTaskPlaceholderDone() {
  return /*html */ `
        <div id="donePlaceholder" class="emptyPlaceholder">No Task done</div>
    `;
}

function renderSelectedContacts(element) {
  return /*html */ `
        <div style="background-color:${element["profileColor"]}" class="initials initSmall">${element["firstName"][0]}${element["lastName"][0]}</div>
    `;
}

function rendersubtaskTemplate(title, description, dueDate, i) {
  return /*html */ `
    <form id="addTaskForm" onsubmit="editTask(${i}); return false;" class="editConatinerBackground">
    <div class="editContainer">
        <div class="textEditConatiner">Title</div>
            <input id="edittitle${i}" class="requiredInput" type="text" value="${title}">
        <div class="textEditConatiner">Description</div>
            <textarea id="editdescription${i}" class="textareaDescription" type="text" >${description}</textarea>
        <div class="textEditConatiner">Due Date</div>
            <input id="editdate${i}" class="requiredInput" id="date" required type="date" value="${dueDate}" min="2024-06-05">
        <div class="textEditConatiner">Priority</div>
            <div class="row">
            <div class="prioChoose">
                <div onclick="editPrioChoose(2)" id="edit prio high" class="prio high prioContainerBorder">
                <span>Urgent</span>
                <div id="editHighPrioImg" class="editHighPrioImg"></div>
                </div>
                <div onclick="editPrioChoose(1)" id="edit prio med" class="prio med prioContainerBorder">
                <span>Medium</span>
                <div id="editMedPrioImg" class="editMedPrioImg"></div>
                </div>
                <div onclick="editPrioChoose(0)" id="edit prio low" class="prio low prioContainerBorder">
                <span>Low</span>
                <div id="editLowPrioImg" class="editLowPrioImg"></div>
                </div>
            </div>
            </div>
        <div class="textEditConatiner">Assigned to</div>
            <div id="wrapperAtEdit" class="wrapper" onclick="openWrapper('At' , 'Edit')">
                <span>Select contacts to assign</span>
                <img id="arrowDownAtEdit" src="./assets/img/arrow_down.png" alt class>
                <img id="arrowUpAtEdit" class="dNone" src="./assets/img/arrow_up.png" alt>
            </div>
            <ul id="wrapperListAtEdit" class="wrapperList dNone"></ul>

            <div id="selectedContactsEdit" class="editselectedContacts"></div>
        
        <div class="textEditConatiner">Subtask</div>
            <div class="sutaskTitleInputContainer">
                <input id="editsubtaskInput" type="text" onclick="editInputFocus()" placeholder="Add new subtask">

                <img id="editAddTaskinEditTask" class="editAddTaskinEditTask" onclick="editInputFocus()" src="../assets/img/add.png">

                <div id="editImgContainerSubtask" class="imgContainersubtask dNone">
                    <img onclick="editInputBlur()" src="../assets/img/close.png">
                    <div class="editseperator"></div>
                    <img onclick="editloadSubtaskList(${i})" src="../assets/img/check.png">
                </div>
            </div>
            <ul class="subTaskContainer" id="editsubTasks"></ul>
        </div> 
    </div>
        <button type="submit" class="okButton"></button>
    <form>
    `;
}
