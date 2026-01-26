import "./styles.css";
import renderApp from "./ui/render";
import initAppEvents from "./ui/events";
import initFormEvents from "./modules/todo";


const app = document.querySelector("#app");



// call functions
renderApp();
initAppEvents();
initFormEvents();
