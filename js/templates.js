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
                        <span id="userNameInList">${element.firstName} ${element.lastName}</span>
                        <div class="initials initSmall" style="background-color:${element.profileColor}">
                            ${element.firstName[0]}${element.lastName[0]}
                        </div>
                    </div>
                </label>
            </li>
    `;
}


function rendersubtaskTemplate(title, description, dueDate, i) {
  return /*html */ `
    <form onsubmit="editTask(${i}); return false;" class="editConatinerBackground">
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
                <div onclick="prioChoose(2)" id="prio high" class="prio high prioContainerBorder">
                <span>Urgent</span>
                <div id="highPrioImg" class="highPrioImg"></div>
                </div>
                <div onclick="prioChoose(1)" id="prio med" class="prio med prioContainerBorder">
                <span>Medium</span>
                <div id="medPrioImg" class="medPrioImg"></div>
                </div>
                <div onclick="prioChoose(0)" id="prio low" class="prio low prioContainerBorder">
                <span>Low</span>
                <div id="lowPrioImg" class="lowPrioImg"></div>
                </div>
            </div>
            </div>

        <div class="textEditConatiner">Assigned to</div>
            <div id="editwrapperAt" class="wrapper" onclick="editopenWrapper('At')">
                <span>Select contacts to assign</span>
                <img id="editarrowDownAt" src="./assets/img/arrow_down.png" alt class>
                <img id="editarrowUpAt" class="d-none" src="./assets/img/arrow_up.png" alt>
            </div>
            <ul id="editwrapperListAt" class="wrapperList d-none"></ul>
            <div id="editselectedContacts"></div>
            
        <div class="textEditConatiner">Subtask</div>
            <div class="sutaskTitleInputContainer">
                <input id="editsubtaskInput" type="text" onclick="editInputFocus()" placeholder="Add new subtask">

                <img id="editaddTaskinEditTask" class="editaddTaskinEditTask" onclick="editInputFocus()" src="../assets/img/add.png">

                <div id="editimgContainerSubtask" class="imgContainersubtask d-none">
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
