export { taskModule, projectModule };

const taskModule = (function() {

// constructors for tasks

    const Task = function(title, taskDescription, dueDate, priority, notes, completed) {
        this.title = title;
        this.taskDescription = taskDescription;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
    };

    const addNewTask = function(taskTitle, description, dueDate, priority, notes) {
        taskTitle = new Task(taskTitle, description, dueDate, priority, notes, false);
        return taskTitle
    };

    return {
        addNewTask
    }

})();

const projectModule = (function() {

    // project constructor
    // all new projects will be stored in the projects object
    // the object has an active property, which servers as an identificator for new tasks

    const NewProject = function(title) {
        this.title = title;
        this.taskArray = [];
        this.active = false;
    };

    const projects = {
        "All Projects": {
            title: "All Projects",
            taskArray: [],
            active: true
        },
    };

    const addNewProject = function(title) {
        projects[title] = new NewProject(title);
    };

    const getAllProjectTitles = function() {
        let allProjectTitles = [];

        for (const key in projects) {
            if (projects.hasOwnProperty(key)) {
                allProjectTitles.push(projects[key].title);
            }
        }

        return allProjectTitles;
    };

    const setActiveProject = function(target) {
        // first set the active attribute to false in all objects
        for (const key in projects) {
            projects[key]["active"] = false;
        }

        // then set the target object as active
        projects[target]["active"] = true;
    }

    const getActiveProject = function() {
        let activeProject = null;

        for (const key in projects) {
            if (projects[key]["active"] == true) {
                activeProject = projects[key];
            }
        };

        return activeProject;
    };

    return {
        projects,
        addNewProject,
        getAllProjectTitles,
        setActiveProject,
        getActiveProject
    }
})();