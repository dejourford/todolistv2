import inbox from "../assets/icons/inbox.svg"
import today from "../assets/icons/today.svg"
import tomorrow from "../assets/icons/tomorrow.svg"
import thisWeek from "../assets/icons/this-week.svg"
import upcoming from "../assets/icons/upcoming.svg"
import completed from "../assets/icons/completed.svg"





    function renderNavigation() {
        // page title
        const title = document.createElement("h1");
        title.textContent = "todolist";

        // sidebar
        const sidebar = document.createElement("div");
        sidebar.classList.add("sidebar");

        // navigation
        const nav = document.createElement("nav");
        nav.role = "navigation";

        // navigation items
        const navItems = [
            {
                "title": "Inbox",
                "imgPath": inbox,
            },
            {
                "title": "Today",
                "imgPath": today,
            },
            {
                "title": "Tomorrow",
                "imgPath": tomorrow,
            },
            {
                "title": "This Week",
                "imgPath": thisWeek,
            },
            {
                "title": "Upcoming",
                "imgPath": upcoming,
            },
            {
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
            navItem.id = item.title;

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
        app.append(renderNavigation());
    }
