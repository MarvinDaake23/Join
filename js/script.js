let categorys = ['Technical Task','User Story'];
let prios =['Low','Medium','Urgent'];
let task = [];

let prioValue;
let cat;

function init(){
    includeHTML();
    loadWrapper();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function prioChoose(i){
    console.log(i);
    prioValue = i;
}

function chooseCategory(i){
    let placeholder = document.getElementById('placeholder');
    let choose = document.getElementById(`category${i}`).innerHTML;
    placeholder.innerHTML = choose;
    cat = i;
}


function loadWrapper(){
    let wrapperList = document.getElementById('wrapperList');

    for (let i = 0; i < categorys.length; i++) {
        wrapperList.innerHTML +=/*html */`
        <li onclick="chooseCategory(${i})"  class ="list">
            <span id="category${i}">
                <div>${categorys[i]}</div>
            </span>
        </li>
        `;  
    }
}

function openWrapper(){
    if(document.getElementById('wrapperList').classList.contains('dNone')){
        document.getElementById('wrapperList').classList.remove('dNone');
        document.getElementById('arrowUp').classList.remove('dNone');
        document.getElementById('arrowDown').classList.add('dNone');
        document.getElementById('wrapper').classList.add('openBorader');
    }
    else{
        document.getElementById('wrapperList').classList.add('dNone');
        document.getElementById('arrowUp').classList.add('dNone');
        document.getElementById('arrowDown').classList.remove('dNone');
        document.getElementById('wrapper').classList.remove('openBorader');
    }
}


function addTask(){
    let title = document.getElementById('title').value;
    let desription = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let prio = prios[prioValue];
    let category = categorys[cat];

    let temTask = {
            "titel": title,
            'desription':desription,
            'assignedTo':'',
            'dueDate':date,
            'prio':prio,
            'category':category,
            'subtask':'',
        };
    task.push(temTask);
    console.log(task);
}