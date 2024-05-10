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
        td[4].children[0].addEventListener("click", () => deleteTask(this.id));
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
    let newTask = new TaskItem(nextId, `Task ${nextId}`, 1, taskTable.lastElementChild);
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

function deleteTask(id) {
    let taskItem;
    let idx = -1;
    for (const item of taskItems) {
        idx++;
        if (item.getID() != id) continue;
        taskItem = item;
        break;
    }

    taskItem.elementObj.remove();
    taskItems.splice(idx, 1);
}