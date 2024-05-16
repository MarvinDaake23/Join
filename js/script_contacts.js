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
    container.innerHTML += `<div class="contactEntry">${element.firstName} ${element.lastName}</div>
    <div class="initials">${element.firstName[0]}${element.lastName[0]}</div>
    <div>${element.email}</div>
    `;
  }
}


