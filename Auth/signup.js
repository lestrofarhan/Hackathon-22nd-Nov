
const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Redirect if already logged in
let userLoggedin = JSON.parse(localStorage.getItem("currentUser"));
if (userLoggedin) window.location = "../Feed/Feed.html";

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!name  || !email || !password || !confirmPassword) {
        alert("Please fill in all fields!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        alert("Email already registered!");
        return;
    }

  

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    window.location = "./login.html";
});


// ----- Dark Mode -----
const themeToggleBtn = document.getElementById("darkModeToggle");
const btnIcon = document.getElementById("themeIcon");

// Apply saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    btnIcon.classList.add("fa-sun");
} else {
    document.documentElement.classList.remove("dark");
    btnIcon.classList.add("fa-moon");
}

// Toggle theme on button click
themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");

    btnIcon.classList.toggle("fa-sun", isDark);
    btnIcon.classList.toggle("fa-moon", !isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
});
