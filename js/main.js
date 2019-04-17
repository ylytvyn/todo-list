'use strict';

var newTaskAddBtn = document.getElementsByClassName('btn-add')[0],
	newTaskField = document.querySelector('.field-add'),
	todoList = document.querySelector('.todo-list'),
	todoCounter = 0;

newTaskAddBtn.addEventListener('click', addTask);
newTaskField.addEventListener('keydown', function(e) {
	if ((e.ctrlKey && e.which == 83) || e.which == 13) {
		e.preventDefault();
		addTask();
	}
});

// Add todo item
function addTask() {
	if (newTaskField.value == '') {
		showWarning('Please, fill todo field!');
		return;
	}

	todoCounter++;

	todoList.appendChild(createNewTaskElement(newTaskField.value));

	newTaskField.value = '';
}

// Create todo item
function createNewTaskElement(item) {
	// Create new items - VARIABLES
	var taskName = `todo-${todoCounter}`,
		taskItem = document.createElement('li'),
		taskCheckbox = document.createElement('input'),
		taskLabel = document.createElement('label'),
		taskInput = document.createElement('input'),
		taskEdit = document.createElement('button'),
		taskDelete = document.createElement('button');

	taskItem.classList.add('item');

	// Checkbox
	taskCheckbox.type = 'checkbox';
	taskCheckbox.name = taskName;
	taskCheckbox.id = taskName;

	// Label
	taskLabel.htmlFor = taskName;
	taskLabel.innerText = item;

	// Input
	taskInput.type = 'text';

	// Edit
	taskEdit.type = 'button';
	taskEdit.className = 'btn-edit';
	taskEdit.innerText = 'Edit';

	// Delete
	taskDelete.type = 'button';
	taskDelete.className = 'btn-delete';
	taskDelete.innerText = 'Delete';

	taskItem.append(taskCheckbox, taskLabel, taskInput, taskEdit, taskDelete);

	// Event Listeners
	taskDelete.addEventListener('click', deleteTask);
	taskCheckbox.addEventListener('change', completeTask);
	taskEdit.addEventListener('click', editTask);
	taskInput.addEventListener('blur', saveTask);

	return taskItem;
}

function deleteTask() {
	var askDelete = confirm('Are you sure you want to delete this item?');

	askDelete && this.parentElement.remove();
}

function completeTask() {
	var item = this.parentNode,
		completedList = document.querySelector('.completed-list');

	if (this.checked) {
		completedList.appendChild(item);
	} else {
		todoList.appendChild(item);
	}
}

function editTask() {
	updateTask(this, 'edit');
}

function saveTask() {
	updateTask(this, 'save');
}

function updateTask(item, command) {
	var parentElem = item.parentElement,
		$text = parentElem.querySelector('label'),
		$field = parentElem.querySelector('input[type="text"]');

	switch (command) {
		case 'edit':
			$field.value = $text.innerText;

			$text.style.display = 'none';
			$field.style.display = 'block';
			break;
		case 'save':
			if ($field.value == '') {
				showWarning('Please fill the field');
				break;
			}

			$text.innerText = $field.value;

			$text.style.display = 'block';
			$field.style.display = 'none';
			break;
	}
}

function showWarning(message) {
	var dialog = document.createElement('div'),
		dialogOverlay = document.createElement('div');

	dialogOverlay.className = 'dialog-overlay';
	dialog.className = 'dialog';

	dialog.innerHTML = `<p>${message}</p>`;

	document.body.append(dialogOverlay, dialog);

	setTimeout(function(){
		dialogOverlay.remove();
		dialog.remove();
	}, 3000);
}
