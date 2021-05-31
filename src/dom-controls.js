import { taskModule, projectModule, saveToLocalStorage } from "./create-task-project.js";

export { navbarMenu, setUpDOM, renderProjectContents }

const setUpDOM = (function() {

    const eventHandlerUnhideInputFields = function() { // add event listener to h2s to toggle the div visibility
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
    };
    
    const eventHandlerCreateNewProject = function() {
        let createProjectIcon = document.querySelector("#create-project");
        let inputProjectName = document.querySelector("#new-project");
        
        createProjectIcon.addEventListener('click', function() {
            projectModule.addNewProject(inputProjectName.value);
            saveToLocalStorage.setLocalStorage();
            navbarMenu.clearMenuItems();
            navbarMenu.createMenuItems();
            eventHandlerMenuListItems();
            eventHandlerMenuIcons();
        });

    };

    const eventHandlerMenuListItems = function() {
        const navbar = document.getElementById('navbar-project-list');
        let allNavbarProjectsListItems = navbar.getElementsByTagName('li');

        for (let i = 0; i < allNavbarProjectsListItems.length; i++) {
            allNavbarProjectsListItems[i].addEventListener('click', function(e) {
                if (projectModule.projects.hasOwnProperty(e.target.dataset.title)) {
                    projectModule.setActiveProject(e.target.dataset.title);
                    saveToLocalStorage.setLocalStorage();
                    navbarMenu.menuItemAddActiveClass();

                    renderProjectContents.renderSelectedProject();
                };
                
                
            })
        }
    };

    const eventHandlerViewAllTasks = function() {
        const allTasksButton = document.getElementById('h2-all-tasks');

        allTasksButton.addEventListener('click', function() {
            renderProjectContents.clearTargetContents();
            renderProjectContents.createHeader('All tasks');

            for (let project in projectModule.projects) {
                renderProjectContents.createTaskElements(projectModule.projects[project].taskArray);
            }

            setUpDOM.eventHandlerAddIconListeners();
        })
    }

    const eventHandlerMenuIcons = function() {
        const navbar = document.getElementById('navbar-project-list');
        let allNavbarProjectIcons = navbar.getElementsByTagName('i');
        
        for (let i = 0; i < allNavbarProjectIcons.length; i++) {
            allNavbarProjectIcons[i].addEventListener('click', function(e) {
                projectModule.removeProject(e.target.dataset.title);
                e.target.parentElement.remove();
                saveToLocalStorage.setLocalStorage();
            });
        }
    }

    const eventHandlerAddNewTask = function() {
        let addNewTask = document.getElementById('create-task');
        addNewTask.addEventListener('click', function() {
            createNewTaskForm.clearMainContents();
            createNewTaskForm.createFormElements();
        })
    };

    const runDynamicEventListeners = function() {

        eventHandlerCreateNewProject();
        eventHandlerMenuListItems();
        eventHandlerMenuIcons();
        eventHandlerAddNewTask();
        // eventHandlerAddIconListeners();
    }

    const eventHandlerAddIconListeners = function() {
        let allDeleteIcons = document.getElementsByClassName('fa-trash');
        
        for (let i = 0; i < allDeleteIcons.length; i++) {
            allDeleteIcons[i].addEventListener('click', function(e) {
                projectModule.removeTask(e.target.dataset.project, e.target.dataset.index);
                e.target.parentElement.parentElement.parentElement.remove();
                navbarMenu.clearMenuItems();
                navbarMenu.createMenuItems();
                eventHandlerMenuListItems();
                eventHandlerMenuIcons();
                saveToLocalStorage.setLocalStorage();
            });
        }

        let allCompleteIcons = document.getElementsByClassName('fa-check');

        for (let j = 0; j < allCompleteIcons.length; j++) {
            allCompleteIcons[j].addEventListener('click', function(e) {
                projectModule.toggleCompleted(e.target.dataset.project, e.target.dataset.index);
                if (e.target.parentElement.parentElement.parentElement.classList.contains('main-task-completed')) {
                    e.target.parentElement.parentElement.parentElement.classList.toggle('main-task-completed');
                }
                else {
                    e.target.parentElement.parentElement.parentElement.classList.add('main-task-completed');
                }
                saveToLocalStorage.setLocalStorage();
            })
        }

        let allPriorityButtons = document.getElementsByClassName('priority-button');

        for (let k = 0; k < allPriorityButtons.length; k++) {
            allPriorityButtons[k].addEventListener('click', function(e) {
                projectModule.changeTaskPriority(e.target.dataset.project, e.target.dataset.index);
                
                // get the parent div element, then all divs, then the field with the priority
                let parElement = e.target.parentElement.parentElement.parentElement;
                let allDivs = parElement.getElementsByTagName('div');
                let allFields = allDivs[3].getElementsByTagName('p');
                allFields[2].textContent = 'Priority: ' + projectModule.projects[e.target.dataset.project].taskArray[e.target.dataset.index].priority;

                saveToLocalStorage.setLocalStorage();
            });
        };
    }

    return {
        eventHandlerUnhideInputFields,
        eventHandlerCreateNewProject,
        eventHandlerMenuListItems,
        eventHandlerMenuIcons,
        eventHandlerAddNewTask,
        runDynamicEventListeners,
        eventHandlerAddIconListeners,
        eventHandlerViewAllTasks
    }
})();

