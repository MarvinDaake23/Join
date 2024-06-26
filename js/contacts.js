let contacts = [];

async function onLoadFunc() {
  await includeHTML();
  updateHeaderInitials();
  contacts = await loadData("contacts");
  renderContacts();
}

/**
 * function to render the contacts into the contact container including seperators
 */
function renderContacts() {
  sortContacts();
  let container = document.getElementById("contactContainer");
  let firstLetter = "";

  container.innerHTML = "";

  // Button
  container.innerHTML += `
  <button onclick="showAddContact()" id="addContactButton">Add new contact <img src="./assets/img/person_add.svg"></button>`;

  // first shown contact: logged in user
  let idOfLoggedInUser = getIdOfLoggedInUser();

  // nur wenns kein Gast ist
  if (idOfLoggedInUser !== undefined) {
    container.innerHTML += renderSingleContactEntryHTML(contacts[idOfLoggedInUser], idOfLoggedInUser);
    // add: ME
    document.getElementById("userNameInList").innerHTML += " (Me)";
  }

  for (let index = 0; index < contacts.length; index++) {
    // not render logged in user again
    if (index != idOfLoggedInUser) {
      const element = contacts[index];
      if (firstLetter != element.firstName[0]) {
        container.innerHTML += renderContactSeperatorHTML(element);
        // update first letter
        firstLetter = element.firstName[0];
      }
      container.innerHTML += renderSingleContactEntryHTML(element, index);
    }
  }
}

/**
 * function to sort the contacts alphabetically by first name
 */
function sortContacts() {
  contacts.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
}

/**
 * function to show the contact information of a single contact
 */
function singleContactView(id) {
  //x-scrollbar kurz hiden
  document.getElementById("body").style.overflowX = "hidden";

  // falls mobil
  if (window.innerWidth <= vwBreak) {
    document.getElementById("contactContainerOuter").style.display = "none";
    document.getElementById("contactSingleViewMobile").innerHTML = renderSingleContactMobileHTML(id);
    // buttons "tauschen"
    document.getElementById("addContactButtonMobile").style.display = "none";
  }

  document.getElementById("contactSingleView").innerHTML = renderSingleContactHTML(id);

  //x-scrollbar nach gewisser Zeit wieder aktivieren
  sleep(500).then(() => {
    document.getElementById("body").style.overflowX = "scroll";
  });
}

function backToContactList() {
  document.getElementById("contactContainerOuter").style.display = "";
  document.getElementById("contactSingleViewMobile").innerHTML = "";
  renderContacts();
  document.getElementById("addContactButtonMobile").style.display = "flex";
}

/* MODAL STUFF */
function showAddContact() {
  document.getElementById("modalBackground").style.display = "flex";
  updateModalTemplateToAdd();
  document.getElementById("addOrEditForm").reset();
  document.getElementById("modalBackground").setAttribute("onclick", "closeAddOrEditContact()");
  document.getElementById("modalAddOrEditContact").setAttribute("onclick", "event.stopPropagation();");
}

function showEditContact(id) {
  document.getElementById("modalBackground").style.display = "flex";
  document.getElementById("modalBackground").setAttribute("onclick", "closeAddOrEditContact()");
  document.getElementById("modalAddOrEditContact").setAttribute("onclick", "event.stopPropagation();");
  updateModalTemplateToEdit(id);
  renderValuesToEditContactFormular(id);
}

function closeAddOrEditContact() {
  document.getElementById("modalBackground").style.display = "none";
}

function updateModalTemplateToEdit(id) {
  document.getElementById("addContactHeadline").innerHTML = "Edit contact";
  document.getElementById("addContactSubheadline").innerHTML = "";
  //document.getElementById("cancelButton").innerHTML = "Delete";
  document.getElementById("rightButton").innerHTML = `Save<img src="assets/img/check.svg">`;
  // Form und linker Button
  document.getElementById("addOrEditForm").setAttribute("onsubmit", `editContact(${id});closeAddOrEditContact();return false;`);
  document.getElementById("cancelButton").setAttribute("onclick", `deleteContact(${id});closeAddOrEditContact();return false;`);
  document.getElementById("newContactPic").style.display = "none";
  document.getElementById("cancelButton").style.display = "none";
  document.getElementById("editInitials").style.display = "flex";
}

function updateModalTemplateToAdd() {
  document.getElementById("addContactHeadline").innerHTML = "Add contact";
  document.getElementById("addContactSubheadline").innerHTML = "Tasks are better in a team!";
  document.getElementById("cancelButton").innerHTML = `Cancel<img src="assets/img/cancel.svg" />`;
  document.getElementById("rightButton").innerHTML = `Create contact<img src="assets/img/check.svg">`;
  // Form und linker Button
  document.getElementById("addOrEditForm").setAttribute("onsubmit", `createContact();return false;`);
  document.getElementById("cancelButton").setAttribute("onclick", "closeAddOrEditContact()");
  document.getElementById("newContactPic").style.display = "flex";
  document.getElementById("editInitials").style.display = "none";
  document.getElementById("deleteButton").style.display = "none";
}

