import "./styles.css";
import renderNavigation from "./modules/navigation";
import initAppEvents from "./ui/events";


const app = document.querySelector("#app");

app.append(renderNavigation())

// call functions
initAppEvents();
