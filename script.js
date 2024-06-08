const TASK_TEMPLATE = document.querySelector("#task-div");
const HR_TEMPLATE = document.querySelector("#hr-break");

let submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", (e) => {
    let newTask = TASK_TEMPLATE.cloneNode(true);
    let newHr = HR_TEMPLATE.cloneNode(true);
    console.log(newTask);
    console.log(newHr);
});
