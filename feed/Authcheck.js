let userLoggedin = JSON.parse(localStorage.getItem("currentUser"))

if (!userLoggedin) {
    window.location = "../auth/login.html"
}