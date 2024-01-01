//1. Input in the text box -> Save Button click -> Populate the data in the display todo section
//Selectores
const todoInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-todo-button");
const todoListItems = document.querySelector(".todo-list-items");
const filterTodoDropdown = document.querySelector(".filter-todo");

//Event Listners
document.addEventListener("DOMContentLoaded", loadTodoItems);
addTaskButton.addEventListener("click", addTodo);
filterTodoDropdown.addEventListener("change", filterTodo);

//Functions

//Create Todo Div
function createTodoElement() {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  return todoDiv;
}

//Create LI todo item to be added to div
function createTodoItem() {
  const todoItem = document.createElement("li");
  //   todoItem.innerText = todoInput.value;
  todoItem.classList.add("todo-item");

  // Adding a span with the class "todo-item-text" for editing
  const todoTextSpan = document.createElement("span");
  todoTextSpan.classList.add("todo-item-text");
  todoTextSpan.innerText = todoInput.value;
  todoItem.appendChild(todoTextSpan);
  return todoItem;
}

//Create Button Funcitonality
function createButton(text, className) {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add(className);
  return button;
}

//Create Delete Button
function createDeleteButton() {
  const deleteButton = createButton("Delete", "todo-delete-button");
  deleteButton.addEventListener("click", deleteTodo);
  return deleteButton;
}
//Create Completed Button
function createCompleteButton() {
  const completeButton = createButton("Completed", "todo-complete-button");
  completeButton.addEventListener("click", completeTodo);
  return completeButton;
}
//Create  Edit
function createEditButton() {
  const editButton = createButton("Edit", "todo-edit-button");
  editButton.addEventListener("click", editTodo);
  return editButton;
}

//Add todo functionality
function addTodo(event) {
  event.preventDefault();

  const todoDiv = createTodoElement();
  const todoItem = createTodoItem();

  const editButton = createEditButton();
  const completeButton = createCompleteButton();
  const deleteButton = createDeleteButton();

  todoItem.appendChild(editButton);
  todoItem.appendChild(completeButton);
  todoItem.appendChild(deleteButton);

  todoDiv.appendChild(todoItem);
  todoListItems.appendChild(todoDiv);

  // Save updated todo list to local storage
  saveTodoItemsToLocal();

  todoInput.value = "";
}

//DELETE TODO FUNCTIONALITY
function deleteTodo() {
  const todoDiv = this.closest(".todo");
  todoDiv.remove();

  // Save updated todo list to local storage after deletion
  saveTodoItemsToLocal();
}

//Complete Todo
function completeTodo() {
  const todoItem = this.closest(".todo-item");
  const isComplete = todoItem.classList.toggle("mark-complete");
  const completeButtonText = isComplete ? "Incomplete" : "Complete";
  this.innerText = completeButtonText;

  // Save updated todo list to local storage after completion status change
  saveTodoItemsToLocal();
}

//Edit Todo
function editTodo() {
  const todoItem = this.closest(".todo-item");
  const isEdited = todoItem.classList.toggle("edit-todo-item");
  const todoText = todoItem.querySelector(".todo-item-text");

  if (isEdited) {
    this.innerText = "Save";
    todoText.contentEditable = true;
    todoText.focus();
  } else {
    this.innerText = "Edit";
    todoText.contentEditable = false;
  }
  saveTodoItemsToLocal();
}

//Filter Todo
function filterTodo() {
  const todos = document.querySelectorAll(".todo");
  const selectedFilter = filterTodoDropdown.value;

  todos.forEach((todo) => {
    const isComplete = todo
      .querySelector(".todo-item")
      .classList.contains("mark-complete");
    switch (selectedFilter) {
      case "all":
        todo.style.display = "flex"; // Show all todos
        break;
      case "complete":
        if (isComplete) {
          todo.style.display = "flex"; // Show completed todos
        } else {
          todo.style.display = "none"; // Hide incomplete todos
        }
        break;
      case "incomplete":
        if (!isComplete) {
          todo.style.display = "flex"; // Show incomplete todos
        } else {
          todo.style.display = "none"; // Hide completed todos
        }
        break;
    }
  });
}

//Load Todo items from storage
function loadTodoItems() {
  const storedTodoItems = JSON.parse(localStorage.getItem("todoItems"));
  storedTodoItems.forEach((storedTodoItem) => {
    const todoDiv = createTodoElement();
    const todoItem = createTodoItem();

    const editButton = createEditButton();
    const completeButton = createCompleteButton();
    const deleteButton = createDeleteButton();

    todoItem.appendChild(editButton);
    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);

    todoDiv.appendChild(todoItem);
    todoListItems.appendChild(todoDiv);

    // Set the text content and completion status
    todoItem.querySelector(".todo-item-text").innerText = storedTodoItem.text;
    if (storedTodoItem.isComplete)
      // the completion is simulated by invoking the completeTodo function on the completeButton.
      completeTodo.call(completeButton);
  });
}

//Save todo items to local storage
function saveTodoItemsToLocal() {
  const todos = document.querySelectorAll(".todo");
  const todoItems = [];

  todos.forEach((todo) => {
    const todoItemText = todo
      .querySelector(".todo-item")
      .querySelector(".todo-item-text").innerText;
    const isComplete = todo
      .querySelector(".todo-item")
      .classList.contains("mark-complete");

    todoItems.push({ text: todoItemText, isComplete: isComplete });
  });
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
