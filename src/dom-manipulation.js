import { taskModule } from "./create-task-project.js";

export { setUpDOM }

// this module changes the content of the webpage
const setUpDOM = function() {
    let createNewTask = function() {
        
        let createTaskButton = document.querySelector("#create-task");
        createTaskButton.addEventListener('click', function() {
            let newTask = taskModule.addNewTask("new task", "description", "dueDate", "priority", "notes"); // all new tasks have completed set to false
            console.log(newTask)
        })
    }

    createNewTask();
};