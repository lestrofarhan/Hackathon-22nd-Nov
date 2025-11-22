// dark

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




// Modal open/close
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const postModal = document.getElementById("postModal");
let user = JSON.parse(localStorage.getItem("currentUser"))




openModalBtn.addEventListener("click", () => postModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => postModal.classList.add("hidden"));

// Tabs switch
const textTabBtn = document.getElementById("textTabBtn");
const imageTabBtn = document.getElementById("imageTabBtn");
const textTab = document.getElementById("textTab");
const imageTab = document.getElementById("imageTab");

textTabBtn.addEventListener("click", () => {
    textTab.classList.remove("hidden");
    imageTab.classList.add("hidden");
    textTabBtn.classList.add("border-blue-500", "dark:border-blue-400", "text-gray-900", "dark:text-gray-300");
    textTabBtn.classList.remove("text-gray-500", "dark:text-gray-400");
    imageTabBtn.classList.remove("border-blue-500", "dark:border-blue-400", "text-gray-900", "dark:text-gray-300");
    imageTabBtn.classList.add("text-gray-500", "dark:text-gray-400");
});

imageTabBtn.addEventListener("click", () => {
    imageTab.classList.remove("hidden");
    textTab.classList.add("hidden");
    imageTabBtn.classList.add("border-blue-500", "dark:border-blue-400", "text-gray-900", "dark:text-gray-300");
    imageTabBtn.classList.remove("text-gray-500", "dark:text-gray-400");
    textTabBtn.classList.remove("border-blue-500", "dark:border-blue-400", "text-gray-900", "dark:text-gray-300");
    textTabBtn.classList.add("text-gray-500", "dark:text-gray-400");
});


// Post Handling
function createPost(postData) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    postData.id = posts.length;
    postData.date = new Date().toISOString();
    postData.likes = 0;
    postData.commentslength = 0;
    postData.comments = []
    posts.push(postData);
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Post created!");
    postModal.classList.add("hidden");
}

// Text Post
document.getElementById("textPostBtn").addEventListener("click", () => {
    const textContent = document.getElementById("textPostInput").value.trim();
    if (!textContent) return alert("Please enter some text!");
    createPost({ type: "text", content: textContent ,user });
    document.getElementById("textPostInput").value = "";
});

// Image Post
document.getElementById("imagePostBtn").addEventListener("click", () => {
    const imageUrl = document.getElementById("imageUrlInput").value.trim();
    const caption = document.getElementById("imageCaptionInput").value.trim();
    if (!imageUrl) return alert("Please enter an image URL!");
    createPost({ type: "image", content: imageUrl, caption , user});
    document.getElementById("imageUrlInput").value = "";
    document.getElementById("imageCaptionInput").value = "";
});


const emojiPicker = document.getElementById("emojiPicker");

// Keep track of the input/textarea currently focused
let currentInput = null;

// Emoji buttons in the modal
const textEmojiBtn = document.getElementById("textEmojiBtn");
const imageEmojiBtn = document.getElementById("imageEmojiBtn");

[textEmojiBtn, imageEmojiBtn].forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing immediately
        // Set current input
        currentInput = btn.id === "textEmojiBtn" ? document.getElementById("textPostInput") : document.getElementById("imageCaptionInput");

        // Position emoji picker near the button
        const rect = btn.getBoundingClientRect();
        emojiPicker.style.top = rect.bottom + window.scrollY + "px";
        emojiPicker.style.left = rect.left + window.scrollX + "px";
        emojiPicker.classList.toggle("hidden");
    });
});

// Insert emoji into current input when clicked
emojiPicker.querySelectorAll("span").forEach(emoji => {
    emoji.addEventListener("click", () => {
        if (currentInput) {
            const start = currentInput.selectionStart;
            const end = currentInput.selectionEnd;
            const text = currentInput.value;
            currentInput.value = text.slice(0, start) + emoji.textContent + text.slice(end);
            currentInput.focus();
            currentInput.selectionStart = currentInput.selectionEnd = start + emoji.textContent.length;
        }
    });
});

