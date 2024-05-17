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

let contacts = [
  {
    firstName: "Anton",
    lastName: "Mayer",
    email: "antom@gmail.com",
    phoneNumber: "235325325",
  },
  {
    firstName: "Anja",
    lastName: "Schulz",
    email: "anjaschulz@gmail.com",
    phoneNumber: "235325325",
  },
  {
    firstName: "Benedikt",
    lastName: "Ziegler",
    email: "ziegler@gmx.com",
    phoneNumber: "235325325",
  },
  {
    firstName: "David",
    lastName: "Eisenberg",
    email: "eisenberg@googlemail.com",
    phoneNumber: "235325325",
  },
  {
    firstName: "Eva",
    lastName: "Fischer",
    email: "fischer_eva@gmail.com",
    phoneNumber: "235325325",
  },
  {
    firstName: "Emanuel",
    lastName: "Mauer",
    email: "e.mauer@gmail.com",
    phoneNumber: "235325325",
  },
  {
    firstName: "Tatjana",
    lastName: "Wolf",
    email: "wolf@gmail.com",
    phoneNumber: "+49 2 2 2222 222 2",
  },
  {
    firstName: "Marcel",
    lastName: "Bauer",
    email: "bauer@gmail.com",
    phoneNumber: "+49 2 2 2222 222 2",
  },
];

/* Background-Colors for profiles */
colors = ["#FF7A00", "#FFC700", "#9327FF", "#6E52FF", "#FC71FF", "#1FD7C1"];

/**
 * function to render the contacts
 */
function renderContacts() {
  let container = document.getElementById("contactContainer");
  container.innerHTML = "";

  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];
    container.innerHTML += `
    <div class="contactEntry" onclick="singleContactView(${index})">
        <div class="innerContactEntry">
            <div class="initials initSmall">
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

async function singleContactView(id) {
  document.getElementById("contactContainerOuter").style.display = "none";
  await includeHTML();
  renderSingleContact(id);
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
