// create function to handle form data on submit
import { getCurrentProject } from "../ui/events";
import { closeModal } from "../ui/modal";
import { renderProjects, renderTasks } from "../ui/render";
import { addProjectToLocalStorage, addToLocalStorage, getProjectsFromLocalStorage, getTasksFromLocalStorage } from "./storage";

export default function initFormEvents() {

    document.addEventListener("submit", (e) => {
        const form = e.target.closest("form");
        if (!form.matches("#create-task")) return

        e.preventDefault();

        const data = Object.fromEntries(new FormData(form).entries());
        console.log(data)
        const taskId = form.dataset.id;

        const task = {
            ...data,
            id: taskId || `task-${crypto.randomUUID()}`,
            complete: false
        }


        console.log(data)

        addToLocalStorage(task)

        closeModal();

        // call render function and pass through getCurrentProject() and getTasksFromLocalStorage()
        renderTasks(getCurrentProject(), getTasksFromLocalStorage())
    })


    // listener for create project button
    document.addEventListener("click", (e) => {

        const createProjectButton = e.target.closest(".create-project-button");
        console.log(createProjectButton)

        if (!createProjectButton) return;

        e.preventDefault()

        console.log("project created")

        const form = createProjectButton.parentNode.parentNode.parentNode
        console.log(form)
        const data = Object.fromEntries(new FormData(form).entries());
        console.log(data)


        const project = {
            projectTitle: data["project-title"],
        }

        console.log(project)

        addProjectToLocalStorage(project)
        closeModal();
        renderProjects();
    })
}


