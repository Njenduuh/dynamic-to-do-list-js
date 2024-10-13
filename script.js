document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from localStorage when the page loads
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTaskToList(task));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const task = {
            text: taskText,
            completed: false
        };

        // Add task to the list and save it
        addTaskToList(task);
        saveTask(task);

        // Clear the input field
        taskInput.value = "";
    }

    // Function to add task to the DOM
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.classList.add('complete-btn');
        completeButton.onclick = function() {
            toggleTaskCompletion(task, li, completeButton);
        };

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function() {
            removeTask(task.text);
            taskList.removeChild(li);
        };

        // Append buttons to li
        li.appendChild(completeButton);
        li.appendChild(removeButton);

        // Add completed style if task is already completed
        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        // Append li to taskList
        taskList.appendChild(li);
    }

    // Toggle task completion
    function toggleTaskCompletion(task, li, completeButton) {
        task.completed = !task.completed;
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        li.style.textDecoration = task.completed ? "line-through" : "none";

        // Update localStorage
        updateTaskInStorage(task);
    }

    // Save task to localStorage
    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task from localStorage and DOM
    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Update task in localStorage
    function updateTaskInStorage(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.text === updatedTask.text ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add event listener for the 'Add Task' button
    addButton.addEventListener('click', addTask);

    // Add event listener for 'Enter' key press in task input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Add event listener for 'Clear All' button (Optional)
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = "Clear All Tasks";
    clearAllButton.classList.add('clear-all-btn');
    document.getElementById('todo-app').appendChild(clearAllButton);

    clearAllButton.addEventListener('click', function() {
        taskList.innerHTML = ''; // Clear the list from the UI
        localStorage.removeItem('tasks'); // Clear the tasks from localStorage
    });
});
