import plusIcon from "../assets/icons/plus.svg"
import handleFormData from "../modules/todo";
import { closeModal, createModal, openModal } from "./modal";

export default function initAppEvents() {


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

                createModal();
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
        item.addEventListener("click", () => {

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
        })
    })

    // listener for cancel button
    document.addEventListener("click", (e) => {
        if (e.target.closest(".cancel")) {

            e.preventDefault();
            closeModal();
        }
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
