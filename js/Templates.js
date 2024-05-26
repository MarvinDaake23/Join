function renderSingleContactEntryHTML(element, index) {
  return `
        <div id="singleContactEntry${index}" class="hover contactEntry" onclick="setActive(${index});singleContactView(${index})">
          <div class="innerContactEntry">
              <div class="initials initSmall" style="background-color:${element.profileColor}">
                  ${element.firstName[0]}${element.lastName[0]}
              </div>
              <div class="nameAndAdress">
                  <span>${element.firstName} ${element.lastName}</span>
                  <a href="mailto:${element.email}" class="emailAdress">${element.email}</a>
              </div>
          </div>
      </div>
      `;
}

function renderContactSeperatorHTML(element) {
  return `
            <div class="seperatorLetter">${element.firstName[0]}</div>
            <!-- <hr> -->
            `;
}

function renderSingleContactHTML(id) {
  return `
        <div class="singleContactContainer">

        <!--
            <div class="contactsHeadlineBox">
                <div class="contactsHeadline">
                    <h2>Contacts</h2>
                    <a><img onclick="backToContactList()" src="../assets/img/contacts/arrow-left-line.png" /></a>
                </div>
                <h3>Better with a team</h3>
                <hr />
            </div>
        -->

            <div class="singleContact">
                <span style="background-color:${contacts[id].profileColor}" id="contactInitials" class="initials">${contacts[id].firstName[0]}${contacts[id].lastName[0]}</span>
                <div>
                    <span id="contactName">${contacts[id].firstName} ${contacts[id].lastName}</span>
                    <div class="editdelete">
                        <a onclick="showEditContact(${id})"><img src="./assets/img/contacts/edit.svg">Edit</a>
                        <a onclick="deleteContact(${id})"><img src="./assets/img/contacts/delete1.png">Delete</a>
                    </div>
                </div>
            </div>                

            <div class="contactInfos">
                <h3>Contact information</h3>
                <div class="infoItem">
                    <h4>Email</h4>
                    <a id="contactEmail" class="emailAdress" href="mailto:${contacts[id].email}">${contacts[id].email}</a>
                </div>
                <div class="infoItem">
                    <h4>Phone</h4>
                    <a id="contactPhoneNumber" class="phoneNumber" href="tel:${contacts[id].phoneNumber}">${contacts[id].phoneNumber}</a>
                </div>
            </div>

            <img onclick="showMore()" class="moreButton" src="../assets/img/contacts/more1.png"/>

            <div id="moreButton">
                <a onclick="showEditContact(${id})"><img src="../assets/img/contacts/edit1.png" />Edit</a>
                <a onclick="deleteContact(${id})"><img src="../assets/img/contacts/delete1.png" />Delete</a>
            </div>

        </div>
`;
}

function inputFocusInput() {
  return /*html */ `
      <div class="subtaskSettingContainer">
          <div onclick="inputClear()" class="imgContainerSubtaskCancle"></div>
          <div class="seperator"></div>
          <div onclick="loadSubtaskList()" class="imgContainerSubtaskSubmit"></div>
      </div>
      `;
}

function renderContactWrapper(element) {
  return /*html */ `
            <li>
                <label class="contactWrapperItem">
                    <input type="checkbox">
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
                <div class="progressBackground">
                    <div class="progressbar" role="progresbar"></div>
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
                <div class="boardBigContainerClose">X</div>
            </div>
            <div class="boardBigContainerTitle" id="boardBigContainerTitle">${boardTasks[i]["title"]}</div>
            <div class="boardBigContainerDescription" id="boardBigContainerDescription">${boardTasks[i]["description"]}</div>
            <ul>
                <li class="boardBigContainerdate">
                    <span>Due date:</span>
                    <div class="boardBigContainerDateInput" id="boardBigContainerDateInput">${boardTasks[i]["dueDate"]}</div>
                </li>
                <li class="boardBigContainerPrio">
                    <span>Priority:</span>
                    <div>
                        <div class="boardBigContainerPrioInput" id="boardBigContainerPrioInput">${boardTasks[i]["priority"]}</div>
                        <div class="boardBigContainerPrioInputImg"></div>
                    </div>
                </li>
            </ul>
            <div class="boardBigContainerAssignedTo">
                <span>Assigned To</span>
                <ul id="boardBigContainerAssignedToContactsInput">
                </ul>
            </div>
            <div>
                <span>Subtasks</span>
                <ul class="boardBigContainerSubtasks" id="boardBigContainerSubtasks">
                </ul>
            </div>
    `;
}

function renderBoardBigContainerContacts(element) {
  return /*html */ `
        <li>
            <div style="background-color:${element["profilColor"]}" class="contactIcon initials initSmall">${element["firstName"][0]} ${element["lastName"][0]}</div>
            <div class="contactName">${element["firstName"]} ${element["lastName"]}</div>
        </li>
    `;
}

function renderBoardBigContainerSubtasks(element) {
  return /* html*/ `
        <li>
            <div class="checkboxImg"></div>
            <div class="boardBigContainerSubtasksSingleInput">${element["subtaskText"]}</div>
        </li>
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
