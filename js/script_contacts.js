const BASE_URL =
  "https://remotestorage-a7059-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

async function onLoadFunc() {
  contacts = await loadData("contacts");
  renderContacts();
}

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return (responseToJson = await response.json());
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/* Background-Colors for profiles */
let backgroundProfileColors = [
  "#FF7A00",
  "#FFC700",
  "#9327FF",
  "#6E52FF",
  "#FC71FF",
  "#1FD7C1",
];

/**
 * function to render the contacts
 */
function renderContacts() {
  sortContacts();

  let container = document.getElementById("contactContainer");
  let firstLetter = "";
  container.innerHTML = "";

  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];

    if (firstLetter != element.firstName[0]) {
      container.innerHTML += `
                              <div>${element.firstName[0]}</div>
                              <hr>
                              `;
      // updaten
      firstLetter = element.firstName[0];
    }

    container.innerHTML += `
    <div class="contactEntry" onclick="singleContactView(${index})">
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
}

/* https://www.geeksforgeeks.org/how-to-sort-json-object-arrays-based-on-a-key/ */
function sortContacts() {
  contacts.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
}

async function singleContactView(id) {
  document.getElementById("contactContainerOuter").style.display = "none";
  //await includeHTML();
  //renderSingleContact(id);
  document.getElementById("contactSingleView").innerHTML = `
  <div class="singleContactContainer">
  <div class="contactsHeadlineBox">
    <div class="contactsHeadline">
      <h2>Contacts</h2>
      <img onclick="backToContactList()" src="../assets/img/contacts/arrow-left-line.png" />
    </div>
    <h3>Better with a team</h3>
    <hr />
  </div>

  <div class="singleContact">
    <span style="background-color:${contacts[id].profileColor}" id="contactInitials" class="initials">${contacts[id].firstName[0]}${contacts[id].lastName[0]}</span>
    <span id="contactName">${contacts[id].firstName} ${contacts[id].lastName}</span>
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

  <a href="" class="moreButton"
    ><img src="../assets/img/contacts/more1.png"
  /></a>
</div>

  `;
}

function renderSingleContact(id) {
  document.getElementById(
    "contactName"
  ).innerHTML = `${contacts[id].firstName} ${contacts[id].lastName}`;

  document.getElementById(
    "contactInitials"
  ).innerHTML = `${contacts[id].firstName[0]}${contacts[id].lastName[0]}`;

  document.getElementById("contactEmail").innerHTML = contacts[id].email;
  document.getElementById("contactEmail").href = `mailto:${contacts[id].email}`;
  document.getElementById("contactPhoneNumber").innerHTML =
    contacts[id].phoneNumber;
  document.getElementById(
    "contactPhoneNumber"
  ).href = `tel:${contacts[id].phoneNumber}`;
}

function backToContactList() {
  document.getElementById("contactContainerOuter").style.display = "";
  document.getElementById("contactSingleView").innerHTML = "";
}

function addContact() {
  // overlay sichtbar machen (modal)
  // https://www.w3schools.com/howto/howto_css_modals.asp
  document.getElementById("myModal").style.display = "block";
}

function closeAddContact() {
  document.getElementById("myModal").style.display = "none";
}

async function createContact() {
  // daten auslesen

  // namen in zwei
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

  //put an die letzte stelle
  await putData(`contacts/${contacts.length}`, data);

  // neu laden und rendern
  onLoadFunc();

  // schließen
  closeAddContact();
}

async function putData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
