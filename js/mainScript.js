class TaskItem {
    constructor(id, name, status, elementObj) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.elementObj = elementObj;
    }

    setUp() {
        let td = this.elementObj.querySelectorAll("td");
        td[0].textContent = this.id;
        td[1].textContent = this.name;
        td[1].addEventListener("dblclick", () => editTaskName(this.id));
        td[2].children[0].addEventListener("input", () => changeStatus(this.id));
        td[3].children[0].addEventListener("click", () => editTaskName(this.id));
        td[4].children[0].addEventListener("click", () => deleteTask(this.id));
        this.elementObj.children[2].children[0].selectedIndex = this.status;

        switch(this.status) {
            case 0:
                this.elementObj.children[2].children[0].style.borderColor = "#269ffc";
                this.elementObj.children[2].children[0].style.color = "#269ffc";
                break;
            case 1:
                this.elementObj.children[2].children[0].style.borderColor = "#03ad8b";
                this.elementObj.children[2].children[0].style.color = "#03ad8b";
                break;
            case 2:
                this.elementObj.children[2].children[0].style.borderColor = "orange";
                this.elementObj.children[2].children[0].style.color = "orange";
                break;
            case 3:
                this.elementObj.children[2].children[0].style.borderColor = "green";
                this.elementObj.children[2].children[0].style.color = "green";
                break;
        }
    }

    getID() {
        return this.id;
    }
}

let taskItems = []
let taskTable = document.getElementById("taskTable");
let taskItemPrefab = document.getElementById("taskItemTemplate");

function addTask() {
    let taskItemNode = taskItemPrefab.content.cloneNode(true);
    taskTable.appendChild(taskItemNode);
    const nextId = getLastId() + 1;
    let newTask = new TaskItem(nextId, `Task ${nextId}`, 0, taskTable.lastElementChild);
    newTask.setUp();
    taskItems.push(newTask);
    saveTaskInCookies(newTask);
}

function addTaskByData(name, status) {
    let taskItemNode = taskItemPrefab.content.cloneNode(true);
    taskTable.appendChild(taskItemNode);
    const nextId = getLastId() + 1;
    let newTask = new TaskItem(nextId, name, status, taskTable.lastElementChild);
    newTask.setUp();
    taskItems.push(newTask);
    saveTaskInCookies(newTask);
}

function getLastId()
{
    let lastId = 0;
    for (const taskItem of taskTable.children) {
        if (parseInt(taskItem.children[0].textContent) < lastId)
            continue;
        lastId = parseInt(taskItem.children[0].textContent);
    }
    return lastId;
}

function getTaskItemById(id) {
    for (const item of taskItems) {
        if (item.getID() != id) continue;
        return item;
    }
    return null;
}

function changeStatus(id) {
    let taskItem = getTaskItemById(id);
    if (taskItem == null)
        return;

    taskItem.status = taskItem.elementObj.children[2].children[0].selectedIndex;

    switch(taskItem.status) {
        case 0:
            taskItem.elementObj.children[2].children[0].style.borderColor = "#269ffc";
            taskItem.elementObj.children[2].children[0].style.color = "#269ffc";
            break;
        case 1:
            taskItem.elementObj.children[2].children[0].style.borderColor = "#03ad8b";
            taskItem.elementObj.children[2].children[0].style.color = "#03ad8b";
            break;
        case 2:
            taskItem.elementObj.children[2].children[0].style.borderColor = "orange";
            taskItem.elementObj.children[2].children[0].style.color = "orange";
            break;
        case 3:
            taskItem.elementObj.children[2].children[0].style.borderColor = "green";
            taskItem.elementObj.children[2].children[0].style.color = "green";
            break;
    }

    changeTaskInCookies(taskItem, "status", taskItem.status);
}

function deleteTask(id) {
    let taskItem;
    let idx = -1;
    for (const item of taskItems) {
        idx++;
        if (item.getID() != id) continue;
        taskItem = item;
        break;
    }

    if (taskItem == null) return;

    taskItem.elementObj.remove();
    taskItems.splice(idx, 1);
    removeTaskFromCookies(taskItem);
}

function saveTaskInCookies(task) {
    if (!document.cookie || document.cookie == "null")
        prevJson = [];
    else
        prevJson = JSON.parse(decodeURIComponent(document.cookie));

    taskJson = [
        {
            'id':task.id,
            'name':task.name,
            'status':task.status 
        },
    ]

    let final = prevJson.concat(taskJson);
    document.cookie = JSON.stringify(final);
}

function removeTaskFromCookies(task) {
    prevJson = JSON.parse(decodeURIComponent(document.cookie));
    newJson = []

    for (const taskItem of prevJson) {
        if (taskItem.id == task.id) 
            continue;

        newJson = newJson.concat(taskItem);
    }

    document.cookie = JSON.stringify(newJson);
}

function changeTaskInCookies(task, key, value) {
    prevJson = JSON.parse(decodeURIComponent(document.cookie));
    newJson = []

    for (const taskItem of prevJson) {
        if (taskItem.id == task.id) 
            taskItem[key] = value;

        newJson = newJson.concat(taskItem);
    }

    document.cookie = JSON.stringify(newJson);
}

function editTaskName(id) {
    taskName = prompt("Enter a name for the selected task: ");

    if (!taskName || taskName == "null") {
        alert("Task name is null or empty.");
        return;
    }
    else if (taskName.length > 32) {
        alert("The name must be less than or equal to 32 characters.");
        return;
    }

    taskItem = getTaskItemById(id);

    taskItem.elementObj.children[1].textContent = taskName;
    changeTaskInCookies(taskItem, "name", taskName);
}

loadSavedTasks();

function loadSavedTasks() {
    if (!document.cookie || document.cookie == "null")
        return;
    
    prevJson = JSON.parse(decodeURIComponent(document.cookie));
    document.cookie = null;

    for (const taskItem of prevJson) {
        addTaskByData(taskItem.name, taskItem.status);
    } 
}