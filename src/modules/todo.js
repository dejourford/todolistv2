// create function to handle form data on submit
import { closeModal } from "../ui/modal";
import { addToLocalStorage } from "./storage";

export default function initFormEvents() {

    document.addEventListener("submit", (e) => {
        const form = e.target.closest("form");
        if (!form.matches("#create-task")) return

        e.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(new FormData(form).entries());
        console.log(data)

        addToLocalStorage(data)

        closeModal();
    })
}


