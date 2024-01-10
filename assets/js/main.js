// ~ HTML Elements
const searchInput = document.getElementById("search");
//#region Task Form Modal
const showTaskFormButton = document.getElementById("showTaskForm");

const blackLayerElement = document.getElementById("black__layer");
const taskFormElement = document.getElementById("taskForm");

const taskStateInput = document.getElementById("stateInput");
const taskCategoryInput = document.getElementById("categoryInput");
const taskTitleInput = document.getElementById("titleInput");
const taskDescriptionInput = document.getElementById("descriptionInput");

const addNewTaskButton = document.getElementById("addNewTask");
const updateTaskButton = document.getElementById("updateTask");

const settingButton = document.getElementById("setting");
//#endregion

//#region card buttons
//#endregion
const cardsQuantity = document.querySelectorAll(".cards__quantity");

// ~ Variables
const allArrays = getDataFromLocalStorage("data") || {
  key: "data",
  nextUp: {
    type: "nextUpListData",
    array: [],
  },
  inProgress: {
    type: "inProgressListData",
    array: [],
  },
  done: {
    type: "doneListData",
    array: [],
  },
};
const updateApp = () => {
  setToLocalStorage();
  displayTasksQuantity();
  displayNextUpTasks();
  displayInProgressTasks();
  displayDoneTasks();
};

let indexOftaskToBeUpdated;

// ~ Functions

updateApp();
"".con;
function search() {
  var term = searchInput.value;
  for (let i = 0; i < allArrays.nextUp.array.length; i++) {
    if (
      allArrays.nextUp.array[i].title.toLowerCase().contains(term.toLowerCase())
    ) {
      console.log("done");
    }
  }
}
function searchFunction() {
  var term = searchInput.value;

  var htmlContent = "";

  cardsQuantity[0].innerHTML = 0;
  for (var i = 0; i < allArrays.nextUp.array.length; i++) {
    if (
      allArrays.nextUp.array[i].title.toLowerCase().includes(term.toLowerCase())
    ) {
      htmlContent += createTaskCardElement(allArrays.nextUp.array, i);
      cardsQuantity[0].innerHTML = +cardsQuantity[0].innerHTML + 1;
    }
  }
  nextUpContainer.innerHTML = htmlContent;

  htmlContent = "";
  cardsQuantity[1].innerHTML = 0;
  for (var i = 0; i < allArrays.inProgress.array.length; i++) {
    if (
      allArrays.inProgress.array[i].title
        .toLowerCase()
        .includes(term.toLowerCase())
    ) {
      htmlContent += createTaskCardElement(allArrays.inProgress.array, i);
      cardsQuantity[1].innerHTML = +cardsQuantity[1].innerHTML + 1;
    }
  }
  inProgressContainer.innerHTML = htmlContent;

  htmlContent = "";
  cardsQuantity[2].innerHTML = 0;
  for (var i = 0; i < allArrays.done.array.length; i++) {
    if (
      allArrays.done.array[i].title.toLowerCase().includes(term.toLowerCase())
    ) {
      htmlContent += createTaskCardElement(allArrays.done.array, i);
      cardsQuantity[2].innerHTML = +cardsQuantity[2].innerHTML + 1;
    }
  }
  doneContainer.innerHTML = htmlContent;
}
searchInput.addEventListener("input", searchFunction);
// ^ show form
function showTaskForm() {
  //#region
  taskFormElement.classList.remove("hidden");
  //#endregion
}

// ^ hide form
function hideTaskForm() {
  //#region
  taskFormElement.classList.add("hidden");
  //#endregion
}

// ^ set data to local storage
function setToLocalStorage() {
  //#region
  localStorage.setItem(allArrays.key, JSON.stringify(allArrays));
  //#endregion
}

// ^ get data from local storage
function getDataFromLocalStorage(key = "data") {
  //#region
  return JSON.parse(localStorage.getItem(key));
  //#endregion
}

// ^ display next up tasks
function displayNextUpTasks() {
  //#region
  const nextUpContainer = document.getElementById("nextUpContainer");
  const array = allArrays.nextUp.array;

  nextUpContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    nextUpContainer.innerHTML += createTaskCardElement(array, i);
  }
  //#endregion
}

// ^ display in progress tasks
function displayInProgressTasks() {
  //#region

  const inProgressContainer = document.getElementById("inProgressContainer");
  const array = allArrays.inProgress.array;

  inProgressContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    inProgressContainer.innerHTML += createTaskCardElement(array, i);
  }

  //#endregion
}

