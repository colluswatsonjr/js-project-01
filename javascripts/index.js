// Page for JS content

const allBlogs = [];
let id = 0;

const blogCreateForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');

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
    storeBlog(newBlog)
    displayBlog(newBlog)
}

blogCreateForm().addEventListener('submit', (event) => {
    event.preventDefault();
    createBlog(event);
})