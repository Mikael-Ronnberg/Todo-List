import { TodoObject } from "./models/todoClass";

const inputText = document.getElementById("input-text");
const inputBtn = document.getElementById("add-todo");
const toDoListHTML = document.querySelector(".todo");
const toggleMyDones = document.querySelector(".toggle--todo");

inputBtn.addEventListener("click", addOneToDo);
toDoListHTML.addEventListener("click", deleteOneToDo);
toggleMyDones.addEventListener("click", toggleDoneUndone);
document.addEventListener("DOMContentLoaded", downloadLocalStorage);

let todoArray = [];

function addOneToDo(click) {
  click.preventDefault();

  if (inputText.value === "") {
    return;
  } else {
    let myToDo = new TodoObject(inputText.value, false);
    todoArray.push(myToDo);
    inputText.value = "";
    createObjectOnDom(todoArray);
  }
}

function createObjectOnDom(visibleList) {
  toDoListHTML.innerHTML = "";

  for (let i = 0; i < visibleList.length; i++) {
    let toDoContainerDOM = document.createElement("div");
    toDoContainerDOM.classList.add("todo--container");

    let toDoListDOM = document.createElement("li");
    toDoListDOM.innerText = visibleList[i].todoText;
    toDoListDOM.classList.add("todo--container__dot");
    toDoContainerDOM.appendChild(toDoListDOM);

    let toDoDoneBtn = document.createElement("button");
    toDoDoneBtn.innerHTML = `Done`;
    toDoDoneBtn.classList.add("doneBtn");
    toDoContainerDOM.appendChild(toDoDoneBtn);

    const toDoDeleteBtn = document.createElement("button");
    toDoDeleteBtn.innerHTML = "X";
    toDoDeleteBtn.classList.add("throwBtn");

    if (visibleList[i].doneDone === true) {
      toDoContainerDOM.classList.add("doneDone");
    }

    toDoListHTML.appendChild(toDoContainerDOM);

    toDoContainerDOM.appendChild(toDoDeleteBtn);
    saveToLocalStorage(visibleList);
  }
}

function deleteOneToDo(click) {
  const event = click.target;

  if (event.classList[0] === "throwBtn") {
    const trash = event.parentElement;
    const index = trash.querySelector("li").innerText;
    todoArray.splice(index, 1);
    localStorage.clear();
    saveToLocalStorage(todoArray);
    createObjectOnDom(todoArray);
  }

  if (event.classList[0] === "doneBtn") {
    let done = event.parentElement;
    let index = done.querySelector("li").innerText;
    let number = todoArray.findIndex((find) => find.todoText === index);
    done.classList.toggle("doneDone");
    todoArray[number].doneDone = !todoArray[number].doneDone;
    localStorage.clear();
    saveToLocalStorage(todoArray);
    createObjectOnDom(todoArray);
  }
}

function toggleDoneUndone(click) {
  const todos = toDoListHTML.childNodes;
  console.log(todos);

  todos.forEach((todo) => {
    switch (click.target.value) {
      case "all":
        todo.style.display = "flex";
        return;
      case "done":
        if (todo.classList.contains("doneDone")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        return;
      case "undone":
        if (!todo.classList.contains("doneDone")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        return;
    }
  });
}

function saveToLocalStorage(localStuff) {
  let localTodo = localStorage.getItem("localStorageList");

  if (localTodo === null) {
    localTodo = [];
  } else {
    localTodo = JSON.parse(localStorage.getItem("localStorageList"));
    localStorage.clear();
  }
  localTodo.push(localStuff);
  localStorage.setItem("localStorageList", JSON.stringify(localStuff));
}

function downloadLocalStorage() {
  let todo;
  let localTodo = JSON.parse(localStorage.getItem("localStorageList"));

  console.log(localTodo);

  if (localTodo === null) {
    return;
  } else {
    for (let i = 0; i < localTodo.length; i++) {
      todo = new TodoObject(localTodo[i].todoText, localTodo[i].doneDone);
      todoArray.push(todo);
      console.log(todo);
    }
    createObjectOnDom(todoArray);
  }
}
