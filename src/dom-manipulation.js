import { taskModule, projectModule } from "./create-task-project.js";

export { setUpDOM, refreshNavbar, renderProjectContents }

// set up DOM adds functions to the buttons:
// create new task => triggers the renderProjectContents function show the newly created task
// create new project
// 

const setUpDOM = function() {

    let createNewTask = function() {
        
        let createTaskButton = document.querySelector("#create-task"); // get the title of the new task and append it to all projects object

        createTaskButton.addEventListener('click', function() {
            let newTaskTitle = document.querySelector("#new-task").value;
            let newTask = taskModule.addNewTask(newTaskTitle, "description", "dueDate", "priority", "notes"); // all new tasks have completed set to false

            let destinationActiveProject = projectModule.getActiveProject(); // get active project from the projects object. push the new task 
            destinationActiveProject.taskArray.push(newTask);
            refreshNavbar();
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

    let h2AddListeners = function() { // add event listener to create new h2s in the menu to toggle the div visibility
        let h2CreateNewTask = document.querySelector("#h2-create-new-task");
        let h2CreateNewProject = document.querySelector("#h2-create-new-project");

        let unhideNewTaskDiv = document.querySelector("#unhide-new-task-div");
        let unhideNewProjectDiv = document.querySelector("#unhide-new-project-div");

        h2CreateNewTask.addEventListener('click', function(e) {
            unhideNewTaskDiv.classList.toggle('create-new-div-hidden');
        });

        h2CreateNewProject.addEventListener('click', function(e) {
            unhideNewProjectDiv.classList.toggle('create-new-div-hidden');
        });
    }
   
    h2AddListeners();
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
            menuItem.classList.add('list-item')
            
            if (projectModule.projects[item].active == true) { // check if the project is active and add the active class if it is
                menuItem.classList.remove('list-item');
                menuItem.classList.add('active-project');
            }

            menuItem.textContent = `${item} (${projectModule.projects[item].taskArray.length})`;
            menuItem.addEventListener('click', function(event) { // when you click an item in the menu it sets it as active and renders content of the active project
                projectModule.setActiveProject(event.target.dataset.title);
                renderProjectContents();
            });

            menuItem.addEventListener('click', function(e) {
                refreshNavbar();
            });
            
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

    const createTargetContents = function() {  // render contents of each task / object inside of the task array
        let activeProject = projectModule.getActiveProject();
        let i = 0;

        const contentHeader = document.createElement('h2');
        contentHeader.textContent = activeProject.title;
        targetWrapper.appendChild(contentHeader);

        activeProject.taskArray.forEach(task => {
            let taskWrapper = document.createElement('div');
            taskWrapper.classList.add('main-task');
            let title = document.createElement('p');
            title.textContent = task["title"];

            let removeTaskButton = document.createElement('button');    // button to remove the task from the array
            removeTaskButton.textContent = "Delete task";
            removeTaskButton.dataset.taskIndex = i;
            i++;
            removeTaskButton.dataset.projectTitle = activeProject.title;
            removeTaskButton.addEventListener('click', function(event) {
                projectModule.removeTask(event.target.dataset.projectTitle, event.target.dataset.taskIndex);
                clearTargetContents();
                createTargetContents();
            })
            

            taskWrapper.appendChild(title);
            taskWrapper.appendChild(removeTaskButton);

            targetWrapper.appendChild(taskWrapper);
        })
    }

    clearTargetContents();
    createTargetContents();
}