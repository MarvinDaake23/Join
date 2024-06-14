/* little script to restore data in firebase */
const BASE_URL =
  "https://remotestorage-a7059-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts2 = [
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

await putData("contacts", contacts2);

// TASKS BACKUP
let boardTasks2 = [
  {
    type: "User Story",
    title: "User registry",
    description: "As a user I want to be able to register me",
    subtasks: [
      {
        subtaskText: "Formular",
        complete: true,
      },
      {
        subtaskText: "Privacy Policy",
        complete: false,
      },
    ],
    finishedSubtasks: 1,
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profileColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profileColor: "#9327FF",
      },
    ],
    category: "feedback",
    priority: "Low",
    dueDate: "2024-09-23",
  },
  {
    type: "User Story",
    title: "Tasks on board",
    description: "As a user I want to see my tasks on the board",
    subtasks: [
      {
        subtaskText: "design",
        complete: false,
      },
      {
        subtaskText: "add tasks on board",
        complete: false,
      },
    ],
    finishedSubtasks: 0,
    assignedTo: [
      {
        firstName: "Christoph",
        lastName: "Völker",
        profileColor: "#FF7A00",
      },
    ],
    category: "todo",
    priority: "Urgent",
    dueDate: "2025-01-01",
  },
  {
    type: "Technical Task",
    title: "Responsiveness with CSS",
    description: "Support for several viewports",
    subtasks: [
      {
        subtaskText: "Desktop view",
        complete: false,
      },
      {
        subtaskText: "Mobile view",
        complete: true,
      },
    ],
    finishedSubtasks: 1,
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profileColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profileColor: "#9327FF",
      },
    ],
    category: "todo",
    priority: "Urgent",
    dueDate: "2024-12-03",
  },
  {
    type: "User Story",
    title: "Contacts",
    description: "As a user I want to see my contacts",
    subtasks: [
      {
        subtaskText: "order alphabetically",
        complete: false,
      },
      {
        subtaskText: "add users to tasks",
        complete: false,
      },
    ],
    finishedSubtasks: 0,
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profileColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profileColor: "#9327FF",
      },
    ],
    category: "done",
    priority: "Medium",
    dueDate: "2024-08-04",
  },
];

await putData("boardtasks", boardTasks2);