/**
 * function collects data from input fields for a new contact
 */
function getDataForNewContact() {
  let nameInput = document.getElementById("nameInput").value;
  const nameArray = nameInput.split(" ");
  let new_firstName = nameArray[0];
  let new_lastName = nameArray[1];
  let new_email = document.getElementById("emailInput").value;
  let new_phone = document.getElementById("phoneInput").value;

  // Create JSON
  let data = {
    firstName: new_firstName,
    lastName: new_lastName,
    email: new_email,
    phoneNumber: new_phone,
    profileColor: getRandomBackgroundColor(),
  };
  return data;
}

function resetAddContactForm() {
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("phoneInput").value = "";
}

/**
 * function creates a new contact in the database
 */
async function createContact() {
  data = getDataForNewContact();
  await putData(`contacts/${contacts.length}`, data);
  resetAddContactForm();
  // neu laden und rendern
  onLoadFunc();

  // schließen
  closeAddOrEditContact();
}

/**
 * function deletes a contact and updates the remote database
 */
async function deleteContact(id) {
  contacts.splice(id, 1);
  // neu hochladen
  await putData("contacts", contacts);
  closeAddOrEditContact();
  backToContactList();
  renderContacts();
  document.getElementById("contactSingleView").innerHTML = "";
}

function showMore() {
  document.getElementById("moreButtonPopup").style.display = "flex";

  // give possibility to close
  document.getElementById("body").setAttribute("onclick", "closeMore()");
}

function closeMore() {
  document.getElementById("moreButtonPopup").style.display = "none";
}

function renderValuesToEditContactFormular(id) {
  document.getElementById("nameInput").value = `${contacts[id].firstName} ${contacts[id].lastName}`;
  document.getElementById("emailInput").value = contacts[id].email;
  document.getElementById("phoneInput").value = contacts[id].phoneNumber;

  document.getElementById("editInitials").innerHTML = `${contacts[id].firstName[0]}${contacts[id].lastName[0]} `;
  document.getElementById("editInitials").style.backgroundColor = contacts[id].profileColor;
}

async function editContact(id) {
  //update array and put to db
  let nameInput = document.getElementById("nameInput").value;
  const nameArray = nameInput.split(" ");
  contacts[id].firstName = nameArray[0];
  contacts[id].lastName = nameArray[1];
  contacts[id].email = document.getElementById("emailInput").value;
  contacts[id].phoneNumber = document.getElementById("phoneInput").value;

  await putData("contacts", contacts);

  closeAddOrEditContact();
  // liste neu rendern
  renderContacts();
  // einzelansicht wieder
  document.getElementById("contactSingleView").innerHTML = renderSingleContactHTML(id);
}

async function editContactDesktop(id) {
  //update array and put to db
  let nameInput = document.getElementById("editNameInputDesktop").value;
  const nameArray = nameInput.split(" ");
  contacts[id].firstName = nameArray[0];
  contacts[id].lastName = nameArray[1];
  contacts[id].email = document.getElementById("editEmailInputDesktop").value;
  contacts[id].phoneNumber = document.getElementById("editPhoneInputDesktop").value;

  await putData("contacts", contacts);

  closeEditContact();

  //document.getElementById("contactSingleView").innerHTML = renderSingleContactHTML(id);
}

let currentId;
function setActive(newId) {
  // muss nur in der Desktopansicht gemacht werden
  if (window.innerWidth > vwBreak) {
    // beim neuen setzen
    document.getElementById(`singleContactEntry${newId}`).classList.add("active");
    document.getElementById(`singleContactEntry${newId}`).classList.remove("hover");
    // onclick deaktivieren
    document.getElementById(`singleContactEntry${newId}`).setAttribute("onclick", ``);
    // cursor ändern
    document.getElementById(`singleContactEntry${newId}`).style.cursor = "default";

    // beim alten alles wieder rückgängig machen
    if (!isNaN(currentId)) {
      document.getElementById(`singleContactEntry${currentId}`).classList.remove("active");
      document.getElementById(`singleContactEntry${currentId}`).classList.add("hover");
      // onclick aktivieren
      document.getElementById(`singleContactEntry${currentId}`).setAttribute("onclick", `setActive(${currentId});singleContactView(${currentId})`);
      // cursor ändern
      document.getElementById(`singleContactEntry${currentId}`).style.cursor = "pointer";
    }
    // speichern
    currentId = newId;
  }
}

function getIdOfLoggedInUser() {
  let user = getLoggedInUserName();
  //split name
  let nameArray = user.split(" ");
  for (x in contacts) {
    if (contacts[x].firstName == nameArray[0] && contacts[x].lastName == nameArray[1]) {
      return x;
    }
  }
}