const navbarMenu = (function() {
    const menu = document.getElementById("navbar-project-list");

    const clearMenuItems = function() {
        while (menu.firstChild) {
            menu.removeChild(menu.lastChild);
        }
    };

    const createMenuItems = function() { // creates navbar menu entries and adds a toggle to switch between active projects
        let navbarItems = projectModule.getAllProjectTitles();
        
        navbarItems.forEach(item => {
            let menuItem = document.createElement('li');
            menuItem.dataset.title = item;
            menuItem.classList.add('list-item')
                     
            let removeIcon = document.createElement('i');
            removeIcon.classList.add("fas"); removeIcon.classList.add("fa-times");
            removeIcon.classList.add("fa-2x"); removeIcon.classList.add("remove-icon");    
            removeIcon.dataset.title = item;        
            
            if (projectModule.projects[item].active == true) { // check if the project is active and add the active class if it is
                menuItem.classList.remove('list-item');
                menuItem.classList.add('active-project');
            }

            menuItem.textContent = `${item} (${projectModule.projects[item].taskArray.length})`;

            menuItem.appendChild(removeIcon);
            menu.appendChild(menuItem);
            
        });
    };

    const menuItemAddActiveClass = function() {
        const allNavbarListItems = menu.getElementsByTagName('li');
        for (let i = 0; i< allNavbarListItems.length; i++) {

            let currentItemTitle = allNavbarListItems[i].dataset.title;

            if (projectModule.projects[currentItemTitle].active == true) {
                allNavbarListItems[i].classList.add('active-project');
                allNavbarListItems[i].classList.remove('list-item');
            }

            else {
                allNavbarListItems[i].classList.remove('active-project');
                allNavbarListItems[i].classList.add('list-item');
            }
        }
    }
    
    return {
        clearMenuItems,
        createMenuItems,
        menuItemAddActiveClass
    }

})();

const createNewTaskForm = (function() {
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

    const getFormValues = function() { // cycle through the form fields and get the values 
        let sourceFields = ["Title", "Task description", "Due date", "Priority", "Notes"];
        let formValues = [];

        sourceFields.forEach(field => {
            let value = document.getElementById(field).value;
            formValues.push(value);
        });
            
        return formValues
    }

    const createNewTask = function() { // get values from the form and apply them to the constructor
        let sourceData = getFormValues();
        let newTask = taskModule.addNewTask(sourceData[0], sourceData[1], sourceData[2], sourceData[3], sourceData[4], false); // all new tasks have completed set to false

        let destinationActiveProject = projectModule.getActiveProject();
        if (destinationActiveProject == null) {
            alert("Select a project to add the task to");
            return;
        }
                
        destinationActiveProject.taskArray.push(newTask);
        saveToLocalStorage.setLocalStorage();
        navbarMenu.clearMenuItems();
        navbarMenu.createMenuItems();
        renderProjectContents.renderSelectedProject();
        setUpDOM.runDynamicEventListeners();
    };

    return {
        clearMainContents,
        createFormElements
    }
})();

