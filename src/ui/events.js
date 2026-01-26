export default function initAppEvents() {

    // create function to show respective content when clicked
    function showTabContent(tabText, id) {
        const taskSection = document.querySelector(".task-section");
        taskSection.id = id;

        // remove previous tabText content
        taskSection.innerHTML = ""

        // create section title
        const taskSectionTitle = document.createElement("h2");
        taskSectionTitle.classList.add("task-title");
        taskSectionTitle.textContent = tabText;

        // assembly
        taskSection.appendChild(taskSectionTitle)
    }

    // listener for active navigation tab clicks
    document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", () => {
        
            document.querySelectorAll(".nav-item").forEach((nav) => {
                nav.classList.remove("active");
                console.log("active class removed")
            })

            // add active class to clicked button
            item.classList.add("active");

            // show tab content
            const tabTextContent = item.textContent
            const tabId = item.id
            showTabContent(tabTextContent, tabId);
        })
    })
}
