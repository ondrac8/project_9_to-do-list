import { taskModule, projectModule } from "./create-task-project.js";

export { setUpDOM, refreshNavbar, renderProjectContents }

// set up DOM adds functions to the buttons:
// create new task => triggers the renderProjectContents function show the newly created task
// create new project

const setUpDOM = function() {

    let newTaskListener = function() { // adds a listener to the new task button - this brings up a form
        let createTaskButton = document.querySelector("#create-task");
        createTaskButton.addEventListener('click', createNewTaskForm);
    };

    let createNewProject = function() { // adds a listener to the new project button
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
    newTaskListener();
    createNewProject();

};

// this will clear the main section and append a form to it to create new tasks
const createNewTaskForm = function() {
    const taskDiv = document.querySelector("#task-wrapper");

    const clearMainContents = function() {
        while (taskDiv.firstChild) {
            taskDiv.removeChild(taskDiv.lastChild);
        }
    };

    const createFormElements = function() { // when the user clicks the plus button next to new task, the right side of the screen will change to the form
        // title
        let popUpH2 = document.createElement("h2");
        popUpH2.textContent = "Create new task"
        taskDiv.appendChild(popUpH2);
        
        let popUp = document.createElement('div');
        popUp.classList.add('task-pop-up');
        
        let form = document.createElement('form');
        popUp.appendChild(form);

        const taskProperties = ["Title", "Task description", "Due date", "Priority", "Notes"]; // create the fields from the array (all free text + 1 dropdown)
        taskProperties.forEach(item => {
            if (item != "Priority") {
                let label = document.createElement('label');
                label.htmlFor = item;
                label.textContent = item;
    
                let input = document.createElement('input');
                input.name = item;
                input.id = item;
                form.appendChild(label);
                form.appendChild(input);
            }

            else {
                let optList = ["Low", "Medium", "High"];
                let label = document.createElement('label');
                label.htmlFor = item;
                label.textContent = item;

                let combo = document.createElement('select');
                combo.id = item;
                optList.forEach(opt => {
                    let comboOption = document.createElement('option');
                    comboOption.value = opt;
                    comboOption.textContent = opt;
                    combo.appendChild(comboOption);
                })
                form.appendChild(label);
                form.appendChild(combo);
            }

        });

        const createButton = document.createElement('button');
        createButton.addEventListener('click', createNewTask);
        createButton.textContent = "Create new task";
        popUp.appendChild(createButton);

        taskDiv.appendChild(popUp);
        document.querySelector("#Title").value = document.querySelector("#new-task").value; // transfer the text from the new task field to the form
    };

    let getFormValues = function() { // cycle through the form fields and get the values 
        let sourceFields = ["Title", "Task description", "Due date", "Priority", "Notes"];
        let formValues = [];

        sourceFields.forEach(field => {
            let value = document.getElementById(field).value;
            formValues.push(value);
        })
            


        return formValues
    }

    let createNewTask = function() { // get values from the form and apply them to the constructor
        let sourceData = getFormValues();
        let newTask = taskModule.addNewTask(sourceData[0], sourceData[1], sourceData[2], sourceData[3], sourceData[4], false); // all new tasks have completed set to false

        let destinationActiveProject = projectModule.getActiveProject(); // get active project from the projects object. push the new task to it
        destinationActiveProject.taskArray.push(newTask);
        refreshNavbar();
        renderProjectContents();
    };

    clearMainContents();
    createFormElements();
}

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
        const activeProject = projectModule.getActiveProject();
        let i = 0;

        const contentHeader = document.createElement('h2'); // show the active project's title as header
        contentHeader.textContent = activeProject.title;
        targetWrapper.appendChild(contentHeader);

        const taskHolder = document.createElement('div'); // this div holds all tasks cards, displays them in a grid
        taskHolder.classList.add('main-task-holder');

        activeProject.taskArray.forEach(task => {
            let taskWrapper = document.createElement('div'); // task card
            taskWrapper.classList.add('main-task');

            if (task.completed == true) { // completed tasks will get a class with different color background
                taskWrapper.classList.add("main-task-completed");
            }
            
            const taskData = ["title", "taskDescription", "dueDate", "priority", "notes"]; // properties of task
            const fieldTitles = ["Title", "Task description", "Due date", "Priority", "Notes"] // titles corresponding to teach task
            
            let j = 0;
            taskData.forEach(item => {    
                let field = document.createElement('p');
                field.textContent = `${fieldTitles[j]}: ${task[item]}`;
                taskWrapper.appendChild(field);
                j++;
            });

            let removeTaskButton = document.createElement('button');    // button to remove the task from the array
            removeTaskButton.textContent = "Delete task";
            removeTaskButton.dataset.taskIndex = i;

            removeTaskButton.dataset.projectTitle = activeProject.title; // event listener for the button
            removeTaskButton.addEventListener('click', function(event) {
                projectModule.removeTask(event.target.dataset.projectTitle, event.target.dataset.taskIndex);
                clearTargetContents();
                createTargetContents();
                refreshNavbar();
            })

            let changePriorityButton = document.createElement('button');    // button to change the priority of the task
            changePriorityButton.textContent = "Change priority";
            changePriorityButton.dataset.index = i;
            changePriorityButton.dataset.projectTitle = activeProject.title;
            changePriorityButton.addEventListener('click', function(e) {
                projectModule.changeTaskPriority(e.target.dataset.projectTitle, e.target.dataset.index);
                clearTargetContents();
                createTargetContents();
            })
            
            let markCompleteButton = document.createElement('button');    // button to change the priority of the task
            if (task.completed == true) {
                markCompleteButton.textContent = "Completed";
            }

            else {
                markCompleteButton.textContent = "Mark complete";
            }

            markCompleteButton.dataset.index = i;
            markCompleteButton.dataset.projectTitle = activeProject.title;
            markCompleteButton.addEventListener('click', function(eventTarget) {
                projectModule.toggleCompleted(eventTarget.target.dataset.projectTitle, eventTarget.target.dataset.index);
                if (task.completed == true) {
                    markCompleteButton.textContent = "Completed";
                }

                else {
                    markCompleteButton.textContent = "Mark complete";
                }
                clearTargetContents();
                createTargetContents();
            })

            // add hte buttons to the task card
            taskWrapper.appendChild(removeTaskButton);
            taskWrapper.appendChild(changePriorityButton);
            taskWrapper.appendChild(markCompleteButton);

            taskHolder.appendChild(taskWrapper);
            targetWrapper.appendChild(taskHolder);
            i++;
        })
    }

    clearTargetContents();
    createTargetContents();
}