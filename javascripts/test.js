const createBlogForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');
const blogSelector = () => document.getElementById('selectBlogs');
const blogCards = () => document.getElementById('blogCards');
let id = 0;

//Event Listeners
createBlogForm().addEventListener('submit', submitBlog)
blogSelector().addEventListener('change', (event) => {
    event.preventDefault();
    getAllBlogs()
})
//Event Handlers
function submitBlog(event) {
    event.preventDefault();
    let blogData = '';
    if (!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value) {
        createBlogForm().style.backgroundColor = 'yellow';
        setTimeout(() => {
            createBlogForm().style.backgroundColor = '';
        }, 600);
    } else {
        blogData = {
            title: blogTitleInput().value,
            author: blogAuthorInput().value,
            content: blogContentInput().value,
        }
        addBlogCard(blogData)
        renderBlogCards(blogData)
    }
}

//DOM Render Functions
function renderBlogCards(object, option) {//creates div to be be added to page in html form
    if (option == 'dltDlt') {
        a = '';
        b = 'none';
    } else if (option == 'addDlt') {
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
            <button id="saveBtn" style='display: none' type="submit">Save</button>
            <button id="cancelBtn" style='display: none' type="submit">Cancel</button>
            <button id="removeBtn" style='display: ${a}'>Remove</button>
            <button id="deleteBtn" style='display: ${b}'>Delete</button>
            `; //creates content of div and adds data from object

    card.querySelector('#editBtn').addEventListener('click', (e) => {
        e.preventDefault();
        card.querySelector('#blogTitle').contentEditable = true;
        card.querySelector('#blogTitle').style.backgroundColor = 'white'

        card.querySelector('#blogAuthor').contentEditable = true;
        card.querySelector('#blogAuthor').style.backgroundColor = 'white'

        card.querySelector('#blogContent').contentEditable = true;
        card.querySelector('#blogContent').style.backgroundColor = 'white'

        card.querySelector('#editBtn').style.display = 'none'
        card.querySelector('#removeBtn').style.display = 'none'
        card.querySelector('#saveBtn').style.display = ''
        card.querySelector('#cancelBtn').style.display = ''

        card.querySelector('#saveBtn').addEventListener('click', (e) => {
            e.preventDefault();
            object.id = NaN
            addBlogCard(object, blogSelector().value)

            setTimeout(() => {

                console.log('settimeout')
                // deleteBlogCard(object, blogSelector().value)

                // getAllBlogs()
            }, 600);
            // addBlogCard(object, blogSelector().value)


        })
        // updateBlogCard(card)
    })
    card.querySelector('#removeBtn').addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e)
        deleteBlogCard(object, 'currentBlogs')

        object.id = NaN
        addBlogCard(object, 'removedBlogs')
    })
    card.querySelector('#deleteBtn').addEventListener('click', (e) => {
        e.preventDefault();
        deleteBlogCard(object)
    })

    blogCards().appendChild(card)
}

//Fetch Requests
function getAllBlogs(selectBlog = blogSelector().value) { //fetch request to renders all blogs in current blog
    // let selectBlog = blogSelector().value
    blogCards().innerHTML = '';
    fetch(`http://localhost:3000/${selectBlog}`)
        .then(res => res.json())
        .then(blogData => {
            let arr = blogData;
            for (var i = arr.length - 1; i >= 0; i--) {
                if (selectBlog == 'currentBlogs') {
                    renderBlogCards(arr[i], 'dltDlt')
                } else if (selectBlog == 'removedBlogs') {
                    renderBlogCards(arr[i], 'addDlt')
                } else {
                    console.log('selecrBlogs not found')
                }
            }
            // blogData.forEach(blog => renderBlogCards(blog))
        })
        .catch(err => console.log(err))
}

function renderBlogs(array){
    
}
function addBlogCard(object, selectBlog = 'currentBlogs') { //fetch to post/add object to data blog
    fetch(`http://localhost:3000/${selectBlog}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    })
        .then(res => res.json())
        .then(data => console.log('Successfully created object:', data))
        .catch(err => console.log(err))


    // resets input fields
    blogTitleInput().value = '';
    blogAuthorInput().value = '';
    blogContentInput().value = '';
}
function deleteBlogCard(object, selectBlog = 'removedBlogs') { //fetch to delete/remove object from data blog
    fetch(` http://localhost:3000/${selectBlog}/${object.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log('Successfully deleted object: ', data))
        .catch(err => console.log(err))
}
function updateBlogCard(object) { //fetch to patch/edit object data
    let newData = divToData(object) //turns div into data obj
    console.log(newData)
    // fetch(`http://localhost:3000/currentBlogs/${object.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type':'application/json'
    //     },
    //     body: JSON.stringify(newData)
    // })
    // .then(res => res.json())
    // .then(data => console.log('Success: ',data))
    // .catch(err => console.log(err))
}

function divToData(div) {
    let obj = {
        id: div.id,
        title: blogTitle.innerHTML,
        author: blogAuthor.innerHTML,
        content: blogContent.innerHTML
    }
    return obj
}

//Intiilize
// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');
//     getAllBlogs()
// })
getAllBlogs()





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


























// Page for JS content
const allBlogs = [];
const deletedBlogs = [];
let id = 0;

const blogForm = () => document.getElementById('createBlogForm'); //grab blog form
const blogTitleInput = () => document.getElementById('blogTitleInput');
const blogAuthorInput = () => document.getElementById('blogAuthorInput');
const blogContentInput = () => document.getElementById('blogContentInput');
const selectBlog = () => document.getElementById('selectBlogs');
const blogCards = () => document.getElementById('blogCards');

// 1st. runs to check that form inputs have content
// function validBlog(event) {
//     if (!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value) {
//         console.log('error')
//     } else {
//         createBlog(event) 
//     }
// }

// 2nd. creates function to grab input information to create blog object with data
// function createBlog(event) {
//     let blogTitle = blogTitleInput().value;
//     let blogAuthor = blogAuthorInput().value;
//     let blogContent = blogContentInput().value;
//     // let time = () => {new Date().now}
//     const newBlog = {
//         id: id,
//         title: blogTitle,
//         author: blogAuthor,
//         content: blogContent,
//     }
//     id++;
//     allBlogs.push(newBlog); //store newBlog
//     // displayBlog(newBlog)
//     // resets input fields
//     blogTitleInput().value = '';
//     blogAuthorInput().value = '';
//     blogContentInput().value = '';
// }
// 3rd. creates function to add blog object data to html form and adds to div
// function displayBlog(blog) {
//     let div = document.createElement('div') //create div element
//     div.classList.add('blogCard') //add class to div
//     div.id = blog.id; // add id to div
//     // creates div content and adds blog data, created two buttons with onclick event
//     div.innerHTML = ` 
//     <h2 id="blogTitle">${blog.title}</h2>
//     <h3 id="blogAuthor">${blog.author}</h3>
//     <p id="blogContent">${blog.content}</p>
//     <br>
//     <button class="editBtn" type="submit" onclick='editBlogBtn(${blog.id})' id="${blog.id}">Edit</button>
//     <button class="dltBtn" type="submit" onclick='deleteBlogBtn(${blog.id})' id="${blog.id}">Delete</button>
//     `
//     blogCards().appendChild(div); //adds created div card to div on html to display
// }
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
// function displayDltBlogs(event, current, deleted) {
//     blogCards().innerHTML = ''; //clear all blog for div
//     if (event.target.value == `dltBlog`) {
//         for (const blog of deleted) {
//             blogCards().appendChild(blog)
//             console.log(blog)
//             // displayBlog(blog)
//         }
//     } else if (event.target.value == 'myBlog') {
//         for (const blog of current) {
//             displayBlog(blog)
//         }
//     }
// }
// add listener to select option to switch between current blogs and deleted blogs
// selectBlog().addEventListener('change', (event) => {
//     event.preventDefault();
//     displayDltBlogs(event, allBlogs, deletedBlogs)
// })
//add listenr to form to start process of creating blog
// blogForm().addEventListener('submit', (event) => {
//     event.preventDefault(); //stop auto refrech
//     validBlog(); //will check if vlog inputs have information
// })

// const blogFormEvent = () => {
//     blogForm().addEventListener('submit', createBlog);
// }

// ====================================================================
//add events without waiting for styles/images to finish loading

// document.addEventListener('DOMContentLoaded', () => {
//     // calls event 1st to display all current blogs
//     displayAllBlogs();
// });





blogForm().addEventListener('submit', (event) => {
    event.preventDefault(); //stop auto refrech
    // validBlog(); //will check if vlog inputs have information
    if(validBlog()){
        makeBlog(event);
    }
})


function validBlog() {
    if (!blogTitleInput().value || !blogAuthorInput().value || !blogContentInput().value) {
        console.log('error')
    }else{
        return true
    }
}

function makeBlog(){
    let blogTitle = blogTitleInput().value;
    let blogAuthor = blogAuthorInput().value;
    let blogContent = blogContentInput().value;
    const newBlog = {
        id: id,
        title: blogTitle,
        author: blogAuthor,
        content: blogContent,
    }
    saveBlog(newBlog); //store newBlog
    // resets input fields
    blogTitleInput().value = '';
    blogAuthorInput().value = '';
    blogContentInput().value = '';
}
//saves blog to database by using fetch.post and passing object
function saveBlog(newObject){
    fetch('http://localhost:3000/allBlogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)
    })
    .then(res => res.json())
    .then(data => console.log('Success:', data))
    .catch(err => console.log('Error:', err))
}
// select between all or removed blogs to display
selectBlog().addEventListener('change', (event) => {
    event.preventDefault();
    blogCards().innerHTML = ''; //clear all blog for div
    if(event.target.value == `myBlog`){
        displayAllBlogs()
    }else if(event.target.value == `dltBlog`){
        displayRemovedBlogs()
    }
})
//delete blog from blogs and add it to removed blogs
function deleteBlog(id){
    let dltBlog = document.getElementById(`${id}`)
    if(confirm('Are you sure?')){
        fetch(`http://localhost:3000/allBlogs`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
    }
    console.log()
    // removeBlog(dltBlog)

}

// function removeBlog(newObject){
//     fetch('http://localhost:3000/removedBlogs', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newObject)
//     })
//     .then(res => res.json())
//     .then(data => console.log('Success:', data))
//     .catch(err => console.log('Error:', err))
// }


//fetch blog data from server


const displayAllBlogs = () => {
    fetch(`http://localhost:3000/allBlogs`)
        .then(res => res.json())
        .then(blogsArray => {
            displayBlogs(blogsArray) //pass blog data to function
        })
        .catch(err => console.log(err))
}
const displayRemovedBlogs = () => {
    fetch(`http://localhost:3000/removedBlogs`)
        .then(res => res.json())
        .then(blogsArray => {
            displayBlogs(blogsArray) //pass blog data to function
        })
        .catch(err => console.log(err))
}
// display all blogs of passed array
function displayBlogs(blogsArray) {
    for (const blogObject of blogsArray) {
        let newCard = createCard(blogObject)
        displayThisBlog(newCard)
    }
}
//use blog object to create div to display
function createCard(blogObject) {
    let card = document.createElement('div');
    card.classList.add('blogCard');
    card.id = blogObject.id;
    card.innerHTML = ` 
    <h2 id="blogTitle">${blogObject.title}</h2>
    <h3 id="blogAuthor">${blogObject.author}</h3>
    <p id="blogContent">${blogObject.content}</p>
    <br>
    <button class="editBtn" type="submit" onclick='editBlog(${blogObject.id})' id="${blogObject.id}">Edit</button>
    <button class="dltBtn" type="submit" onclick='deleteBlog(${blogObject.id})' id="${blogObject.id}">Delete</button>
    `;
    return card
}


//function to display whatever div passed on page
function displayThisBlog(card) {
    blogCards().appendChild(card);
}

