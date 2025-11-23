// Tab buttons with their target pages
const tabPages = {
    homeTab: "Feed.html",
    postsTab: "posts.html",
    profileTab: "profile.html"
};

// Add click listeners to redirect
const currentPage = window.location.pathname.split("/").pop();

Object.keys(tabPages).forEach(tabId => {
    const tabBtn = document.getElementById(tabId);
    if (!tabBtn) return;

    // Highlight active tab
    if (tabPages[tabId] === currentPage) {
        tabBtn.classList.add("bg-gradient-to-r", "from-blue-500", "to-purple-500", "text-white", "shadow-lg");
        tabBtn.classList.remove("text-gray-600", "dark:text-gray-300", "hover:bg-gray-100", "dark:hover:bg-gray-700");
    }

    // Redirect on click
    tabBtn.addEventListener("click", () => {
        window.location.href = tabPages[tabId];
    });
});


const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});
