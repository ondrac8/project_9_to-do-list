import { taskModule, projectModule } from './create-task-project.js';
import { setUpDOM, refreshNavbar, renderProjectContents } from './dom-manipulation.js';


function init() {
    setUpDOM();
    refreshNavbar();
    renderProjectContents();
}

init();