// ^ display done tasks
function displayDoneTasks() {
  //#region

  const doneContainer = document.getElementById("doneContainer");
  const array = allArrays.done.array;

  doneContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    doneContainer.innerHTML += createTaskCardElement(array, i);
  }

  //#endregion
}
// ^ display all tasks quantity
function displayTasksQuantity() {
  //#region
  cardsQuantity[0].innerHTML = allArrays.nextUp.array.length;
  cardsQuantity[1].innerHTML = allArrays.inProgress.array.length;
  cardsQuantity[2].innerHTML = allArrays.done.array.length;
  //#endregion
}

// ^ create task html depend on the task type
function createTaskCardElement(array, index) {
  //#region
  let cardColorClass;
  let taskOptions;
  let type;

  function createCopyButton(index, type, color = "bg-secondaryColor") {
    return `<button onclick="copyTask(${index},'${type}',this)" class="text-xl">
        <i class="link p-0 m-0 fa-regular fa-copy"></i>
        </button>
        <p id="copyFeedback" class="absolute animate-fadeOut opacity-0 hidden -bottom-[10px] left-1/2 -translate-x-1/2  ${color} py-[2px] px-2 rounded-lg border  border-primaryColor w-[80%] text-xs">Good luck with your tasks! 🚀💖</p>
`;
  }
  function createDeleteButton(index, type) {
    //#region
    return `
    <button id="deleteTask" onclick="deleteTask(${index},'${type}')" class="text-xl">
      <i class="link p-0 m-0 fa-regular fa-trash-can"></i>
    </button>
    `;
    //#endregion
  }

  function createArrowButton(index, type) {
    //#region
    let navigationFuntion;
    switch (type) {
      case allArrays.done.type:
        navigationFuntion = `moveToProgress(${index},'${type}')`;
        break;
      case allArrays.inProgress.type:
        navigationFuntion = `moveToNextUp(${index})`;
        break;
    }
    return `
    <button onclick="${navigationFuntion}" class="text-xl">
      <i class="link p-0 m-0 fa-solid fa-angles-left"></i>
    </button>`;
    //#endregion
  }

  switch (array[index].state) {
    case "nextUp":
      type = allArrays.nextUp.type;

      taskOptions = `
      <button onclick="editTask(${index})" class="text-xl">
        <i class="link p-0 m-0 fa-regular fa-pen-to-square"></i>
      </button>
      
      ${createCopyButton(index, type)}
      ${createDeleteButton(index, type)}      

      <button onclick="moveToProgress(${index},'${type}')" class="text-xl ms-auto">
        <div class="link p-0 m-0"> 🤝 </div>
      </button>
      `;
      break;

    case "inProgress":
      type = allArrays.inProgress.type;

      cardColorClass = "inprogressTask";

      taskOptions = `
      ${createArrowButton(index, type)}
      ${createCopyButton(index, type, "bg-yellow-200")}

      <button onclick="moveToDone(${index})" class="text-xl ms-auto">
        <div class="link p-0 m-0"> 💪 </div>
      </button>
      `;
      break;

    case "done":
      type = allArrays.done.type;

      cardColorClass = "doneTask";

      taskOptions = `
      ${createArrowButton(index, type)}
      ${createCopyButton(index, type, "bg-green-200")}
      ${createDeleteButton(index, type)}
      `;
      break;
  }

  const htmlCard = `
 <div class="task__card ${cardColorClass} relative">
                            <!-- #region task -->
                            <div class="grow relative">
                                <h3 id="taskTitle" class="task__title font-semibold capitalize">
                                    ${array[index].title}
                                </h3>
                                <p id="taskDescription" class="task__description text-sm tracking-wider capitalize">
                                    ${array[index].description}
                                </p>
                                <p id="taskCategory"
                                    class="capitalize category ${array[index].category}  bg-primaryColor text-white font-mono mt-2 rounded-lg tracking-widest w-fit text-xs px-2 py-1">
                                    ${array[index].category}
                                </p>
                            </div>
      <div class="flex flex-row md:flex-row gap-5 md:gap-2 justify-end md:justify-start">

                            ${taskOptions}
                            </div>

                            <!-- #endregion -->
                        </div>
`;

  return htmlCard;
  //#endregion
}

function copyTask(index, type, element) {
  //#region
  console.log(element.nextElementSibling);
  let task;
  switch (type) {
    case allArrays.nextUp.type:
      task = allArrays.nextUp.array[index];
      task.state = "next up";
      break;
    case allArrays.inProgress.type:
      task = allArrays.inProgress.array[index];
      task.state = "in progress";
      break;
    case allArrays.done.type:
      task = allArrays.done.array[index];
      task.state = "done";
      break;
  }

  const text = `
📋_${task.title}

📝_${task.description.trim()}

🔄_${task.state}

🗂️_${task.category}`;

  navigator.clipboard.writeText(text);

  element.nextElementSibling.classList.remove("hidden");

  setTimeout(function () {
    element.nextElementSibling.classList.add("hidden");
  }, 1000);
  //#endregion
}

