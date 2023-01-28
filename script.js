// 1. In the HTML there is an input called <code>postnumber</code>, a submit button, and a div called <code>comments</code>
// 2. The user will insert the the post's id number in the input and will click on Get comments which will show him all the comments for that post.
// 3. Replace <code>{id number here}</code> in the endpoint with the value inserted in the input
// 4. Fetch all the comments on a post
// 5. Show the comments in the comments section in HTML
// 6. If the user inserted an invalid post, show a **Can't find comments for this post** message for the user.


const commentsContainer = document.getElementById("comments");
const postsContainer = document.getElementById("posts");
const BASE_URL = "https://jsonplaceholder.typicode.com";

const getPost = async (id) => {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    const data = await response.json();
    return data;
};

const getComments = async (id) => {
    const response = await fetch(`${BASE_URL}/posts/${id}/comments`);
    const data = await response.json();
    return data;
};

const displayComments = (comments) => {
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
        const commentEl = document.createElement("ul");
        commentEl.classList.add("comment");
        commentEl.innerHTML = `<li><h5>Name: ${comment.name}</h5></li>`;
        commentEl.innerHTML += `<li><h5>Email: ${comment.email}</h5></li>`;
        commentEl.innerHTML += `<li><h5>Body: ${comment.body}</h5></li>`;
        commentsContainer.appendChild(commentEl);
    });
};

const displayPosts = (posts) => {
    postsContainer.innerHTML = "";
    posts.forEach((post) => {
        const postEl = document.createElement("ol");
        postEl.classList.add("post");
        postEl.innerHTML = `<li><a href="#"><h3>${post.title}</h3></a></li>`;
        postEl.addEventListener("click", async () => {
            const comments = await getComments(post.id);
            displayComments(comments);
        });
        postsContainer.appendChild(postEl);
    });
};

const getPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    displayPosts(data);
};

getPosts();

// When submitting frm-post, get the post number from the input and display the comments for that post
const frmPost = document.getElementById("frm-post");
frmPost.addEventListener("submit", async (e) => {
    e.preventDefault();
    const postNumber = document.getElementById("postnumber").value;
    const comments = await getComments(postNumber);
    if (comments.length > 0) {
        displayComments(comments);
    } else {
        commentsContainer.innerHTML = "Can't find comments for this post";
    }
});