const BASE_URL =
  "https://remotestorage-a7059-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

/* Background colors for profile initials */
let backgroundProfileColors = [
  "#FF7A00", // Anton
  "#FFC700", // TW edit
  "#9327FF", // Anja
  "#6E52FF", // Benedikt
  "#FC71FF", // David
  "#FFBB2B", // Eva F.
  "#1FD7C1", // Emmanuel M
  "#FF4646", // Tatjana Wolf
  "#462F8A", // Marcel Bauer
];

async function onLoadFunc() {
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

  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];
    if (firstLetter != element.firstName[0]) {
      container.innerHTML += renderContactSeperatorHTML(element);
      // update first letter
      firstLetter = element.firstName[0];
    }
    container.innerHTML += renderSingleContactEntryHTML(element, index);
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
  document.getElementById("contactContainerOuter").style.display = "none";

  document.getElementById("contactSingleView").innerHTML =
    renderSingleContactHTML(id);
}

function backToContactList() {
  document.getElementById("contactContainerOuter").style.display = "";
  document.getElementById("contactSingleView").innerHTML = "";
}

function showAddContact() {
  document.getElementById("modalBackground").style.display = "block";
  document.getElementById("modalAddContact").style.display = "block";
}

function closeAddContact() {
  document.getElementById("modalBackground").style.display = "none";
  document.getElementById("modalAddContact").style.display = "none";
}

function closeEditContact() {
  document.getElementById("modalBackground").style.display = "none";
  document.getElementById("modalEditContact").style.display = "none";
  document.getElementById("moreButton").style.display = "none";
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
  // random color from list
  let new_profileColor =
    backgroundProfileColors[
      Math.floor(Math.random() * backgroundProfileColors.length)
    ];
  // Create JSON
  let data = {
    firstName: new_firstName,
    lastName: new_lastName,
    email: new_email,
    phoneNumber: new_phone,
    profileColor: new_profileColor,
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
  closeAddContact();
}

/**
 * function deletes a contact and updates the remote database
 */
async function deleteContact(id) {
  contacts.splice(id, 1);
  // neu hochladen
  await putData("contacts", contacts);
  backToContactList();
  renderContacts();
}

function showMore() {
  document.getElementById("moreButton").style.display = "flex";
}

function showEditContact(id) {
  document.getElementById("modalBackground").style.display = "block";
  document.getElementById("modalEditContact").style.display = "block";
  document.getElementById(
    "editNameInput"
  ).value = `${contacts[id].firstName} ${contacts[id].lastName}`;
  document.getElementById("editEmailInput").value = contacts[id].email;
  document.getElementById("editPhoneInput").value = contacts[id].phoneNumber;
  document.getElementById(
    "editInitials"
  ).innerHTML = `${contacts[id].firstName[0]}${contacts[id].lastName[0]} `;
  document.getElementById("editInitials").style.backgroundColor =
    contacts[id].profileColor;
}
