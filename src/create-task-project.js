export { taskModule, projectModule };

const taskModule = (function() {

// constructor for tasks + function to create one

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
    // the object has an active property - boolean, which servers as an identificator for new tasks

    const NewProject = function(title) {
        this.title = title;
        this.taskArray = [];
        this.active = false;
    };

    // main object in the entire project. Stores all projects as properties. Stores all tasks in properties' arrays

    const projects = {
        "All Projects": {
            title: "All Projects",
            taskArray: [],
            active: true
        },
    };

    const addNewProject = function(title) {
        if (projects.hasOwnProperty(title)) {
            alert("Project already exists.")
        }
        else {
            projects[title] = new NewProject(title);
        }
    };

    const getAllProjectTitles = function() { // returns an array with all project titles
        let allProjectTitles = [];

        for (const key in projects) {
            if (projects.hasOwnProperty(key)) {
                allProjectTitles.push(projects[key].title);
            }
        }

        return allProjectTitles;
    };

    const setActiveProject = function(target) { // change the active property of the selected project
        // first set the active attribute to false in all objects
        for (const key in projects) {
            projects[key]["active"] = false;
        }

        // then set the target object as active
        projects[target]["active"] = true;
    }

    const getActiveProject = function() { // loops through all projects and gets the one where active == true
        let activeProject = null;

        for (const key in projects) {
            if (projects[key]["active"] == true) {
                activeProject = projects[key];
            }
        };

        return activeProject;
    };

    const removeTask = function(projectName, taskIndex) {
        projects[projectName].taskArray.splice(taskIndex, 1);
    }

    const changeTaskPriority = function(projectName, index) {
        let currentPriority = projects[projectName].taskArray[index].priority;
        let pNumber;

        if (currentPriority == "Low") {
            pNumber = 1;
        }

        else if (currentPriority == "Medium") {
            pNumber = 2;
        }

        else {
            pNumber = 3;
        }

        let priorityLevel = {
            1: "Low",
            2: "Medium",
            3: "High"
        };
        pNumber++
        if (pNumber == 4) {
            pNumber = 1
        };

        projects[projectName].taskArray[index].priority = priorityLevel[pNumber];
    }

    const toggleCompleted = function(projectName, taskIndex) {
        if (projects[projectName].taskArray[taskIndex].completed == false) {
            projects[projectName].taskArray[taskIndex].completed = true;
        }
       else {
           projects[projectName].taskArray[taskIndex].completed = false;
        }
    }

    return {
        projects,
        addNewProject,
        getAllProjectTitles,
        setActiveProject,
        getActiveProject,
        removeTask,
        changeTaskPriority,
        toggleCompleted
    }
})();