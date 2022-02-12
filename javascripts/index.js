const createBlogForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');
const blogSelector = () => document.getElementById('selectBlogs');
const blogCards = () => document.getElementById('blogCards');
let id = 0
//Event Listeners
createBlogForm().addEventListener('submit', submitBlog)
blogSelector().addEventListener('change', (event) => {
    event.preventDefault();
    getAllBlogs()
})
//Event Handlers
function submitBlog(event) {
    event.preventDefault()
    let blogData = {
        title: blogTitleInput().value,
        author: blogAuthorInput().value,
        content: blogContentInput().value,
    }
    addBlogCard(blogData)
    renderBlogCards(blogData)
}

//DOM Render Functions
function renderBlogCards(object, option) {//creates div to be be added to page in html form
    let a = '';
    let b ='';
    if(option == 'dltDlt'){
        a = '';
        b = 'none';
    }else if(option == 'addDlt'){
        a = 'none';
        b = '';
    }
    let card = document.createElement('div'); //create div
    card.classList.add('blogCard'); //add class blogCard to div
    card.id = object.id; //add id to card
    card.innerHTML = ` 
            <h2 id="blogTitle">${object.title}</h2>
            <h3 id="blogAuthor">${object.author}</h3>
            <p id="blogContent">${object.content}</p>
            <br>
            <button id="editBtn" type="submit">Edit</button>
            <button id="removeBtn" style='display: ${a}' type="submit">Remove</button>
            <button id="deleteBtn" style='display: ${b}' type="submit">Delete</button>
            `; //creates content of div and adds data from object
    
    card.querySelector('#editBtn').addEventListener('click', (e) => {
        e.preventDefault();
        card.querySelector('#blogContent').textContent = blogContentInput().value;
        updateBlogCard(card)
    })

    card.querySelector('#removeBtn').addEventListener('click', (e) => {
        e.preventDefault();
        addBlogCard(object, 'removedBlogs')
        deleteBlogCard(object, 'currentBlogs')
    })
    card.querySelector('#deleteBtn').addEventListener('click', (e) => {
        e.preventDefault();
        deleteBlogCard(object)
    })

    blogCards().appendChild(card)
}

function updateBlogCard(object) {
    console.log(object.id)
    console.log(object)
    // fetch(`http://localhost:3000/currentBlogs/${object.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type':'application/json'
    //     },
    //     body: JSON.stringify(object)
    // })
    // .then(res => res.json())
    // .then(data => console.log('Success: ',data))
    // .catch(err => console.log(err))
}

//Fetch Requests
function getAllBlogs(selectBlog = blogSelector().value) { //renders all blogs in current blog
    // let selectBlog = blogSelector().value
    blogCards().innerHTML = ''
    fetch(`http://localhost:3000/${selectBlog}`)
        .then(res => res.json())
        .then(blogData => {
            let arr = blogData;
            for (var i = arr.length - 1; i >= 0; i--) {
                if(selectBlog == 'currentBlogs'){
                    renderBlogCards(arr[i], 'dltDlt')
                }else if(selectBlog == 'removedBlogs'){
                    renderBlogCards(arr[i], 'addDlt')
                }else{
                    console.log('selecrBlogs not found')
                }
            }
            // blogData.forEach(blog => renderBlogCards(blog))
        })
        .catch(err => console.log(err))
}
function addBlogCard(object, selectBlog = 'currentBlogs') {
    console.log(object)
    fetch(`http://localhost:3000/${selectBlog}`, {
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
function deleteBlogCard(object, selectBlog = 'removedBlogs') {
    fetch(` http://localhost:3000/${selectBlog}/${object.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log('Success: ', data))
        .catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    getAllBlogs('currentBlogs')
})

//Initilize
// function init() { //kickstarts page
//     getAllBlogs()
// }
// init()




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