let tasks = [];

function loadTasks() {
	const storedTasks = localStorage.getItem("tasks");
	tasks = storedTasks ? JSON.parse(storedTasks) : [];
	displayTasks();
}

function saveTasks() {
	//tasks = storedTasks ? JSON.parse(storedTasks) : [];
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(title, description, priority) {
	const newTask = {
		id: Date.now().toString(),
		title,
		description,
		priority,
		completed: false,
	};

	tasks.push(newTask);
	saveTasks();
	displayTasks();
}

function deleteTask(taskId) {
	tasks = tasks.filter((task) => task.id !== taskId);
	saveTasks();
	displayTasks();
}

function toggleTaskCompletion(taskId) {
	tasks = tasks.map((task) => {
		if (task.id === taskId) task.completed = !task.completed;
		return task;
	});

	saveTasks();
	displayTasks();
}

function displayTasks() {
	const taskList = document.getElementById("taskList");
	taskList.innerHTML = "";

	tasks.forEach((task) => {
		const taskItem = document.createElement("div");
		taskItem.classList.add("task-item");

		if (task.completed) taskItem.classList.add("task-completed");

		taskItem.innerHTML = `
			<div>
				<strong>${task.title}</strong>
				<p>${task.description}</p>
				<em>${task.priority} Priority</em>
			</div>
			<div class="task-actions">
				<!--// toggle-->
				<button class="complete-btn">
					${task.completed ? "Undo" : "Complete"}
				</button>
				<button class="delete-btn">Delete</button>
			</div>
		`;

		taskItem
			.querySelector(".complete-btn")
			.addEventListener("click", () => toggleTaskCompletion(task.id));

		taskItem
			.querySelector(".delete-btn")
			.addEventListener("click", () => deleteTask(task.id));

		taskList.appendChild(taskItem);
	});
}

document.getElementById("taskForm").addEventListener("submit", (event) => {
	event.preventDefault();
	const title = document.getElementById("taskTitle").value;
	const description = document.getElementById("taskDescription").value;
	const priority = document.getElementById("taskPriority").value;

	addTask(title, description, priority);
	document.getElementById("taskForm").reset();
});

loadTasks();