function editTask(index) {
  //#region
  indexOftaskToBeUpdated = index;
  taskFormElement.querySelector("#formTitle").innerHTML = "update task";
  updateTaskButton.classList.remove("hidden");
  addNewTaskButton.classList.add("hidden");

  let task = allArrays.nextUp.array[index];

  taskCategoryInput.value = task.category;
  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;
  showTaskForm();
  //#endregion
}

function updateTask() {
  //#region
  let task = allArrays.nextUp.array[indexOftaskToBeUpdated];

  task.category = taskCategoryInput.value;
  task.title = taskTitleInput.value;
  task.description = taskDescriptionInput.value;

  taskFormElement.querySelector("#formTitle").innerHTML = "new task";
  updateTaskButton.classList.add("hidden");
  addNewTaskButton.classList.remove("hidden");

  hideTaskForm();
  updateApp();
  //#endregion
}

function addTask() {
  //#region

  if (
    taskStateInput.value == "" ||
    taskCategoryInput.value == "Select Category" ||
    taskTitleInput.value == "" ||
    taskDescriptionInput.value == ""
  ) {
    alert("🚫 Invalid task. Please check your input and try again.");
    return;
  }

  const task = {
    state: taskStateInput.value,
    category: taskCategoryInput.value,
    title: taskTitleInput.value,
    description: taskDescriptionInput.value,
  };
  switch (task.state) {
    case "nextUp":
      allArrays.nextUp.array.push(task);
      nextUpContainer.innerHTML += createTaskCardElement(
        allArrays.nextUp.array,
        allArrays.nextUp.array.length - 1
      );
      break;
    case "inProgress":
      allArrays.inProgress.array.push(task);
      inProgressContainer.innerHTML += createTaskCardElement(
        allArrays.inProgress.array,
        allArrays.inProgress.array.length - 1
      );
      break;
  }

  updateApp();
  clearTaskForm();
  hideTaskForm();

  //#endregion
}

function clearTaskForm() {
  taskStateInput.value = "nextUp";
  taskCategoryInput.value = "Select Category";
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
}
// ^ delete task depend on the task type
function deleteTask(index, type) {
  //#region
  switch (type) {
    case allArrays.nextUp.type:
      allArrays.nextUp.array.splice(index, 1);
      break;
    case allArrays.inProgress.type:
      allArrays.inProgress.array.splice(index, 1);
      break;
    case allArrays.done.type:
      allArrays.done.array.splice(index, 1);
      break;
  }
  updateApp();
  //#endregion
}

function moveToNextUp(index) {
  //#region
  allArrays.inProgress.array[index].state = "nextUp";
  allArrays.nextUp.array.push(allArrays.inProgress.array[index]);
  allArrays.inProgress.array.splice(index, 1);

  updateApp();
  //#endregion
}

function moveToProgress(index, type) {
  //#region
  switch (type) {
    case allArrays.done.type:
      allArrays.done.array[index].state = "inProgress";
      allArrays.inProgress.array.push(allArrays.done.array[index]);
      allArrays.done.array.splice(index, 1);
      break;
    case allArrays.nextUp.type:
      allArrays.nextUp.array[index].state = "inProgress";
      allArrays.inProgress.array.push(allArrays.nextUp.array[index]);
      allArrays.nextUp.array.splice(index, 1);
      break;
  }

  updateApp();
  //#endregion
}

function moveToDone(index) {
  //#region
  allArrays.inProgress.array[index].state = "done";
  allArrays.done.array.push(allArrays.inProgress.array[index]);
  allArrays.inProgress.array.splice(index, 1);

  updateApp();
  //#endregion
}
// !---------------
function validateInputs() {
  // const regex = /r'^[a-zA-Z0-9\s\-_.,!?]+$'/;
}

// ~ Events
showTaskFormButton.addEventListener("click", showTaskForm);

addNewTaskButton.addEventListener("click", addTask);
updateTaskButton.addEventListener("click", updateTask);
blackLayerElement.addEventListener("click", hideTaskForm);

document.addEventListener("keydown", function (event) {
  if (!taskFormElement.classList.contains("hidden") && event.key === "Escape")
    hideTaskForm();
});

settingButton.addEventListener("click", function () {
  console.log();
  if (
    nextUpContainer.innerHTML != "" ||
    inProgressContainer.innerHTML != "" ||
    doneContainer.innerHTML != ""
  ) {
    if (confirm("⚠️ **Alert**: All tasks will be deleted. Are you sure? ⚠️?")) {
      console.log("f");
      allArrays.nextUp.array = [];
      allArrays.inProgress.array = [];
      allArrays.done.array = [];
      updateApp();
    }
  } else {
    alert("There are no tasks to delete. Keep up the good work! 🌟");
  }
});
