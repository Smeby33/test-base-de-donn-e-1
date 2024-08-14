document.getElementById('addTaskButton').addEventListener('click', async () => {
    const title = document.getElementById('taskTitle').value;

    if (title) {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });

        const newTask = await response.json();
        addTaskToUI(newTask);
    }
});

async function loadTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    tasks.forEach(task => addTaskToUI(task));
}

function addTaskToUI(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.textContent = task.title;
    taskList.appendChild(taskItem);
}

loadTasks();
