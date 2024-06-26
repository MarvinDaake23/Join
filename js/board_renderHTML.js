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

function renderBoardTaskContactsMore(amount) {
    return /*html */ `
            <div class="initials initSmall" style="background-color:red; margin-left: -10px;">
                <span>+${amount}</span>
            </div>
        `;
  }



function renderBoardBigContainer(i) {
  return /*html */ `
                <div id="showBigTask">
              <div class="boardBigContainerHeader">
                  <div class="boardBigContainerType ${boardTasks[i]["type"].split(" ").join("")}" id="boardBigContainerType">${boardTasks[i]["type"]}</div>
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
              <div class="boardBigContainerFooter">
                  <div onclick="deleteTask(${i})"><img src="./assets/img/delete.png">Delete</div>
                  <div class="seperator"></div>
                  <div onclick="showEditTask(${i})"><img src="./assets/img/edit.png">Edit</div>
                  <div>
              </div>
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


function renderBoardBigContainerContactsMore(amount) {
    return /*html */ `
            <div class="boardContacts">
                <div style="background-color:red" class="contactIcon initials initSmall">+${amount}</div>
            </div>
        `;
  }

function renderBoardBigContainerSubtasks(element, j, i, src) {
  return /* html*/ `
          <div class="subTaskRow">
              <img id="${i}checkBox${j}" class="checkBox" onclick="toggleCheckSubtask(${j}, ${i})" src="${src}" >
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
