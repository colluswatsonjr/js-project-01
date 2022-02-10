const createBlogForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');
const selectBlog = () => document.getElementById('selectBlogs');
const blogCards = () => document.getElementById('blogCards');

//Event Listeners
createBlogForm().addEventListener('submit', submitBlog)

//Event Handlers
function submitBlog(event) {
    event.preventDefault()
    let blogData = {
        title: blogTitleInput().value,
        author: blogAuthorInput().value,
        content: blogContentInput().value,
    }
    renderBlogCards(blogData)
    addBlogCard(blogData)
}

//DOM Render Functions
function renderBlogCards(object) {//creates div to be be added to page in html form
    let card = document.createElement('div'); //create div
    card.classList.add('blogCard'); //add class blogCard to div
    card.id = object.id; //add id to card
    card.innerHTML = ` 
            <h2 id="blogTitle">${object.title}</h2>
            <h3 id="blogAuthor">${object.author}</h3>
            <p id="blogContent"><span class='card-content'>${object.content}</span></p>
            <br>
            <button id="editBtn" type="submit">Edit</button>
            <button id="removeBtn" type="submit">Remove</button>
            <button id="deleteBtn" type="submit">Delete</button>
            `; //creates content of div and adds data from object
    
    card.querySelector('#editBtn').addEventListener('click', (event) => {
        event.preventDefault();
        card.querySelector('span').textContent = ''
        updateBlogCard(object)
    })
    card.querySelector('#removeBtn').addEventListener('click', () => console.log('click remove'))
    card.querySelector('#deleteBtn').addEventListener('click', () => console.log('click delete'))

    blogCards().appendChild(card)
}
// function handleEdit(){
//     console.log('click edit')
// }
// function handleEdit(){
//     console.log('click edit')
// }
// function handleEdit(){
//     console.log('click edit')
// }
// function editBlogBtn(){
//     blogContentInput().value = document.getElementById('blogContent').innerHTML
//     updateBlogCard(blog)
// }



//Fetch Requests
function getAllBlogs() {
    fetch(`http://localhost:3000/currentBlogs`)
        .then(res => res.json())
        .then(blogData => blogData.forEach(blog => renderBlogCards(blog)))
        .catch(err => console.log(err))
}
function addBlogCard(object) {
    fetch(`http://localhost:3000/currentBlogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then(data => console.log('Success:', data))
    .catch(err => console.log(err))

    // resets input fields
    blogTitleInput().value = '';
    blogAuthorInput().value = '';
    blogContentInput().value = '';
}
function updateBlogCard(object){
    console.log(object)
    fetch(`http://localhost:3000/currentBlogs/${object.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'applicatin/json'
        },
        body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}



//Initilize
function init() {
    getAllBlogs()
}
init()




// const createNewBlog = () => {
//     createBlogForm().addEventListener('submit', (event) => {
//         event.preventDefault();
//         let cardData = createCardData(); //creates card
//         let newCard = createCard(cardData);
//         saveThisCard(cardData, 'currentBlogs'); //saves card
//         showThisCard(newCard, 'currentBlogs'); //save new card to currentBlogs
//     })
//     // if (!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value) {
//     //     console.log('error')
//     // }else{
//     //     return true
//     // }
// }

// const createNewBlog = () => {
//     createBlogForm().addEventListener('submit', (event) => {
//         event.preventDefault();
//         let cardData = createCardData(); //creates card
//         let newCard = createCard(cardData);
//         saveThisCard(cardData, 'currentBlogs'); //saves card
//         showThisCard(newCard, 'currentBlogs'); //save new card to currentBlogs
//     })
//     // if (!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value) {
//     //     console.log('error')
//     // }else{
//     //     return true
//     // }
// }










