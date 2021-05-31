import { taskModule, projectModule, saveToLocalStorage } from './create-task-project.js';
import { init, navbarMenu, setUpDOM, renderProjectContents } from './dom-controls.js';


window.onload = function() {
    if (localStorage.length > 0) {
        saveToLocalStorage.getLocalStorage();

    };

    navbarMenu.clearMenuItems();
    navbarMenu.createMenuItems();
    setUpDOM.eventHandlerMenuListItems();
    setUpDOM.eventHandlerUnhideInputFields();
    setUpDOM.eventHandlerMenuIcons();
    setUpDOM.eventHandlerViewAllTasks();
    setUpDOM.eventHandlerCreateNewProject();
    setUpDOM.runDynamicEventListeners();
};


projectModule.setActiveProject('My Project');
renderProjectContents.renderSelectedProject();