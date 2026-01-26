let modalOverlay;
let form;

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
export function openModal(type) {
    form.innerHTML = "";

    if (type === "add-task") form.append(renderAddTask());
    if (type === "add-project") form.append(renderAddProject());

    modalOverlay.classList.add("open");
}

// create close modal function
export function closeModal() {
    modalOverlay.classList.remove("open");
    form.innerHTML = "";
}

// create render task function
function renderAddTask() {
    const container = document.querySelector(".modal");

    // create name input group
    const nameContainer = document.createElement("div");
    nameContainer.classList.add("input-container");

    const nameInputTitle = document.createElement("label");
    nameInputTitle.classList.add("input-title");
    nameInputTitle.textContent = "Name";

    const nameInput = document.createElement("input");
    nameInput.classList.add("name-input")
    nameInput.placeholder = "Task Name";
    nameInput.required = true;

    // create description input group
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("input-container");

    const descriptionTitle = document.createElement("label");
    descriptionTitle.classList.add("input-title");
    descriptionTitle.textContent = "Description";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("description-input")
    descriptionInput.placeholder = "Description";
    
    // create date selector
    const dateInput = document.createElement("input");
    dateInput.classList.add("date-input")
    dateInput.type = "date";
    dateInput.required = true;

    // create priority dropdown
    const priorityDropdown = document.createElement("select");
    priorityDropdown.id = "priority";

    ["Low", "Medium", "High"].forEach((level) => {
        const option = document.createElement("option")
        option.value = level.toLowerCase();
        option.textContent = level;
        priorityDropdown.append(option);
    })
    
    // create project selector
    const projectDropdown = document.createElement("select");
    projectDropdown.id = "project-dropdown";
    const projectOption = document.createElement("option");
    projectOption.value = "inbox";
    projectOption.textContent = "Inbox";

    // create action button group
    const actionButtonGroup = document.createElement("div");
    actionButtonGroup.classList.add("action-buttons");
    
    const createTaskButton = document.createElement("button");
    createTaskButton.classList.add("action-button")
    createTaskButton.type = "submit";
    createTaskButton.textContent = "Create Task";

    const cancelTaskButton = document.createElement("button");
    cancelTaskButton.type = "button";
    cancelTaskButton.classList.add("cancel")
    cancelTaskButton.classList.add("action-button")
    cancelTaskButton.textContent = "Cancel";

    // assembly
    nameContainer.append(nameInputTitle, nameInput)
    descriptionContainer.append(descriptionTitle, descriptionInput)
    projectDropdown.append(projectOption);
    actionButtonGroup.append(createTaskButton, cancelTaskButton)
    container.append(nameContainer, descriptionContainer, dateInput, priorityDropdown, projectDropdown, actionButtonGroup)
}