// //add events without waiting for styles/images to finish loading
// document.addEventListener('DOMContentLoaded', () => {
//     checkSelected(); // displays current selector value, handles selector change
//     createNewBlog(); // create new blogs, handles form input to display
// });
// //checks value of selector and uses function to switch betwen arrays
// const checkSelected = () => {
//     displayTheseBlogs(selectBlog().value); //logs currently selects blogs
//     selectBlog().addEventListener('change', (event) => {
//         event.preventDefault();
//         blogCards().innerHTML = ''; //clear all blog for div
//         displayTheseBlogs(`${event.target.value}`) //will be a selector option value 'currentBlogs' or 'removedBlogs'
//     })
// };
// // ===============================================================================================================
// // makes a request to database to search for (x)Blogs
// const displayTheseBlogs = (x) => { //makes fetch request to database and call displayBlog on them
//     fetch(`http://localhost:3000/${x}`) //makes request with passed value
//         .then(res => res.json()) //makes a request for data and turn it into json to be used
//         .then(blogsArray => {
//             displayBlog(blogsArray) //calls function on returned array of objects
//         })
//         .catch(err => console.log(err))
// };
// function displayBlog(array) { //displays all blogs of array passed after creating card
//     blogCards().innerHTML = ''; //clear all blog for div
//     for (const blog of array) {
//         let newCard = createCard(blog);
//         showThisCard(newCard);
//     }
// };

// function showThisCard(card) { //displays card on current page
//     blogCards().appendChild(card)
// };
// // ===============================================================================================================
// const createNewBlog = () => {
//     createBlogForm().addEventListener('submit', (event) => {
//         event.preventDefault();
//         let cardData = createCardData(); //creates card
//         let newCard = createCard(cardData);
//         saveThisCard(cardData, 'currentBlogs'); //saves card
//         showThisCard(newCard, 'currentBlogs'); //save new card to currentBlogs
//     })
//     // if (!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value) {
//     //     console.log('error')
//     // }else{
//     //     return true
//     // }
// }

// function createCardData() { //takes current values form input fileds and turns them into a object, reset input fields
//     let title = blogTitleInput().value;
//     let author = blogAuthorInput().value;
//     let content = blogContentInput().value;
//     const newBlog = {
//         id: id,
//         title: title,
//         author: author,
//         content: content,
//     }
//     id++;
//     // resets input fields
//     blogTitleInput().value = '';
//     blogAuthorInput().value = '';
//     blogContentInput().value = '';
//     return newBlog
// }
// function saveThisCard(object, selectBlog) { //adds card to database of currentBlogs
//     fetch(`http://localhost:3000/${selectBlog}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application'
//         },
//         body: JSON.stringify(object)
//     })
//         .then(res => res.json())
//         .then(array => console.log('Success:', array)) //displays all blogs
//         .catch(err => console.log('Error:', err))
// }
// // ===============================================================================================================
// function removeThis(id) {
//     addToRemoved(id, 'currentBlogs')
//     removeFromCurrent(id, 'currentBlogs')
// }

// function addToRemoved(id, selectBlog) {
//     console.log(id, selectBlog)
//     fetch(`http://localhost:3000/${selectBlog}/${id}`)
//         .then(res => res.json())
//         .then(data => { saveThisCard(data, 'removedBlogs') })
//         .catch(err => console.log(err));
// }

// function removeFromCurrent(id, selectBlog) {
//     fetch(`http://localhost:3000/${selectBlog}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(res => res.json())
//         .then(data => console.log('Success:', data))
//         .catch(err => console.log(err))


// }






// function aremoveThis(id) {
//     fetch(`http://localhost:3000/currentBlogs/${id}`)
//         .then(res => res.json()) //makes a request for data and turn it into json to be used
//         .then(data => {
//             saveThisCard(data, 'removedBlogs')
//             displayTheseBlogs('currentBlogs')
//         })
//         .catch(err => console.log(err));
//     deleteThis(id, 'currentBlogs')
// }

// function adeleteThis(id, selectBlog = 'removedBlogs',) {
//     console.log(selectBlog)
//     fetch(`http://localhost:3000/${selectBlog}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(res => res.json())
//         .then(data => console.log('Success:', data))
//         .catch(err => console.log(err))

//     displayTheseBlogs(selectBlog)
//