// Page for JS content

const allBlogs = [];
const deletedBlogs = [];
let id = 0;

const blogCreateForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');
const selectBlog = () => document.getElementById('selectBlogs');
const blogCards = () => document.getElementById('blogCards');

// 1st. runs to check that form inputs have content
function validBlog(event) {
    if (!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value) {
        console.log('error')
    } else {
        createBlog(event) 
    }
}

// 2nd. creates function to grab input information to create blog object with data
function createBlog(event) {
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
    // resets input fields
    blogTitleInput().value = '';
    blogAuthorInput().value = '';
    blogContentInput().value = '';
}
// 3rd. creates function to add blog object data to html form and adds to div
function displayBlog(blog) {
    let div = document.createElement('div') //create div element
    div.classList.add('blogCard') //add class to div
    div.id = blog.id; // add id to div
    // creates div content and adds blog data, created two buttons with onclick event
    div.innerHTML = ` 
    <h2 id="blogTitle">${blog.title}</h2>
    <h3 id="blogAuthor">${blog.author}</h3>
    <p id="blogContent">${blog.content}</p>
    <br>
    <button class="editBtn" type="submit" onclick='editBlogBtn(${blog.id})' id="${blog.id}">Edit</button>
    <button class="dltBtn" type="submit" onclick='deleteBlogBtn(${blog.id})' id="${blog.id}">Delete</button>
    `
    blogCards().appendChild(div); //adds created div card to div on html to display
}
// 4.1. created button has onclick that takes the buttons i.d.
// function to edit blog when clicked, added to editBtn
function editBlogBtn(blogId) {
    let editBlog = document.getElementById(`${blogId}`)
    // editBlog.edit();
}
// 5.1. created button has onclick that takes the buttons i.d.
//function to delete blog when clicked, added to dltBtn
function deleteBlogBtn(blogId) { 
    let dltBlog = document.getElementById(`${blogId}`)
    if (confirm('Are you sure?')) {
        let index = allBlogs.findIndex((item) => item.id === blogId) //finds blog byu index in allBlogs array
        allBlogs.splice(index, 1) //removes from allBlogs array
        dltBlog.remove(); //removes from html/page
        deletedBlogs.push(dltBlog) // add deleted blog to new array 
    }
}
// function called when select is used, switches between allBlog array and deletedBlog array 
function displayDltBlogs(event, current, deleted) {
    blogCards().innerHTML = ''; //clear all blog for div
    if (event.target.value == `dltBlog`) {
        for (const blog of deleted) {
            blogCards().appendChild(blog)
            console.log(blog)
            // displayBlog(blog)
        }
    } else if (event.target.value == 'myBlog') {
        for(const blog of current){
            displayBlog(blog)
        }
    }
}
// add listener to select option to switch between current blogs and deleted blogs
selectBlog().addEventListener('change', (event) => {
    event.preventDefault();
    displayDltBlogs(event, allBlogs, deletedBlogs)
})
//add listenr to form to start process of creating blog
blogCreateForm().addEventListener('submit', (event) => {
    event.preventDefault(); //stop auto refrech
    validBlog(event); //will check if vlog inputs have information
})