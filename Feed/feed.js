const themeToggleBtn = document.getElementById("darkModeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
} else {
    document.documentElement.classList.remove("dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
}

// Toggle theme on button click
themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    if (isDark) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
    }
});


// show all the posts

const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/052/120/539/non_2x/simple-male-avatar-silhouette-icon-man-with-short-hair-user-profiles-and-contact-information-in-applications-isolated-illustration-vector.jpg";

// check posts in localStorage if not present

if (!localStorage.getItem("posts")) {
    document.getElementById("no-posts").classList.remove("hidden")
} else {
    document.getElementById("no-posts").classList.add("hidden")
}


const postsContainer = document.getElementById("postsContainer");

function renderPosts(searchedpost) {

    let posts;
    if (searchedpost) {
        
        posts = searchedpost;
    } else {
        
        posts = JSON.parse(localStorage.getItem("posts"));
    }
    postsContainer.innerHTML = "";
console.log(posts);

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.id = `post-${post.id}`;
        postDiv.className = "bg-white rounded-2xl shadow-lg overflow-hidden theme-transition dark:bg-gray-800 shadow-md mb-5";
        const timestamp = new Date(post.date).getTime();

        
        const timeString = timeAgo(timestamp);


        if (post.type === "text") {
            postDiv.innerHTML = `
    <div class="p-5 bg-white dark:bg-gray-800 rounded-xl ">
        <div class="flex items-center space-x-3 mb-4">
            <img src="${post.user.image || defaultAvatar}" alt="${post.user.name}" class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700">
            <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">${post.user.name}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">${timeString || "5 minutes ago"}</p>
            </div>
        </div>
        <p class="mb-4 text-gray-700 dark:text-gray-300">${post.content}</p>
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button onclick="toggleLike(${post.id})" class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700 transition">
                <i class="far fa-heart" id="like-icon-${post.id}"></i>
                <span id="likes-${post.id}">${post.likes}</span>
            </button>
            <button onclick="sharePost(${post.id})" class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:text-green-500 hover:bg-green-50 dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 transition">
                <i class="far fa-share-square"></i>
                <span>Share</span>
            </button>
        </div>
    </div>
    `;
        } else {
            postDiv.innerHTML = `
    <div class="p-5 bg-white dark:bg-gray-800 ">
        <div class="flex items-center space-x-3 mb-4">
            <img src="${post.user.image || defaultAvatar}" alt="${post.user.name}" class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700">
            <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">${post.user.name}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">${timeString || "5 minutes ago"}</p>
            </div>
        </div>
        <p class="mb-4 text-gray-700 dark:text-gray-300">${post.caption}</p>
        <img src="${post.content}" alt="${post.caption}" class="w-full h-80 object-cover rounded-xl mb-4">
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button onclick="toggleLike(${post.id})" class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700 transition">
                <i class="far fa-heart" id="like-icon-${post.id}"></i>
                <span id="likes-${post.id}">${post.likes}</span>
            </button>
            <button onclick="sharePost(${post.id})" class="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:text-green-500 hover:bg-green-50 dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 transition">
                <i class="far fa-share-square"></i>
                <span>Share</span>
            </button>
        </div>
    </div>
    `;
        }

        postsContainer.appendChild(postDiv);
    });
}

function timeAgo(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 2) return "1 minute ago";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 2) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "yesterday";
    if (days < 30) return `${days} days ago`;
    if (months < 2) return "1 month ago";
    if (months < 12) return `${months} months ago`;
    if (years < 2) return "1 year ago";
    return `${years} years ago`;
}


function toggleLike(postId) {
    console.log(postId);
    
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Initialize liked property if not present
    if (post.liked === undefined) post.liked = false;

    // Toggle like
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    // Update localStorage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Update UI
    const likesCount = document.getElementById(`likes-${postId}`);
    const likeIcon = document.getElementById(`like-icon-${postId}`);
    console.log(likeIcon);
    
    likesCount.textContent = post.likes;

    // Toggle heart color
    if (post.liked) {
        likeIcon.classList.add("text-red-500");   // turns heart red
        likeIcon.classList.remove("text-gray-600");
        likeIcon.classList.remove("far");         // remove empty heart
        likeIcon.classList.add("fas");            // add solid heart
    } else {
        likeIcon.classList.remove("text-red-500");
        likeIcon.classList.add("text-gray-600");
        likeIcon.classList.remove("fas");         // remove solid heart
        likeIcon.classList.add("far");            // add empty heart
    }
}



function sharePost(postId) {
    const url = `${window.location.origin}${window.location.pathname}?postId=${postId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("Post link copied to clipboard!");
    });
}

// Highlight post if URL has ?postId=
function highlightPostFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");
    if (postId) {
        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
            postElement.scrollIntoView({ behavior: "smooth", block: "center" });
            postElement.classList.add("ring-4", "ring-blue-500");
            setTimeout(() => postElement.classList.remove("ring-4", "ring-blue-500"), 2000);
        }
    }
}



// search and filter


document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("filterSelect").addEventListener("change", applyFilters);
document.getElementById("sortSelect").addEventListener("change", applyFilters);

function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const filter = document.getElementById("filterSelect").value;
    const sort = document.getElementById("sortSelect").value;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Search
    posts = posts.filter(p =>
        p.content.toLowerCase().includes(search) ||
        (p.caption && p.caption.toLowerCase().includes(search))
    );

    // Filter
    if (filter !== "all") {
        posts = posts.filter(p => p.type === filter);
    }

    // Sort
    posts.sort((a, b) => {
        if (sort === "newest") return b.id - a.id;
        else return a.id - b.id;
    });

    renderPosts(posts); // IMPORTANT: modify renderPosts to accept posts
}


renderPosts();
highlightPostFromURL();


