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
  
              <img onclick="showMore()" id="moreButton" src="../assets/img/contacts/more1.png"/>
  
              <div id="moreButtonPopup">
                  <a onclick="showEditContact(${id})"><img src="../assets/img/contacts/edit1.png" />Edit</a>
                  <a onclick="deleteContact(${id})"><img src="../assets/img/contacts/delete1.png" />Delete</a>
              </div>
  
          </div>
  `;
}
