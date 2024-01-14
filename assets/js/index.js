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
const logoutButton = document.getElementById("logout");
//#endregion

//#region card buttons
//#endregion

// ~ Variables
let indexOftaskToBeUpdated;

const tasks = getDataFromLocalStorage("data") || {
  key: "data",
  nextUp: [],
  inProgress: [],
  done: [],
};

const containers = {
  nextUp: document.getElementById("nextUpContainer"),
  inProgress: document.getElementById("inProgressContainer"),
  done: document.getElementById("doneContainer"),
};

const counters = {
  nextUp: document.querySelectorAll(".cards__quantity")[0],
  inProgress: document.querySelectorAll(".cards__quantity")[1],
  done: document.querySelectorAll(".cards__quantity")[2],
};

const updateApp = () => {
  welcome.innerHTML = localStorage.getItem("username").split(" ")[0];
  setToLocalStorage();
  displayNextUpTasks();
  displayInProgressTasks();
  displayDoneTasks();
  hideTaskForm();
  searchInput.value = "";
};

// ~ Functions

updateApp();

function searchFunction() {
  //#region
  var term = searchInput.value;

  var htmlContent = "";

  // * reset counter evey function calling
  counters.nextUp.innerHTML = 0;
  counters.inProgress.innerHTML = 0;
  counters.done.innerHTML = 0;

  for (var i = 0; i < tasks.nextUp.length; i++) {
    if (
      tasks.nextUp[i].title.toLowerCase().includes(term.toLowerCase()) ||
      tasks.nextUp[i].category.toLowerCase().includes(term.toLowerCase())
    ) {
      htmlContent += createTaskCardElement(tasks.nextUp, i);
      counters.nextUp.innerHTML = +counters.nextUp.innerHTML + 1;
    }
  }
  containers.nextUp.innerHTML = htmlContent;

  htmlContent = "";
  for (var i = 0; i < tasks.inProgress.length; i++) {
    if (
      tasks.inProgress[i].title.toLowerCase().includes(term.toLowerCase()) ||
      tasks.nextUp[i].category.toLowerCase().includes(term.toLowerCase())
    ) {
      htmlContent += createTaskCardElement(tasks.inProgress, i);
      counters.inProgress.innerHTML = +counters.inProgress.innerHTML + 1;
    }
  }
  containers.inProgress.innerHTML = htmlContent;

  htmlContent = "";
  for (var i = 0; i < tasks.done.length; i++) {
    if (
      tasks.done[i].title.toLowerCase().includes(term.toLowerCase()) ||
      tasks.nextUp[i].category.toLowerCase().includes(term.toLowerCase())
    ) {
      htmlContent += createTaskCardElement(tasks.done, i);
      counters.done.innerHTML = +counters.done.innerHTML + 1;
    }
  }
  containers.done.innerHTML = htmlContent;
  //#endregion
}

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
  resetTaskForm();
  //#endregion
}

// ^ set data to local storage
function setToLocalStorage() {
  //#region
  localStorage.setItem(tasks.key, JSON.stringify(tasks));
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

  const array = tasks.nextUp;
  containers.nextUp.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    containers.nextUp.innerHTML += createTaskCardElement(array, i);
  }
  counters.nextUp.innerHTML = tasks.nextUp.length;

  //#endregion
}

// ^ display in progress tasks
function displayInProgressTasks() {
  //#region

  const array = tasks.inProgress;
  containers.inProgress.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    containers.inProgress.innerHTML += createTaskCardElement(array, i);
  }
  counters.inProgress.innerHTML = tasks.inProgress.length;

  //#endregion
}

// ^ display done tasks
function displayDoneTasks() {
  //#region

  const array = tasks.done;

  containers.done.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    containers.done.innerHTML += createTaskCardElement(array, i);
  }
  counters.done.innerHTML = tasks.done.length;

  //#endregion
}

