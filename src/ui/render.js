import inbox from "../assets/icons/inbox.svg"
import today from "../assets/icons/today.svg"
import tomorrow from "../assets/icons/tomorrow.svg"
import thisWeek from "../assets/icons/this-week.svg"
import upcoming from "../assets/icons/upcoming.svg"
import completed from "../assets/icons/completed.svg"

function renderNavigation() {
    // page title
    const title = document.createElement("h1");
    title.textContent = "JustDoIt";

    // sidebar
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    // navigation
    const nav = document.createElement("nav");
    nav.role = "navigation";

    // navigation items
    const navItems = [
        {
            "id": "inbox",
            "title": "Inbox",
            "imgPath": inbox,
        },
        {
            "id": "today",
            "title": "Today",
            "imgPath": today,
        },
        {
            "id": "tomorrow",
            "title": "Tomorrow",
            "imgPath": tomorrow,
        },
        {
            "id": "thisWeek",
            "title": "This Week",
            "imgPath": thisWeek,
        },
        {
            "id": "upcoming",
            "title": "Upcoming",
            "imgPath": upcoming,
        },
        {
            "id": "completed",
            "title": "Completed",
            "imgPath": completed,
        },
    ]

    const ulElement = document.createElement("ul");

    navItems.forEach((item) => {
        console.log(item)


        // <ul>
        // <li>
        // <img></img>
        // <p></p>
        // </li>
        // </ul>

        // nav item element (li)
        const navItem = document.createElement("li");
        navItem.classList.add("nav-item");
        navItem.id = item.id;

        // img for nav item (img)
        const img = document.createElement("img");
        img.src = item.imgPath;
        img.classList.add(`${item.imgPath}-icon`)

        // nav item text (p)
        const navItemText = document.createElement("p");
        navItemText.classList.add("nav-item-text")
        navItemText.textContent = item.title;

        // assembly
        navItem.append(img, navItemText)
        ulElement.append(navItem)
    })


    // assembly
    nav.append(ulElement)
    sidebar.append(title, nav)

    return sidebar
}

export default function renderApp() {
    const app = document.querySelector("#app");
    app.innerHTML = "";

    const taskSection = document.createElement("main");
    taskSection.classList.add("task-section");

    app.append(renderNavigation(), taskSection);
}

// create render function for rendering tasks
export function renderTasks(project, tasksArray) {
    const tasksSection = document.querySelector(".task-section");

    // filter out the tasksArray for any tasks where #project-dropdown.value === project title
    console.log(tasksArray)
    console.log(project)
    const filteredItems = tasksArray.filter((item) => item.project === project)
    console.log(filteredItems);

    filteredItems.forEach((task) => {
        const card = document.createElement("div");
        card.classList.add("task-card");

        const title = document.createElement("h3");
        title.textContent = task["task-name"];

        const description = document.createElement("p");
        description.textContent = task["task-description"];

        const date = document.createElement("span");
        date.classList.add("task-date");
        date.textContent = task["task-date"];

        const priority = document.createElement("span");
        priority.classList.add("task-priority", task["task-priority"]);
        priority.textContent = task["task-priority"];

        card.append(title, description, date, priority);

        tasksSection.append(card);
    })
}
