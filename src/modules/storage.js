// create module for adding item to local storage and fetching local storage
export function addToLocalStorage(task) {
    const ls = localStorage;

    // get current tasks in ls and if no tasks, then create new array
    const tasks =  JSON.parse(ls.getItem("tasks")) || [];
    console.log(tasks)

    // push new task to tasks array
    tasks.push(task);

    // stringify tasks array and store back in ls
    ls.setItem("tasks", JSON.stringify(tasks));

    console.log(JSON.parse(ls.getItem("tasks")))
}

// create function to get tasks from local storage
export function getTasksFromLocalStorage() {
    const ls = localStorage;
    const tasksInLocalStorage = JSON.parse(ls.getItem("tasks"))
    return tasksInLocalStorage;
}
