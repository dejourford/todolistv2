import inbox from "../assets/icons/inbox.svg"
import today from "../assets/icons/today.svg"
import tomorrow from "../assets/icons/tomorrow.svg"
import thisWeek from "../assets/icons/this-week.svg"
import upcoming from "../assets/icons/upcoming.svg"
import completed from "../assets/icons/completed.svg"
import dotsImg from "../assets/icons/dots.svg"
import plusImage from "../assets/icons/plus-white.svg"
import { getCurrentProject } from "./events"

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
        {
            "id": "addProject",
            "imgPath": plusImage,
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
    const tasksSection = document.querySelector(".tasks-wrapper");
    tasksSection.innerHTML = ""


    // filter out the tasksArray for any tasks where #project-dropdown.value === project title
    console.log(tasksArray)
    console.log(project)

    // create function for dates
    function formatLocalDate(d) {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }

    // NEED TO DEFINE THE OTHER IF STATEMENTS FOR THE NAV TABS
    function addDaysToDate(dateString, days) {
        const [year, month, day] = dateString.split("-").map(Number);
        const d = new Date(year, month - 1, day);
        d.setDate(d.getDate() + days);

        return formatLocalDate(d);
    }

    const today = new Date();
    const formattedDate = formatLocalDate(today);

    if (project === "today") {

        const filteredItems = tasksArray.filter((item) => item["task-date"] === formattedDate);
        console.log(formattedDate)
        console.log(filteredItems);
        createTaskCard(filteredItems)
    }

    if (project === "tomorrow") {
        const tomorrow = addDaysToDate(formattedDate, 1)
        const filteredItems = tasksArray.filter((item) => item["task-date"] === tomorrow)
        console.log(filteredItems);
        createTaskCard(filteredItems)
    }

    if (project === "thisWeek") {
        // filter array items if their date falls within start and end date ranges
        const startDate = formattedDate;
        const endDate = addDaysToDate(formattedDate, 7)

        
        const filteredItems = tasksArray.filter((item) =>
            item["task-date"] >= startDate &&
            item["task-date"] <= endDate
        );
        console.log(filteredItems);
        createTaskCard(filteredItems)
    }

    if (project === "inbox") {
        const filteredItems = tasksArray.filter((item) => item.project === project)
        console.log(filteredItems);
        createTaskCard(filteredItems)
    }

    if (project === "upcoming") {
        const filteredItems = tasksArray.filter((item) => item["task-date"] >= formattedDate)
        console.log(filteredItems);
        createTaskCard(filteredItems)
    }

    if (project === "completed") {
        const filteredItems = tasksArray.filter((item) => item.complete === true)
        createTaskCard(filteredItems)
    }

    // function to create task card
    function createTaskCard(filteredArrayItems) {
        
        filteredArrayItems.forEach((task) => {
            // if task.complete = true, then don't create card.
            if (task.complete === true && getCurrentProject() !== "completed") return;
            
            const card = document.createElement("div");
            card.classList.add("task-card");
            card.dataset.id = task.id;


            // create wrapper for title and description
            const wrapperLeft = document.createElement("div");
            wrapperLeft.classList.add("card-wrapper", "card-left");

            const checkbox = document.createElement("input");
            checkbox.classList.add("task-checkbox");
            checkbox.type = "checkbox";
            checkbox.checked = task.complete;

            const title = document.createElement("h3");
            title.textContent = task["task-name"];

            const description = document.createElement("p");
            description.textContent = task["task-description"];

            // create wrapper for date, priority, and elipses
            const wrapperRight = document.createElement("div");
            wrapperRight.classList.add("card-wrapper", "card-right")

            const date = document.createElement("span");
            date.classList.add("task-date");
            date.textContent = task["task-date"];

            const priority = document.createElement("span");
            priority.classList.add("task-priority", task["task-priority"]);
            priority.textContent = task["task-priority"];

            const button = document.createElement("button");
            button.classList.add("dots")
            const dots = document.createElement("img");
            dots.src = dotsImg;

            wrapperLeft.append(checkbox, title, description)
            wrapperRight.append(date, priority, button);
            if (!task.complete) {
                button.append(dots);
            }

            card.append(wrapperLeft, wrapperRight);

            tasksSection.append(card);
        })
    }
}
