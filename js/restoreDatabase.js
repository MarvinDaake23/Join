/** falls man es "verkackt" hat */

let contacts = [
  {
    firstName: "Anton",
    lastName: "Mayer",
    email: "antom@gmail.com",
    phoneNumber: "235325325",
    profileColor: "#FF7A00",
  },
  {
    firstName: "Anja",
    lastName: "Schulz",
    email: "anjaschulz@gmail.com",
    phoneNumber: "235325325",
    profileColor: "#FFC700",
  },
  {
    firstName: "Benedikt",
    lastName: "Ziegler",
    email: "ziegler@gmx.com",
    phoneNumber: "235325325",
    profileColor: "#9327FF",
  },
  {
    firstName: "David",
    lastName: "Eisenberg",
    email: "eisenberg@googlemail.com",
    phoneNumber: "235325325",
    profileColor: "#6E52FF",
  },
  {
    firstName: "Eva",
    lastName: "Fischer",
    email: "fischer_eva@gmail.com",
    phoneNumber: "235325325",
    profileColor: "#FC71FF",
  },
  {
    firstName: "Emanuel",
    lastName: "Mauer",
    email: "e.mauer@gmail.com",
    phoneNumber: "235325325",
    profileColor: "#6E52FF",
  },
  {
    firstName: "Tatjana",
    lastName: "Wolf",
    email: "wolf@gmail.com",
    phoneNumber: "+49 2 2 2222 222 2",
    profileColor: "#FF7A00",
  },
  {
    firstName: "Marcel",
    lastName: "Bauer",
    email: "bauer@gmail.com",
    phoneNumber: "+49 2 2 2222 222 2",
    profileColor: "#1FD7C1",
  },
];

await putData("contacts", contacts);
