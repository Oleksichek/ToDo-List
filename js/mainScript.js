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
        td[1].textContent = `Task ${this.id}`;
        td[2].children[0].addEventListener("input", () => changeStatus(this.id));
        td[4].children[0].addEventListener("click", () => deleteTask(this.id));

        this.elementObj.children[2].children[0].style.borderColor = "#269ffc";
        this.elementObj.children[2].children[0].style.color = "#269ffc";
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
}

//Щоб відкрити кастомне поле для введення тексту
//document.getElementById('popupWraper').style.display = 'block';

//Щоб закрити кастомне поле для введення тексту
//document.getElementById('popupWraper').style.display = 'none';