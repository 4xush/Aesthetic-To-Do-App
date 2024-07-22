document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

let addTaskButton = document.querySelector("#add-task-btn");
let taskInput = document.querySelector("#taskInput");
let tasksList = document.querySelector("#tasksList");

addTaskButton.addEventListener("click", addTask);

function addTask() {
    if (taskInput.value !== "") {
        let taskText = taskInput.value;

        let item = createTaskElement(taskText);

        tasksList.appendChild(item);

        saveTask(taskText);
        taskInput.value = "";
    }
}

function deleteTask(event) {
    let item = event.target.parentElement;
    let taskText = item.querySelector(".task-text").textContent.trim();
    tasksList.removeChild(item);
    removeTask(taskText);
}

function toggleComplete(event) {
    let item = event.target.parentElement;
    if (event.target.checked) {
        item.classList.add("completed");
    } else {
        item.classList.remove("completed");
    }
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = getTasks();
    let updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(task => {
        let item = createTaskElement(task);
        tasksList.appendChild(item);
    });
}

function createTaskElement(taskText) {
    let item = document.createElement("li");

    let checkMark = document.createElement("input");
    checkMark.type = "checkbox";
    checkMark.classList.add("checkbox");
    checkMark.addEventListener("change", toggleComplete);
    item.appendChild(checkMark);

    let textNode = document.createElement("span");
    textNode.textContent = taskText;
    textNode.classList.add("task-text");
    item.appendChild(textNode);

    let delTaskBtn = document.createElement("span");
    delTaskBtn.innerHTML = "delete";
    delTaskBtn.classList.add("material-symbols-outlined", "deleteTask");
    delTaskBtn.addEventListener("click", deleteTask);
    item.appendChild(delTaskBtn);

    return item;
}
