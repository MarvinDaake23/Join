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

function subtaskListInput(i) {
    return /* html*/ `
          <li class="liCat">
              <div id="subtask" class="subtask">
                  <div id="subtaskField">${i}</div>
                  <div class="editContainerSubtask">
                    <div onclick="editSubtaskList(i)" class="edit iconContainerSubtask"></div>
                    <div class="smallLine iconContainerSubtask"></div>
                    <div class="trash iconContainerSubtask"></div>
                  </div>
              <div>
          </li>
      `;
}

function renderBoardTask(element, i) {
    return /* html*/ `
        <div draggable="true" ondragstart="startDragging(${element[`id`]})" class="boardCard" onclick="loadBoardBigContainer(${i})">
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

function renderBoardBigContainerSubtasks(element, j) {
    return /* html*/ `
        <div class="SubtaskRow">
            <img id="checkBox${j}" class="checkBox" onclick="done(${j})" src="../assets/img/Property 1=Default.png" >
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

function renderSelectedContacs(element, i) {
    return /*html */ `
             <div style="background-color:${element["profileColor"]}" class="initials initSmall">${element["firstName"][0]}${element["lastName"][0]}</div>
    `;
}

// CONTACTS PAGE
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
  
                <div class="singleContact">
                    <span style="background-color:${contacts[id].profileColor}" id="contactInitials" class="initials">${contacts[id].firstName[0]}${contacts[id].lastName[0]}</span>
                    <div>
                        <span id="contactName">${contacts[id].firstName} ${contacts[id].lastName}</span>
                        <div class="editdelete">
                            <a onclick="showEditContact(${id})"><img src="./assets/img/edit.svg">Edit</a>
                            <a onclick="deleteContact(${id})"><img src="./assets/img/delete1.png">Delete</a>
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
    
                <img onclick="showMore()" id="moreButton" src="./assets/img/more1.png"/>
    
                <div id="moreButtonPopup">
                    <a onclick="showEditContact(${id})"><img src="./assets/img/edit1.png" />Edit</a>
                    <a onclick="deleteContact(${id})"><img src="./assets/img/delete1.png" />Delete</a>
                </div>
    
            </div>
    `;
}

function renderSingleContactMobileHTML(id) {
  return `
              <div class="singleContactContainerMobile">
      
          
                  <div class="contactsHeadlineBox">
                      <div class="contactsHeadline">
                          <h2>Contacts</h2>
                          <a><img onclick="backToContactList()" src="./assets/img/arrow-left-line.png" /></a>
                      </div>
                      <h3>Better with a team</h3>
                      <hr />
                  </div>
            
                  <div class="singleContact">
                      <span style="background-color:${contacts[id].profileColor}" id="contactInitials" class="initials">${contacts[id].firstName[0]}${contacts[id].lastName[0]}</span>
                      <div>
                          <span id="contactName">${contacts[id].firstName} ${contacts[id].lastName}</span>
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
      
                  <img onclick="showMore()" id="moreButton" src="./assets/img/more1.png"/>
      
                  <div id="moreButtonPopup">
                      <a onclick="showEditContact(${id})"><img src="./assets/img/edit1.png" />Edit</a>
                      <a onclick="deleteContact(${id})"><img src="./assets/img/delete1.png" />Delete</a>
                  </div>
      
              </div>   
    `;
}
