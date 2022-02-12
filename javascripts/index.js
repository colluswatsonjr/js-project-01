const createCardForm = () => document.getElementById('createBlogForm');
const titleInput = () => document.getElementById('blogTitleInput');
const authorInput = () => document.getElementById('blogAuthorInput');
const contentInput = () => document.getElementById('blogContentInput');
const cardSelector = () => document.getElementById('selectBlogs');
const cardContainer = () => document.getElementById('blogCards');

// Grabs created buttons in created cards
const editBtn = () => document.getElementById('editBtn') //edit button
const saveBtn = () => document.getElementById('saveBtn') //save button
const cancelBtn = () => document.getElementById('cancelBtn') //cancel button
const removeBtn = () => document.getElementById('removeBtn') //remove button
const deleteBtn = () => document.getElementById('deleteBtn') //delete button


// FETCH REQUESTS
//fetch request data.. gets blog data from server
function fetchCardData(selectBlog = 'currentBlogs'){ //gets data from server and creates card
    fetch(`http://localhost:3000/${selectBlog}`)
    .then(res => res.json())
    .then(data => {
        let array = data;
        array.forEach(object => {
            createCard(object)    
        });
    })
    .catch(err => console.log('Err, failed to fetchCardData', err))
}

// FUNCTIONS
function createCard(object){ //create card and fills in object data, adds to html container
    let card = document.createElement('div')
    card.id = object.id;
    card.innerHTML = `
    <h2 id="cardTitle">${object.title}</h2>
    <h4 id="cardAuthor">${object.author}</h4>
    <h3 id="cardContent">${object.content}</h3>
    <br>
    <button id="editBtn" type="submit">Edit</button>
    <button id="saveBtn" type="submit">Save</button>
    <button id="cancelBtn" type="submit">Cancel</button>
    <button id="removeBtn" type="submit">Remove</button>
    <button id="deleteBtn" type="submit">Delete</button>
    `;
    cardContainer().appendChild(card)
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchCardData();
    console.log('DOM fully loaded and parsed');
});


























