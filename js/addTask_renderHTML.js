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

function renderContactWrapperForEditTask(element, i) {
    return /*html */ `
                <li>
                    <label class="contactWrapperItem">
                        <input type="checkbox" onchange="selectContactsForEditTask(${i})">
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

function renderSelectedContacts(element, i) {
  return /*html */ `
            <div style="background-color:${element["profileColor"]}" class="initials initSmall">${element["firstName"][0]}${element["lastName"][0]}</div>
        `;
}
