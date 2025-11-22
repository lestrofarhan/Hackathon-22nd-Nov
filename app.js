let userLoggedin = JSON.parse(localStorage.getItem("currentUser"))

if (userLoggedin) {
     window.location = "./Feed/Feed.html"
} else {
    window.location = "./auth/login.html"
}