// ^ create task html depend on the task type
function createTaskCardElement(array, index) {
  //#region
  let cardColorClass;
  let taskOptions;

  function createCopyButton(index, state, color = "bg-secondaryColor") {
    return `<button onclick="copyTask(${index},'${state}',this)" class="text-xl">
        <i class="link p-0 m-0 fa-regular fa-copy"></i>
        </button>
        <p id="copyFeedback" class="absolute animate-fadeOut opacity-0 hidden -bottom-[10px] left-1/2 -translate-x-1/2  ${color} py-[2px] px-2 rounded-lg border  border-primaryColor w-[80%] text-xs">Good luck with your tasks! 🚀💖</p>
`;
  }
  function createDeleteButton(index, state) {
    //#region
    return `
    <button id="deleteTask" onclick="deleteTask(${index},'${state}')" class="text-xl">
      <i class="link p-0 m-0 fa-regular fa-trash-can"></i>
    </button>
    `;
    //#endregion
  }

  function createArrowButton(index, state) {
    //#region
    let navigationFuntion;
    switch (state) {
      case Object.keys(tasks)[3]:
        navigationFuntion = `moveToProgress(${index},'${array[index].state}')`;
        break;
      case Object.keys(tasks)[2]:
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
    case Object.keys(tasks)[1]:
      taskOptions = `
      <button onclick="editTask(${index})" class="text-xl">
        <i class="link p-0 m-0 fa-regular fa-pen-to-square"></i>
      </button>
      
      ${createCopyButton(index, array[index].state)}
      ${createDeleteButton(index, array[index].state)}      

      <button onclick="moveToProgress(${index},'${
        array[index].state
      }')" class="text-xl ms-auto">
        <div class="link p-0 m-0"> 🤝 </div>
      </button>
      `;
      break;

    case Object.keys(tasks)[2]:
      cardColorClass = "inprogressTask";

      taskOptions = `
      ${createArrowButton(index, array[index].state)}
      ${createCopyButton(index, array[index].state, "bg-yellow-200")}

      <button onclick="moveToDone(${index})" class="text-xl ms-auto">
        <div class="link p-0 m-0"> 💪 </div>
      </button>
      `;
      break;

    case Object.keys(tasks)[3]:
      cardColorClass = "doneTask";

      taskOptions = `
      ${createArrowButton(index, array[index].state)}
      ${createCopyButton(index, array[index].state, "bg-green-200")}
      ${createDeleteButton(index, array[index].state)}
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
      <div class="flex flex-row md:flex-row gap-5 md:gap-2 justify-start">

                            ${taskOptions}
                            </div>

                            <!-- #endregion -->
                        </div>
`;
  return htmlCard;
  //#endregion
}

function copyTask(index, state, element) {
  //#region
  let task = tasks[state][index];
  // switch (type) {
  //   case tasks.nextUp.type:
  //     task = tasks.nextUp.array[index];
  //     task.state = "next up";
  //     break;
  //   case tasks.inProgress.type:
  //     task = tasks.inProgress.array[index];
  //     task.state = "in progress";
  //     break;
  //   case tasks.done.type:
  //     task = tasks.done.array[index];
  //     task.state = "done";
  //     break;
  // }

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

  let task = tasks.nextUp[index];

  taskCategoryInput.value = task.category;
  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;
  showTaskForm();
  //#endregion
}

function updateTask() {
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

  let task = tasks.nextUp[indexOftaskToBeUpdated];

  task.category = taskCategoryInput.value;
  task.title = taskTitleInput.value;
  task.description = taskDescriptionInput.value;

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
  // switch (task.state) {
  //   case "nextUp":
  //     tasks.nextUp.array.push(task);
  //     containers.nextUp.innerHTML += createTaskCardElement(
  //       tasks.nextUp.array,
  //       tasks.nextUp.array.length - 1
  //     );
  //     break;
  //   case "inProgress":
  //     tasks.inProgress.array.push(task);
  //     containers.inProgress.innerHTML += createTaskCardElement(
  //       tasks.inProgress.array,
  //       tasks.inProgress.array.length - 1
  //     );
  //     break;
  // }

  tasks[task.state].push(task);

  containers[task.state].innerHTML += createTaskCardElement(
    tasks[task.state],
    tasks[task.state].length - 1
  );

  updateApp();

  //#endregion
}

function resetTaskForm() {
  //#region
  taskStateInput.value = "nextUp";
  taskCategoryInput.value = "Select Category";
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";

  taskFormElement.querySelector("#formTitle").innerHTML = "new task";
  updateTaskButton.classList.add("hidden");
  addNewTaskButton.classList.remove("hidden");
  //#endregion
}

// ^ delete task depend on the task type
function deleteTask(index, state) {
  //#region
  // switch (type) {
  //   case tasks.nextUp.type:
  //     tasks.nextUp.array.splice(index, 1);
  //     break;
  //   case tasks.inProgress.type:
  //     tasks.inProgress.array.splice(index, 1);
  //     break;
  //   case tasks.done.type:
  //     tasks.done.array.splice(index, 1);
  //     break;
  // }

  tasks[state].splice(index, 1);
  updateApp();
  //#endregion
}

function moveToNextUp(index) {
  //#region
  tasks.inProgress[index].state = "nextUp";
  tasks.nextUp.push(tasks.inProgress[index]);
  tasks.inProgress.splice(index, 1);

  updateApp();
  //#endregion
}

function moveToProgress(index, state) {
  //#region
  // switch (type) {
  //   case tasks.done.type:
  //     tasks.done.array[index].state = "inProgress";
  //     tasks.inProgress.array.push(tasks.done.array[index]);
  //     tasks.done.array.splice(index, 1);
  //     break;
  //   case tasks.nextUp.type:
  //     tasks.nextUp.array[index].state = "inProgress";
  //     tasks.inProgress.array.push(tasks.nextUp.array[index]);
  //     tasks.nextUp.array.splice(index, 1);
  //     break;
  // }
  tasks[state][index].state = "inProgress";
  tasks.inProgress.push(tasks[state][index]);
  tasks[state].splice(index, 1);
  updateApp();
  //#endregion
}

function moveToDone(index) {
  //#region
  tasks.inProgress[index].state = "done";
  tasks.done.push(tasks.inProgress[index]);
  tasks.inProgress.splice(index, 1);

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
  if (!taskFormElement.classList.contains("hidden") && event.key === "Enter") {
    updateTaskButton.classList.contains("hidden") ? addTask() : updateTask();
  }
});
document.addEventListener("keydown", function (event) {
  if (!taskFormElement.classList.contains("hidden") && event.key === "Escape") {
    updateApp();
  }
});

settingButton.addEventListener("click", function () {
  //#region
  if (
    containers.nextUp.innerHTML != "" ||
    containers.inProgress.innerHTML != "" ||
    containers.done.innerHTML != ""
  ) {
    if (confirm("⚠️ **Alert**: All tasks will be deleted. Are you sure? ⚠️?")) {
      tasks.nextUp = [];
      tasks.inProgress = [];
      tasks.done = [];
      updateApp();
    }
  } else {
    alert("There are no tasks to delete. Keep up the good work! 🌟");
  }
  //#endregion
});

searchInput.addEventListener("input", searchFunction);
logoutButton.addEventListener("click", function () {
  localStorage.setItem("logged", false);
  localStorage.setItem("username", null);

  window.location.reload();
});
