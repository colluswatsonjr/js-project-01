// Page for JS content

const allBlogs = [];
let id = 0;

const blogCreateForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');
const blogCards = () => document.getElementById('blogCards');


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
        id: id,
        title: blogTitle,
        author: blogAuthor,
        content: blogContent,
        // created: `${Date().getMonth() + Date().getMonth()}`
    }
    id++;
    allBlogs.push(newBlog); //store newBlog
    displayBlog(newBlog)
}

function displayBlog(blog){
    let div = document.createElement('div')
    div.classList.add('blogCard')
    div.id = blog.id;
    div.innerHTML = `
    <h2 id="blogTitle">${blog.title}</h2>
    <h3 id="blogAuthor">${blog.author}</h3>
    <p id="blogContent">${blog.content}</p>
    <br>
    <button class="editBtn" type="submit" onclick='editBlogBtn(${blog.id})' id="${blog.id}">Edit</button>
    <button class="dltBtn" type="submit" onclick='deleteBlogBtn(${blog.id})' id="${blog.id}">Delete</button>`
    blogCards().appendChild(div);
}

function editBlogBtn(blogId){
    let editBlog = document.getElementById(`${blogId}`)
    // editBlog.edit();
}

function deleteBlogBtn(blogId){
    let dltBlog = document.getElementById(`${blogId}`)
    dltBlog.remove();
}


blogCreateForm().addEventListener('submit', (event) => {
    event.preventDefault(); //stop auto refrech
    validBlog(event); //will check if vlog inputs have information
})