const TASK_TEMPLATE = document.querySelector("#task-div");
const HR_TEMPLATE = document.querySelector("#hr-break");
const taskList = document.querySelector(".list");
const taskInput = document.querySelector("#task-input");

document.addEventListener("DOMContentLoaded", () => {
    const todoTitles = JSON.parse(localStorage.getItem("todoTitles")) || [];
    if (todoTitles) {
        todoTitles.forEach((title) => {
            addTask(title);
        });
    }
});

let submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", () => {
    let taskStr = taskInput.value;
    addTask(taskStr);
    const todoTitles = JSON.parse(localStorage.getItem("todoTitles")) || [];
    todoTitles.push(taskStr);
    localStorage.setItem("todoTitles", JSON.stringify(todoTitles));
});
taskInput.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        let taskStr = e.target.value;
        addTask(taskStr);
        const todoTitles = JSON.parse(localStorage.getItem("todoTitles")) || [];
        todoTitles.push(taskStr);
        localStorage.setItem("todoTitles", JSON.stringify(todoTitles));
    }
});
function getRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

function addTask(taskStr, isComplete = false) {
    let newTask = TASK_TEMPLATE.cloneNode(true);
    let newHr = HR_TEMPLATE.cloneNode(true);

    newTask.classList.remove("hidden");
    newHr.classList.remove("hidden");
    newTask.setAttribute("id", getRandomId());
    newHr.setAttribute("id", getRandomId());
    newTask.querySelector("img").addEventListener("click", () => {
        deleteTask(newTask);
    });

    newTask.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) {
            newTask.querySelector("h1").classList.add("line-through");
            newTask.querySelector("h1").classList.add("decoration-4");
        } else {
            newTask.querySelector("h1").classList.remove("line-through");
        }
    });
    if (taskStr.trim(" ") != "") {
        newTask.querySelector("h1").innerText = taskStr;
        if (taskList.firstChild) {
            if (taskList.firstChild.nodeName == "#text") {
                taskList.insertBefore(newTask, taskList.firstChild);
                taskInput.value = "";
                taskInput.focus();
            } else {
                taskList.insertBefore(newHr, taskList.firstChild);
                taskList.insertBefore(newTask, taskList.firstChild);
                taskInput.value = "";
                taskInput.focus();
            }
        } else {
            taskList.appendChild(newTask);
            taskInput.value = "";
            taskInput.focus();
        }
    }
}

function deleteTask(newTask) {
    const todoTitleToRemove = newTask.querySelector("h1").innerText;
    if (newTask.nextSibling) {
        newTask.nextSibling.remove();
        newTask.remove();
    } else if (newTask.previousSibling) {
        newTask.previousSibling.remove();
        newTask.remove();
    } else {
        newTask.remove();
    }
    let todoTitles = JSON.parse(localStorage.getItem("todoTitles")) || [];
    todoTitles = todoTitles.filter((title) => title !== todoTitleToRemove);
    localStorage.setItem("todoTitles", JSON.stringify(todoTitles));
}
