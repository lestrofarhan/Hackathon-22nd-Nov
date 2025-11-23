const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
let form = document.querySelector("form")
let userLoggedin = JSON.parse(localStorage.getItem("currentUser"))

if (userLoggedin) {
    window.location = "../Feed/Feed.html"
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = emailInput.value.trim().toLowerCase();
    let password = passwordInput.value;

    if (!email || !password) {
        alert("Please enter email and password!");
        return;
    }


    let users = JSON.parse(localStorage.getItem("users")) || [];

    let matchedUser = users.find(user => user.email === email && user.password === password);

    if (!matchedUser) {
        alert("Invalid email or password!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    alert("Login successful!");

    window.location = "../Feed/Feed.html"

});



const themeToggleBtn = document.getElementById("darkModeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

themeToggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    // Save preference
    if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