// Close emoji picker if clicked outside
document.addEventListener("click", (e) => {
    if (!emojiPicker.contains(e.target) && e.target !== textEmojiBtn && e.target !== imageEmojiBtn) {
        emojiPicker.classList.add("hidden");
    }
});




// show your the posts

const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/052/120/539/non_2x/simple-male-avatar-silhouette-icon-man-with-short-hair-user-profiles-and-contact-information-in-applications-isolated-illustration-vector.jpg";

// check posts in localStorage if not present

let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let posts = JSON.parse(localStorage.getItem("posts"))
let yourPosts = posts.filter((post) =>  post.user.id === currentUser.id
)






const postsContainer = document.getElementById("postsContainer");

function renderPosts() {

   
    postsContainer.innerHTML = "";
    console.log(yourPosts);

    yourPosts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.id = `post-${post.id}`;
        postDiv.className = "bg-white rounded-2xl shadow-lg overflow-hidden theme-transition dark:bg-gray-800 shadow-md mb-5";

        if (post.type === "text") {
            postDiv.innerHTML = `
    <div class="p-5 bg-white dark:bg-gray-800 rounded-xl ">
        <div class="flex items-center space-x-3 mb-4">
            <img src="${post.user.image || defaultAvatar}" alt="${post.user.name}" class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700">
            <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">${post.user.name}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">5 minutes ago</p>
            </div>
            <div class="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">

    <button onclick="editPost(${post.id})"
        class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition">
        <i class="fas fa-edit"></i>
    </button>

    <button onclick="deletePost(${post.id})"
        class="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition">
        <i class="fas fa-trash"></i>
    </button>
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
                <p class="text-sm text-gray-500 dark:text-gray-400">5 minutes ago</p>
            </div>
            <div class="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">

    <button onclick="editPost(${post.id})"
        class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition">
        <i class="fas fa-edit"></i>
    </button>

    <button onclick="deletePost(${post.id})"
        class="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition">
        <i class="fas fa-trash"></i>
    </button>
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



function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.filter(p => p.id !== id);

    // Reassign IDs so system stays consistent
    posts.forEach((p, index) => p.id = index);

    localStorage.setItem("posts", JSON.stringify(posts));

    renderPosts();
}

const editModal = document.getElementById("editPostModal");
let editingPostId = null;

function editPost(id) {
    const posts = JSON.parse(localStorage.getItem("posts"));
    const post = posts.find(p => p.id === id);

    if (!post) return;

    editingPostId = id;

    // If text post
    if (post.type === "text") {
        document.getElementById("editTextInput").classList.remove("hidden");
        document.getElementById("editImageSection").classList.add("hidden");
        document.getElementById("editTextInput").value = post.content;
    }

    // If image post
    if (post.type === "image") {
        document.getElementById("editTextInput").classList.add("hidden");
        document.getElementById("editImageSection").classList.remove("hidden");
        document.getElementById("editImageUrl").value = post.content;
        document.getElementById("editImageCaption").value = post.caption;
    }

    editModal.classList.remove("hidden");
}

function closeEditModal() {
    editModal.classList.add("hidden");
}

document.getElementById("saveEditBtn").addEventListener("click", () => {
    let posts = JSON.parse(localStorage.getItem("posts"));

    const post = posts.find(p => p.id === editingPostId);
    if (!post) return;

    if (post.type === "text") {
        post.content = document.getElementById("editTextInput").value.trim();
    } else {
        post.content = document.getElementById("editImageUrl").value.trim();
        post.caption = document.getElementById("editImageCaption").value.trim();
    }

    localStorage.setItem("posts", JSON.stringify(posts));

    closeEditModal();
    renderPosts();
});


renderPosts();
highlightPostFromURL();

