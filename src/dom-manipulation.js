import { taskModule, projectModule } from "./create-task-project.js";

export { setUpDOM, refreshNavbar, renderProjectContents }

// set up DOM adds functions to the buttons:
// create new task
// create new project

const setUpDOM = function() {

    let createNewTask = function() {
        
        let createTaskButton = document.querySelector("#create-task"); // get the title of the new task and append it to all projects object

        createTaskButton.addEventListener('click', function() {
            let newTaskTitle = document.querySelector("#new-task").value;
            let newTask = taskModule.addNewTask(newTaskTitle, "description", "dueDate", "priority", "notes"); // all new tasks have completed set to false

            let destinationActiveProject = projectModule.getActiveProject(); // get active project from the projects object. push the new task 
            destinationActiveProject.taskArray.push(newTask);
            renderProjectContents();
        });
    };

    let createNewProject = function() {
        let createProjectButton = document.querySelector("#create-project");
        let inputProjectName = document.querySelector("#new-project");
        
        createProjectButton.addEventListener('click', function() {
            projectModule.addNewProject(inputProjectName.value);
            refreshNavbar();
        });
    }
   
    createNewTask();
    createNewProject();
};

 // this function will get all the project titles and create menu entries for each title

const refreshNavbar = function() {

    let menu = document.getElementById("navbar-project-list");

    function clearMenuItems() {
        while (menu.firstChild) {
            menu.removeChild(menu.lastChild);
        }
    }

    function createMenuItems() { // creates navbar menu entries and adds a toggle to switch between active projects
        let navbarItems = projectModule.getAllProjectTitles();

        navbarItems.forEach(item => {
            let menuItem = document.createElement('li');
            menuItem.dataset.title = item;
            menuItem.innerHTML = item;
            menuItem.addEventListener('click', function(event) {
                projectModule.setActiveProject(event.target.dataset.title);
                renderProjectContents();
            })
            menu.appendChild(menuItem);
        });
    };
    
    clearMenuItems();
    createMenuItems();
}

// render contents of the active project on the page
// this function runs after each click on create new task
// it should also be ran every time a different project is selected

const renderProjectContents = function() {
    const targetWrapper = document.getElementById("task-wrapper");

    const clearTargetContents = function() {
        while (targetWrapper.firstChild) {
            targetWrapper.removeChild(targetWrapper.lastChild);
        };
    };

    const createTargetContents = function() {
        let activeProject = projectModule.getActiveProject();

        activeProject.taskArray.forEach(task => {
            console.log(task);
            let taskWrapper = document.createElement('div');
            let title = document.createElement('p');
            title.textContent = task["title"];

            taskWrapper.appendChild(title);

            targetWrapper.appendChild(taskWrapper);
        })
    }

    clearTargetContents();
    createTargetContents();
}