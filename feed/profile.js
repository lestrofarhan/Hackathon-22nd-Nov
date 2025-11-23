// =======================
// LOAD DATA ON PAGE LOAD
// =======================
let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let posts = JSON.parse(localStorage.getItem("posts"))
let yourPosts = posts.filter((post) => post.user.id === currentUser.id
)

let likesCount = 0;
let likes = yourPosts.forEach(post => {
    likesCount += post.likes
});
document.addEventListener("DOMContentLoaded", () => {
    const savedProfile = JSON.parse(localStorage.getItem("currentUser")) || {
        name: "User Name",
        username: "@username",
        bio: "Creative designer & photographer 📸 | Sharing life moments ✨ | Coffee enthusiast ☕",
        image: "https://via.placeholder.com/120"
    };

    console.log(savedProfile.image);
    

    // Apply data to UI
    document.getElementById("profileName").innerText = savedProfile.name;
    document.getElementById("profileBio").innerText = savedProfile.bio || "Add your Bio" ;
    document.getElementById("profileImage").src = savedProfile.image || "https://static.vecteezy.com/system/resources/previews/052/120/539/non_2x/simple-male-avatar-silhouette-icon-man-with-short-hair-user-profiles-and-contact-information-in-applications-isolated-illustration-vector.jpg";

    // posts & likes
    document.getElementById("likeCount").innerText = likesCount
    document.getElementById("postCount").innerText = yourPosts.length


    // Fill modal inputs
    document.getElementById("editName").value = savedProfile.name;
    document.getElementById("editBio").value = savedProfile.bio || "";
});


// =======================
// SAVE PROFILE CHANGES
// =======================

document.getElementById("saveBtn").addEventListener("click", () => {
    const updatedProfile = {
        name: document.getElementById("editName").value,
        bio: document.getElementById("editBio").value,
        image: document.getElementById("editImageUrl").value
    };

    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, name:  updatedProfile.name,  bio: updatedProfile.bio,image : updatedProfile.image }));

    // Update UI instantly
    document.getElementById("profileName").innerText = updatedProfile.name;
    document.getElementById("profileBio").innerText = updatedProfile.bio;
    document.getElementById("profileImage").src = updatedProfile.image;
    window.dispatchEvent(new CustomEvent("close-modal"));

    window.location.reload
});


// =======================
// DARK MODE TOGGLE
// =======================

const darkToggle = document.getElementById("darkModeToggle");
const themeIcon = document.getElementById("themeIcon");

darkToggle.addEventListener("click", () => {
    const root = document.querySelector("html");
    const isDark = root.classList.toggle("dark");

    // Switch icon
    themeIcon.classList.toggle("fa-moon", !isDark);
    themeIcon.classList.toggle("fa-sun", isDark);

    // Save mode
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
});

// Apply saved mode
if (localStorage.getItem("darkMode") === "enabled") {
    document.querySelector("html").classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}



const editImage = document.getElementById("editImage");

if (editImage) {
    editImage.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById("profileImage").src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}


// logout

document.getElementById("Logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser")
    window.location.reload();
})