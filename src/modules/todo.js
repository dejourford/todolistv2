// create function to handle form data on submit
import { getCurrentProject } from "../ui/events";
import { closeModal } from "../ui/modal";
import { renderTasks } from "../ui/render";
import { addToLocalStorage, getTasksFromLocalStorage } from "./storage";

export default function initFormEvents() {

    document.addEventListener("submit", (e) => {
        const form = e.target.closest("form");
        if (!form.matches("#create-task")) return

        e.preventDefault();

        const data = Object.fromEntries(new FormData(form).entries());

        // add id to object before adding to local storage
        data.id = `task-${crypto.randomUUID()}`;
        console.log(data)

        addToLocalStorage(data)

        closeModal();

        // call render function and pass through getCurrentProject() and getTasksFromLocalStorage()
        renderTasks(getCurrentProject(), getTasksFromLocalStorage())
    })
}


