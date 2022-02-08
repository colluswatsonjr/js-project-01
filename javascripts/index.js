// Page for JS content

const allBlogs = [];
let id = 0;

const blogCreateForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');
const blogCards = () => document.getElementById('blogCards')
function validBlog(event){
    if(!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value){
        console.log('error')
    }else{
        createBlog(event)
    }
}

function createBlog(event){
    let blogTitle = blogTitleInput().value;
    let blogAuthor = blogAuthorInput().value;
    let blogContent = blogContentInput().value;
    // let time = () => {new Date().now}
    const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        content: blogContent,
        // created: `${Date().getMonth() + Date().getMonth()}`
    }
    allBlogs.push(newBlog); //store newBlog
    displayBlog(newBlog)
}

function displayBlog(blog){
    let div = document.createElement('div')
    div.classList.add('blogCard')
    div.innerHTML = `
    <h2 id="blogTitle">${blog.title}</h2>
    <h3 id="blogAuthor">${blog.author}</h3>
    <p id="blogContent">${blog.content}</p>
    <br>
    <button class="editBtn" type="submit" name="action" id="editBlog">Edit</button>
    <button class="dltBtn" type="submit" name="action" id="deleteBlog">Delete</button>`
    blogCards().appendChild(div);
}

blogCreateForm().addEventListener('submit', (event) => {
    event.preventDefault(); //stop auto refrech
    validBlog(event); //will check if vlog inputs have information
})