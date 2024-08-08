// function to
// 1- create div for result
// 2- append it to the mother div (tasks)
// 3- value of son = value of the input
// 4- css style to son to looks beautiful 😉
// 5- make deletd input
// 6- make this deletd input do its job and deletd eveything

let input = document.querySelector(".container .form .input");
let addTask = document.querySelector(".container .form .add");
let tasks = document.querySelector(".container .tasks");

//Function to add inputValue in reslut div when i click addtask button
let taskDiv;
let deleteinput;

addTask.onclick = function () {
  if (input.value !== "") {
    //creat div for reslut
    taskDiv = document.createElement("div");
    taskDiv.textContent = input.value;
    tasks.appendChild(taskDiv);

    // create input for delet result
    deleteinput = document.createElement("input");
    deleteinput.setAttribute("type", "submit");
    deleteinput.setAttribute("value", "Delete");
    tasks.append(deleteinput);

    // clear to the input
    input.value = "";

    // Save tasks to localStorage
    saveTasks();
  }
};

// function to save tasks in localstorge
function saveTasks() {
  allTasks = [];
  tasks.querySelectorAll("div").forEach((taskDiv) => {
    allTasks.push(taskDiv.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// load tasks from localStorage on  page load
function loadTasks() {
  let localStorageString = localStorage.getItem("tasks");
  let localStorageArray = JSON.parse(localStorageString) || [];

  localStorageArray.forEach((e) => {
    //creat div for reslut
    taskDiv = document.createElement("div");
    taskDiv.textContent = e;
    tasks.appendChild(taskDiv);

    // create input for delet result
    deleteinput = document.createElement("input");
    deleteinput.setAttribute("type", "submit");
    deleteinput.setAttribute("value", "Delete");
    tasks.append(deleteinput);
  });

  // function to delete taskDiv and deletd input
  function deleteTask(event) {
    deleteButton = event.target;
    taskDiv = deleteButton.previousElementSibling;
    taskDiv.remove();
    deleteButton.remove();

    saveTasks();
  }

  tasks.addEventListener("click", function (event) {
    if (event.target && event.target.type === "submit") {
      deleteTask(event);
    }
  });
}

loadTasks();
