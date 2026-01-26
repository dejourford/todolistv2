export default function initAppEvents() {

    // listener for navigation tab clicks
    document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", () => {
            
        
            document.querySelectorAll(".nav-item").forEach((nav) => {
                nav.classList.remove("active");
                console.log("active class removed")
            })

            // add active class to clicked button
            item.classList.add("active");
        })
    })
}
