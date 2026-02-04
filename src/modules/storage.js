import { getCurrentProject } from "../ui/events";
import { renderTasks } from "../ui/render";

// create module for adding item to local storage and fetching local storage
export function addToLocalStorage(task) {
    const ls = localStorage;

    // get current tasks in ls and if no tasks, then create new array
    const tasks = JSON.parse(ls.getItem("tasks")) || [];
    console.log("task:", task)
    console.log("tasks:", tasks)



    const index = tasks.findIndex(t => t.id === task.id);
    console.log(index)

  if (index === -1) {
    // New task
    tasks.push(task);
  } else {
    // Update existing task
    tasks[index] = task;
  }





    // stringify tasks array and store back in ls
    ls.setItem("tasks", JSON.stringify(tasks));

    console.log(JSON.parse(ls.getItem("tasks")))
}

// create function to get tasks from local storage
export function getTasksFromLocalStorage() {
    const ls = localStorage;
    const tasksInLocalStorage = JSON.parse(ls.getItem("tasks")) || []
    return tasksInLocalStorage;
}

// create function to remove item from local storage
export function removeItemFromLocalStorage(itemToBeRemovedID) {
    const ls = localStorage;
    
    console.log(`task: ${itemToBeRemovedID}`, "will be removed")

    const tasksInLocalStorage = getTasksFromLocalStorage();
    console.log(tasksInLocalStorage)

    // filter out the item.id === itemToBeRemovedID
    const resultingArray = tasksInLocalStorage.filter((task) => task.id !== itemToBeRemovedID)
    console.log(resultingArray)

    ls.setItem("tasks", JSON.stringify(resultingArray));

    renderTasks(getCurrentProject(), getTasksFromLocalStorage())
}
