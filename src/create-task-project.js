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

    const addNewTask = function(taskTitle, description, dueDate, priority, notes, completed) {
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
        allProjects: {
            title: "All projects",
            taskArray: [],
            active: true
        },
    };

    const addNewProject = function(title) {
        projects[title] = new NewProject(title);
        console.log(projects);
    };

    const getAllProjectTitles = function() {
        let allProjectTitles = [];

        for (const key in projects) {
            if (projects.hasOwnProperty(key)) {
                console.log(key);
                allProjectTitles.push(projects[key].title);
            }
        }

        return allProjectTitles;
    }

    return {
        projects,
        addNewProject,
        getAllProjectTitles
    }
})();