const renderProjectContents = (function() {

    const targetWrapper = document.getElementById("task-wrapper");

    const clearTargetContents = function() {
        while (targetWrapper.firstChild) {
            targetWrapper.removeChild(targetWrapper.lastChild);
        };
    };

    const createHeader = function(headerText) {
        const contentHeader = document.createElement('h2'); // show the active project's title as header
        contentHeader.textContent = headerText;
        targetWrapper.appendChild(contentHeader);
    };

    const createTaskElements = function(sourceArray) {
        let index = 0; // this field is the Index of each task in the array

        sourceArray.forEach(task => {
            let taskCard = document.createElement('div');
            let taskCardHiddenPart = document.createElement('div');
            
            taskCard.classList.add('main-task');
            taskCardHiddenPart.classList.add('main-task-hidden');
            taskCardHiddenPart.id = task['title'] + index.toString();

            if (task.completed == true) { // completed tasks will get a class with different color background
                taskCard.classList.add("main-task-completed");
            }
            
            const taskFields = { // properties of tasks + titles corresponding to teach task
                title: "Title",
                taskDescription: "Task description",
                dueDate: "Due data",
                priority: "Priority",
                notes: "Notes"
            };

            // iterate over the object and create fields for each task
            let taskHeaderContainer = document.createElement('div');
            taskHeaderContainer.classList.add('main-task-header-container');

            for (let prop in taskFields) {
                let field = document.createElement('p');
                field.id = 'field' + task['title'] + prop + index;
                field.textContent = `${taskFields[prop]}: ${task[prop]}`;

                if (prop == "title") {
                    
                    let taskHeader = document.createElement('div');
                    field.dataset.index = index;
                    field.addEventListener('click', function(e) {
                        let targetID = task['title'] + e.target.dataset.index;
                        let targetDiv = document.getElementById(targetID);
                        targetDiv.classList.toggle('main-task-hidden');
                    });

                    field.classList.add('main-task-title');

                    taskHeader.appendChild(field);
                    taskHeaderContainer.appendChild(taskHeader);
                    taskCard.appendChild(taskHeaderContainer);
                }
                
                else {
                    taskCardHiddenPart.appendChild(field);
                }
            }; // end of the iteration in the object (to get titles for each DIV)

            let iconContainer = document.createElement('div');

            let deleteIcon = document.createElement('i');
            deleteIcon.dataset.index = index;
            deleteIcon.dataset.project = projectModule.getActiveProject().title;
            deleteIcon.classList.add('fas'); deleteIcon.classList.add('fa-trash');
            deleteIcon.classList.add('task-icon');
            iconContainer.appendChild(deleteIcon);

            let completeIcon = document.createElement('i');
            completeIcon.dataset.index = index;
            completeIcon.dataset.project = projectModule.getActiveProject().title;
            completeIcon.classList.add('fas'); completeIcon.classList.add('fa-check');
            completeIcon.classList.add('task-icon');
            iconContainer.appendChild(completeIcon);

            let priorityButton = document.createElement('button');
            priorityButton.dataset.index = index;
            priorityButton.dataset.project = projectModule.getActiveProject().title;
            priorityButton.classList.add('priority-button');
            priorityButton.textContent = 'Change Priority'
            iconContainer.appendChild(priorityButton);

            taskHeaderContainer.appendChild(iconContainer);
            taskCard.appendChild(taskCardHiddenPart);
            targetWrapper.appendChild(taskCard);

            index++;
        })
        
    }

    const renderSelectedProject = function() {
        let activeProject = projectModule.getActiveProject();
        clearTargetContents();
        createHeader(activeProject.title);
        createTaskElements(activeProject.taskArray);
        setUpDOM.eventHandlerAddIconListeners();
    }

    return {
        renderSelectedProject,
        createHeader,
        clearTargetContents,
        createTaskElements
    }
})();