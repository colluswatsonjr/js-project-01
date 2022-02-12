const createCardForm = () => document.getElementById('createBlogForm');
const titleInput = () => document.getElementById('blogTitleInput');
const authorInput = () => document.getElementById('blogAuthorInput');
const contentInput = () => document.getElementById('blogContentInput');

const cardContainer = () => document.getElementById('blogCards');
const cardSelector = () => document.getElementById('selectBlogs');
let currentCards = cardSelector().value;

// FETCH REQUESTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//fetch request data.. gets blog data from server
function fetchCardData(selectContainer = currentCards){ //gets data from server and creates card
    cardContainer().innerHTML = ''; //empties container of all cards
    fetch(`http://localhost:3000/${selectContainer}`)
    .then(res => res.json())
    .then(data => {
        let array = data;
        array.forEach(object => {
            createCard(object, selectContainer)    
        });
    })
    .catch(err => console.log('Err, failed to fetchCardData', err))
}
function addData(object, selectContainer){ //post request to add object to selected container 
    fetch(`http://localhost:3000/${selectContainer}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then(data => console.log('Success add:', data))
    .catch(err => console.log('Fail add:', err))
}
function updateData(object, selectContainer){ //Patch request to updata data
    console.log(object, selectContainer)
    fetch(`http://localhost:3000/${selectContainer}/${object.id}`,{
        method:'PATCH',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then(data => console.log('Success update:', data))
    .catch(err => console.log('Failure: ', err))
}
function deleteData(object, selectContainer = currentCards){ //delete data by selecting container and object
    fetch(`http://localhost:3000/${selectContainer}/${object.id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log('Success delete', data))
    .catch(err => console.log('Fail delete', err))
}

// FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function createCard(object, container){ //create card and fills in object data, adds to html container

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
    <button id="restoreBtn" type="submit">Restore</button>
    <button id="deleteBtn" type="submit">Delete</button>
    `;
    card.querySelector('#saveBtn').style.display = 'none'
    card.querySelector('#cancelBtn').style.display = 'none'
    card.querySelector('#restoreBtn').style.display = 'none'

    if(container == 'removedCards'){
        card.querySelector('#removeBtn').style.display = 'none'
        card.querySelector('#restoreBtn').style.display = ''
    }

    // created event listeners for buttons
    card.querySelector('#editBtn').addEventListener('click', (e)=>{
        e.preventDefault();
        editCardData(card, object);
    })    
    card.querySelector('#removeBtn').addEventListener('click', (e)=>{ //delete from current, add to removed container
        e.preventDefault();
        addData(object, 'removedCards')
        deleteData(object, 'currentCards')
    })
    card.querySelector('#restoreBtn').addEventListener('click', (e)=>{ //add object to current and deletes from removed
        e.preventDefault();
        addData(object, 'currentCards')
        deleteData(object, 'removedCards')
    })
    card.querySelector('#deleteBtn').addEventListener('click', (e)=>{ //deletes from current container after confirming
        e.preventDefault();
        
        if (confirm("Are you sure??")) {
            deleteData(object);
          }
    })    

    cardContainer().appendChild(card)
}

function editCardData(card, object){
    card.querySelector('#editBtn').style.display = 'none'
    card.querySelector('#removeBtn').style.display = 'none'
    card.querySelector('#deleteBtn').style.display = 'none'
    card.querySelector('#restoreBtn').style.display = 'none'
    card.querySelector('#saveBtn').style.display = ''
    card.querySelector('#cancelBtn').style.display = ''
    card.querySelector('#cardTitle').contentEditable = 'true';
    card.querySelector('#cardAuthor').contentEditable = 'true';
    card.querySelector('#cardContent').contentEditable = 'true';

    card.querySelector('#saveBtn').addEventListener('click', (e)=>{
        e.preventDefault();
        let newTitle = card.querySelector('#cardTitle');
        let newAuthor = card.querySelector('#cardAuthor');
        let newContent = card.querySelector('#cardContent');
        object.title = newTitle.innerHTML
        object.author = newAuthor.innerHTML
        object.content = newContent.innerHTML
        updateData(object, currentCards);
        fetchCardData(cardSelector().value)
    })
    card.querySelector('#cancelBtn').addEventListener('click', (e)=>{
        e.preventDefault();
        fetchCardData(cardSelector().value)
    })
}

//EVENT LISTENERS
createCardForm().addEventListener('submit', (e)=>{ //create new card, adds card to current card data
    e.preventDefault();
    console.log('create card')
    let newCard = {
        title: titleInput().value,
        author: authorInput().value,
        content: contentInput().value
    }
    addData(newCard, 'currentCards');

    // resets input fields
    titleInput().value = '';
    authorInput().value = '';
    contentInput().value = '';
})
cardSelector().addEventListener('change', (e)=>{
    e.preventDefault();
    cardSelector().value = e.target.value
    currentCards = cardSelector().value
    console.log(currentCards)
    fetchCardData(currentCards)
})

document.addEventListener('DOMContentLoaded', (event) => {
    fetchCardData(cardSelector().value); //fetch request with current value of selector
    console.log('DOM fully loaded and parsed');
});























