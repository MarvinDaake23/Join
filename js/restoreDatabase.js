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
    title: "Join Projekt",
    description: "build a Kanban board",
    subtasks: [
      {
        subtaskText: "header",
        complete: false,
      },
      {
        subtaskText: "footer",
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
    category: "feedback" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "2024-05-23",
  },
  {
    type: "User Story",
    title: "Rasen mähen",
    description: "Kein Bock",
    subtasks: [
      {
        subtaskText: "header",
        complete: false,
      },
      {
        subtaskText: "footer",
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
    category: "todo" /*todo -> feedback" */,
    priority: "Urgent",
    dueDate: "2024-01-01",
  },
  {
    type: "Technical Task",
    title: "Saufen",
    description: "Das muss man immer machen",
    subtasks: [
      {
        subtaskText: "header",
        complete: false,
      },
      {
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: 2,
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
    category: "todo" /*todo -> feedback" */,
    priority: "Urgent",
    dueDate: "2024-03-03",
  },
  {
    type: "Technical Task",
    title: "Join abgeben",
    description: "fertig stellen",
    subtasks: [
      {
        subtaskText: "header",
        complete: false,
      },
      {
        subtaskText: "footer",
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
    category: "done" /*todo -> feedback" */,
    priority: "Medium",
    dueDate: "2023-05-04",
  },
];

await putData("boardtasks", boardTasks2);
