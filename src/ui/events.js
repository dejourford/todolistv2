import plusIcon from "../assets/icons/plus.svg"
import { addToLocalStorage, getTasksFromLocalStorage, removeItemFromLocalStorage } from "../modules/storage";
import { closeModal, createModal, openModal, renderModifyTask } from "./modal";
import { renderTasks } from "./render";

export default function initAppEvents() {
    createModal();
    let modalId;

    // create function to show respective content when clicked
    function showTabContent(tabText, id) {

        const taskSection = document.querySelector(".task-section");
        taskSection.id = id;

        // remove previous tabText content
        taskSection.innerHTML = ""

        // create section title
        const taskSectionTitle = document.createElement("h2");
        taskSectionTitle.classList.add("task-title");
        taskSectionTitle.textContent = tabText;

        // create task wrapper
        const tasksWrapper = document.createElement("div");
        tasksWrapper.classList.add("tasks-wrapper");

        // create add task button
        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add("add-task-button");
        addTaskButton.dataset.modal = "add-task";

        // listener for add task button
        addTaskButton.addEventListener("click", (e) => {
            if (!document.querySelector(".modal-overlay")) {

                // createModal();
                console.log(e.currentTarget.dataset.modal)
            }
            openModal(e.currentTarget.dataset.modal)
        })


        const addTaskText = document.createElement("p");
        addTaskText.textContent = "Add Task";

        const plusIconElement = document.createElement("img");
        plusIconElement.classList.add("plus-icon")
        plusIconElement.src = plusIcon;

        // assembly
        addTaskButton.append(plusIconElement, addTaskText)

        // if tabText.toLowerCase() === "completed" then create a delete all button
        if (tabText.toLowerCase() === "completed") {
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Delete All";

            taskSection.append(taskSectionTitle, tasksWrapper, deleteButton);
        } else {

            taskSection.append(taskSectionTitle, tasksWrapper, addTaskButton)
        }
    }

    // listener for active navigation tab clicks
    document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", (e) => {

            if (e.target.closest("#addProject")) {
                console.log("project button clicked")
                openModal("add-project", )
                return
            };

            document.querySelectorAll(".nav-item").forEach((nav) => {
                nav.classList.remove("active");
                console.log("active class removed")
            })

            // add active class to clicked button
            item.classList.add("active");

            // show tab content
            const tabTextContent = item.textContent
            const tabId = item.id
            showTabContent(tabTextContent, tabId);
            renderTasks(getCurrentProject(), getTasksFromLocalStorage())
        })
    })

    // listener for cancel button
    document.addEventListener("click", (e) => {
        if (e.target.closest(".cancel")) {

            e.preventDefault();
            closeModal();
        }
    })

    // listener for checkbox
    document.addEventListener("change", (e) => {

        // target checkbox
        const taskCheckbox = e.target.closest(".task-checkbox");

        if (!taskCheckbox) return;

        if (taskCheckbox) {
            e.preventDefault()

            // clear DOM
            document.querySelector(".tasks-wrapper").innerHTML = ""
            

            console.log(taskCheckbox.checked);

            // modify the completed property of the checked element to true
            const taskIdToSetCompleted = e.target.parentNode.parentNode.dataset.id
            console.log(taskIdToSetCompleted)

            // filter the tasks in local storage data by the task that matches the id
            const taskToSetComplete = getTasksFromLocalStorage().find((task) => task.id === taskIdToSetCompleted)
            console.log(getTasksFromLocalStorage().find((task) => task.id === taskIdToSetCompleted))

            // change the completed property to true
            taskToSetComplete.complete = taskCheckbox.checked;

            // render task cards with the completed property set to true
            console.log(taskToSetComplete)

            // add item to local storage
            addToLocalStorage(taskToSetComplete)
            // closeModal()
            renderTasks(getCurrentProject(), getTasksFromLocalStorage())
        }

    })

    // listener for elipses dots
    document.addEventListener("click", (e) => {
        const dots = e.target.closest(".dots");
        if (!dots) return;

        console.log(dots.parentNode.parentNode.dataset.id);
        modalId = dots.parentNode.parentNode.dataset.id;

        // createModal();
        openModal("modify-task", modalId);
    });

    // listener for task edit button
    document.addEventListener("click", (e) => {
        // e.preventDefault();

        const editButton = e.target.closest(".edit-task-button");

        if (!editButton) return;

        // open add task modal prefilled with info
        modalId = editButton.parentNode.dataset.id;
        openModal("add-task", modalId)
    })


    // listener for delete task button
    document.addEventListener("click", (e) => {

        const deleteTaskButton = e.target.closest(".delete-task-button");
        console.log(deleteTaskButton)

        if (!deleteTaskButton) return;

        if (deleteTaskButton) {
            e.preventDefault()
            // remove item from local storage
            const itemToBeRemovedID = deleteTaskButton.parentNode.dataset.id
            console.log(itemToBeRemovedID)

            removeItemFromLocalStorage(itemToBeRemovedID)
            closeModal()
        }

    })

    // listener for delete all button
    document.addEventListener("click", (e) => {

        const deleteButton = e.target.closest(".delete-button");
        console.log(deleteButton)

        if (!deleteButton) return;

        e.preventDefault()
        // get tasks in storage and filter out the ones that have complete === true
        const allTasks = getTasksFromLocalStorage()
        console.log(allTasks)

        //    keep only incomplete tasks
        const remainingTasks = allTasks.filter(
            task => task.complete !== true
        )

        console.log(remainingTasks)
        localStorage.setItem("tasks", JSON.stringify(remainingTasks));

        renderTasks(getCurrentProject(), remainingTasks)


    })

    // listener for create project button
    document.addEventListener("click", (e) => {

        const createProjectButton = e.target.closest(".create-project-button");
        console.log(createProjectButton)

        if (!createProjectButton) return;

        e.preventDefault()
        


    })

}

// function for getting current project
export function getCurrentProject() {
    let currentProject;
    const tabs = document.querySelectorAll(".nav-item")
    tabs.forEach((tab) => {
        if (tab.classList.contains("active")) {
            currentProject = tab.id;
            console.log(currentProject)

        }

    })
    return currentProject
}
