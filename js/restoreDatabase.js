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
    id: 0,
    type: "User Story",
    title: "Join Projekt",
    description: "build a Kanban board",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "23-05-2024",
  },
  {
    id: 1,
    type: "Technical Task",
    title: "Saufen",
    description: "jaja, ist doch klar?",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback" /*todo -> feedback" */,
    priority: "High",
    dueDate: "23-05-2024",
  },
  {
    id: 2,
    type: "User Story",
    title: "Rasen mähen",
    description: "builde a Kanban baord",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "23-05-2024",
  },
  {
    id: 3,
    type: "User Story",
    title: "Oma anrufen",
    description: "builde a Kanban baord",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "todo" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "23-05-2024",
  },
  {
    id: 4,
    type: "User Story",
    title: "Join Projekt",
    description: "builde a Kanban baord",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "23-05-2024",
  },
  {
    id: 5,
    type: "User Story",
    title: "Join Projekt",
    description: "builde a Kanban baord",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "23-05-2024",
  },
  {
    id: 6,
    type: "User Story",
    title: "Join Projekt",
    description: "builde a Kanban baord",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "23-05-2024",
  },
  {
    id: 7,
    type: "User Story",
    title: "Join Projekt",
    description: "builde a Kanban baord",
    subtasks: [
      {
        id: 0,
        subtaskText: "header",
        complete: false,
      },
      {
        id: 1,
        subtaskText: "footer",
        complete: false,
      },
    ],
    finishedSubtasks: [],
    assignedTo: [
      {
        firstName: "Anton",
        lastName: "Mayer",
        profilColor: "#FF7A00",
      },
      {
        firstName: "Benedikt",
        lastName: "Ziegler",
        profilColor: "#9327FF",
      },
    ],
    category: "feedback" /*todo -> feedback" */,
    priority: "Low",
    dueDate: "23-05-2024",
  },
];


await putData("boardtasks", boardTasks2);