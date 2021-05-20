import { taskModule, projectModule, saveToLocalStorage } from './create-task-project.js';
import { setUpDOM, refreshNavbar, renderProjectContents } from './dom-manipulation.js';

window.onload = function() {
    if (localStorage.length > 0) {
        saveToLocalStorage.getLocalStorage();
        renderProjectContents();
        refreshNavbar();
    };
};

function init() {
    setUpDOM();
    refreshNavbar();
    renderProjectContents();
}

init();