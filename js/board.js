let boardTasks = [
    {
        'id': 0,
        'type':'User Story',
        'title':'Join Projekt',
        'description':'builde a Kanban baord',
        'subtasks':[
            {
                'id':0,
                'subtaskText':'header',
                'complete':false,
            },
            {
                'id':1,
                'subtaskText':'footer',
                'complete':false,
            }
        ],
        'finishedSubtasks':[],
        'assignedTo':[
            {
                'firstName':'Anton',
                'lastName':'Mayer',
                'profilColor':'#FF7A00',
            },
            {
                'firstName':'Benedikt',
                'lastName':'Ziegler',
                'profilColor':'#9327FF',
            },
        ],
        'category':'todo',
        'priority':'Low',
        'dueDate':'23-05-2024'
    },
]

function boardInit(){
    addToBoard();
    includeHTML();
}

function addToBoard(){
    let toDo = document.getElementById('toDoContainer');

    for (let i = 0; i < boardTasks.length; i++) {
        const element = boardTasks[i];
        console.log(element);
        toDo.innerHTML += renderBoardTask(element,i);
        loadPrioBoardTask(i);
        loadContactInBoardTask(i);
        
    } 
    
  }

function loadContactInBoardTask(i){
    let contacts = document.getElementById('boardTaskContacts');
    console.log(boardTasks[i]['assignedTo']);
    for (let j = 0; j < boardTasks[i]['assignedTo'].length; j++) {
        const element = boardTasks[i]['assignedTo'][j];
        contacts.innerHTML += renderBoardTaskContacts(element);
    }
}

function loadPrioBoardTask(i){
    let prio = document.getElementById('boardTaskPrio');
    console.log(boardTasks[i]['priority']);
    if(boardTasks[i]['priority']=='Low'){
        prio.classList.add('lowPrioImg');
    }
    if(boardTasks[i]['priority']=='Medium'){
        prio.classList.add('medPrioImg');
    }
    if(boardTasks[i]['priority']=='Urgent'){
        prio.classList.add('highPrioImg');
    }
}

function loadBoardBigContainer(i){
    let bigContainer = document.getElementById('boardBigContainer');
    bigContainer.innerHTML = renderBoardBigContainer(i);
    loadBoardBigContainerLists(i);
}

function loadBoardBigContainerLists(i){
    let assignedToContactsInput = document.getElementById('boardBigContainerAssignedToContactsInput');
    let Subtasks =document.getElementById('boardBigContainerSubtasks');

    for (let j = 0; j < boardTasks[i]['assignedTo'].length; j++) {
        const element = boardTasks[i]['assignedTo'][j];
        assignedToContactsInput.innerHTML += renderBoardBigContainerContacts(element);
    }

    for (let j = 0; j < boardTasks[i]['subtasks'].length; j++) {
        const element = boardTasks[i]['subtasks'][j];
        console.log(element);
        Subtasks.innerHTML += renderBoardBigContainerSubtasks(element);
    }
}