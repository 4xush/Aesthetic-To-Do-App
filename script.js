document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage when the page is loaded
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox" onchange="toggleTask(this)">
                <span>${taskInput.value}</span>
            </div>
            <button class="delete-btn" onclick="removeTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }
}

function removeTask(button) {
    const li = button.parentNode;
    li.parentNode.removeChild(li);

    // Save tasks to localStorage after removing a task
    saveTasks();
}

function toggleTask(checkbox) {
    const span = checkbox.parentNode.querySelector('span');
    span.classList.toggle('completed');

    // Save tasks to localStorage after toggling a task
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // Extract tasks and their completed status from the list and store them in an array
    taskList.childNodes.forEach((item) => {
        if (item.nodeName === 'LI') {
            const span = item.querySelector('span');
            const completed = span.classList.contains('completed');
            tasks.push({ text: span.innerText, completed });
        }
    });

    // Save the tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        // Create list items for each saved task
        tasks.forEach((task) => {
            const li = document.createElement('li');
            const checkbox = task.completed ? 'checked' : '';
            li.innerHTML = `
                <div class="checkbox-container">
                    <input type="checkbox" class="checkbox" onchange="toggleTask(this)" ${checkbox}>
                    <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                </div>
                <button class="delete-btn" onclick="removeTask(this)">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
}
