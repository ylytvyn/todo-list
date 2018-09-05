var newTaskAdd = document.getElementById('add-task'),
	newTask = document.getElementById('new-task'),
	taskList = document.getElementById('incomplete-tasks'),
	completedTaskList = document.getElementById('completed-tasks');

newTaskAdd.addEventListener('click', addTask);

function addTask () {
	var taskItem = document.createElement('li');

	if (newTask.value == '') {
		alert('Введите значение');
		return;
	}

	taskItem.innerHTML = `<input type="checkbox">
			<label>${newTask.value}</label>
			<input type="text">
			<button class="edit">Edit</button>
			<button class="delete">Delete</button>`;

	taskList.appendChild(taskItem);

	// Event Listeners
	taskItem.querySelector('.delete').addEventListener('click', deleteTask);
	taskItem.querySelector('.edit').addEventListener('click', editTask);
	taskItem.querySelector('input[type="text"]').addEventListener('blur', saveTask);
	taskItem.querySelector('input[type="checkbox"]').addEventListener('change', completeTask);

	newTask.value = '';
}

function deleteTask () {
	this.parentElement.remove();
}

function editTask () {
	var parent = this.parentElement,
		text = parent.querySelector('label'),
		field = parent.querySelector('input[type="text"]');

	field.value = text.innerText;

	field.style.display = 'inline-block';
	text.style.display = 'none';
}

function saveTask () {
	var parent = this.parentElement,
		text = parent.querySelector('label'),
		field = parent.querySelector('input[type="text"]');

	text.innerText = field.value;

	field.style.display = 'none';
	text.style.display = 'inline-block';
}

function completeTask () {
	var item = this.parentElement;

	if (this.checked) {
		completedTaskList.appendChild(item);
	} else {
		taskList.appendChild(item);
	}
}
