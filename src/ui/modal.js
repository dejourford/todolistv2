let modalOverlay;
let form;
import notepadImg from "../assets/icons/notepad.svg"
import trashcanImg from "../assets/icons/trashcan.svg"
import { getTasksFromLocalStorage } from "../modules/storage";


// create modal when add task clicked
export function createModal() {
    modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    form = document.createElement("form");
    form.classList.add("modal");

    modalOverlay.append(form);
    document.body.append(modalOverlay);

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    })

}


// create open modal function based on type
export function openModal(type, modalID) {
    form.innerHTML = "";

    if (type === "add-task") {
        form.id = "create-task";
        form.append(renderAddTask(modalID));
    }
    if (type === "add-project") {
        form.id = "create-project";
        form.append(renderAddProject());
    }
    if (type === "modify-task") {
        form.id = "modify-task";
        form.append(renderModifyTask());
    }

    modalOverlay.classList.add("open");
}

// create close modal function
export function closeModal() {
    modalOverlay.classList.remove("open");
    form.innerHTML = "";
}

// create render task function
function renderAddTask(modalID) {
    // get task that matches modalID
    const task = modalID ? getTasksFromLocalStorage().find((task) => task.id === modalID) : null;
    console.log(task)

    const container = document.createElement("div");
    container.classList.add("modify-task-button-group");
    container.dataset.id = modalID | "";

    // create name input group
    const nameContainer = document.createElement("div");
    nameContainer.classList.add("input-container");

    const nameInputTitle = document.createElement("label");
    nameInputTitle.classList.add("input-title");
    nameInputTitle.textContent = "Name";

    const nameInput = document.createElement("input");
    nameInput.classList.add("name-input")
    nameInput.name = "task-name";
    nameInput.placeholder = "Task Name";
    nameInput.required = true;
    nameInput.value = task?.["task-name"] || "";

    nameContainer.append(nameInputTitle, nameInput)

    // create description input group
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("input-container");

    const descriptionTitle = document.createElement("label");
    descriptionTitle.classList.add("input-title");
    descriptionTitle.textContent = "Description";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("description-input")
    descriptionInput.name = "task-description";
    descriptionInput.placeholder = "Description";
    descriptionInput.value = task?.["task-description"] || "";


    descriptionContainer.append(descriptionTitle, descriptionInput)

    // create date selector
    const dateInput = document.createElement("input");
    dateInput.classList.add("date-input")
    dateInput.name = "task-date"
    dateInput.type = "date";
    dateInput.value = task?.["task-date"] || "";
    dateInput.required = true;

    // create priority dropdown
    const priorityDropdown = document.createElement("select");
    priorityDropdown.id = "priority";
    priorityDropdown.name = "task-priority";

    ["Low", "Medium", "High"].forEach((level) => {
        const option = document.createElement("option")
        option.value = level
        option.textContent = level;
        priorityDropdown.append(option);


    })
    priorityDropdown.value = task?.["task-priority"] || "Medium";


    // create project selector
    const projectDropdown = document.createElement("select");
    projectDropdown.id = "project-dropdown";
    projectDropdown.name = "project"

    const projectValue = task?.project || "inbox";
  const projectOption = document.createElement("option");
  projectOption.value = projectValue;
  projectOption.textContent =
    projectValue === "inbox" ? "Inbox" : projectValue;
    
    projectDropdown.append(projectOption);

    // create action button group
    const actionButtonGroup = document.createElement("div");
    actionButtonGroup.classList.add("action-buttons");

    const submitButton = document.createElement("button");
    submitButton.classList.add("create-task")
    submitButton.classList.add("action-button")
    submitButton.type = "submit";
    submitButton.textContent = modalID ? "Update" : "Create Task";

    const cancelTaskButton = document.createElement("button");
    cancelTaskButton.type = "button";
    cancelTaskButton.classList.add("cancel")
    cancelTaskButton.classList.add("action-button")
    cancelTaskButton.textContent = "Cancel";

    actionButtonGroup.append(submitButton, cancelTaskButton)

    // assembly
    container.append(nameContainer, descriptionContainer, dateInput, priorityDropdown, projectDropdown, actionButtonGroup)

    return container;
}

export function renderModifyTask() {

    const container = document.createElement("div");
    container.classList.add("modify-task-button-group");

    // create button wrapper
    const modifyTaskButtonsWrapper = document.createElement("div");
    modifyTaskButtonsWrapper.classList.add("modify-tasks-button-wrapper");

    // create buttons
    const editButton = document.createElement("button");
    editButton.classList.add("edit-task-button", "modify-button")

    const editImage = document.createElement("img");
    editImage.src = notepadImg;

    const editText = document.createElement("p");
    editText.classList.add("edit-text");
    editText.textContent = "Edit";

    editButton.append(editImage, editText)

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button", "modify-button")

    const deleteImage = document.createElement("img")
    deleteImage.src = trashcanImg;

    const deleteText = document.createElement("p");
    deleteText.textContent = "Delete";

    deleteButton.append(deleteImage, deleteText)

    // assembly
    container.append(editButton, deleteButton);
    return container
}


