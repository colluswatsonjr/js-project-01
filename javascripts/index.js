// rewrite code to allow not take inner html, and rather creats card and enters information




const createCardForm = () => document.getElementById('createBlogForm');
const titleInput = () => document.getElementById('blogTitleInput');
const authorInput = () => document.getElementById('blogAuthorInput');
const contentInput = () => document.getElementById('blogContentInput');

const cardContainer = () => document.getElementById('blogCards');
const cardSelector = () => document.getElementById('selectBlogs');
let selectCards = cardSelector().value;

fetchCardData(selectCards)



// FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function createCard(object, container){ //create card and fills in object data, adds to html container

    let card = document.createElement('div')
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
    card.querySelector('#editBtn').addEventListener('click', (e)=>{ //edit button, calls fucntion
        // e.preventDefault();
        editCardData(card, object);
    })    
    card.querySelector('#removeBtn').addEventListener('click', (e)=>{ //delete from current, add to removed container
        e.preventDefault();
        deleteData(object, 'currentCards')
        object.id = '';
        addData(object, 'removedCards')
        fetchCardData(selectCards)

    })
    card.querySelector('#restoreBtn').addEventListener('click', (e)=>{ //add object to current and deletes from removed
        // e.preventDefault();
        deleteData(object, 'removedCards')
        object.id = '';
        addData(object, 'currentCards')
        fetchCardData(selectCards)
    })
    card.querySelector('#deleteBtn').addEventListener('click', (e)=>{ //deletes from current container after confirming
        // e.preventDefault();
        if (confirm("Are you sure??")) {
            deleteData(object);
            fetchCardData(selectCards);
          }
    })    

    return card
}

function editCardData(card, object){ //hides/unhides buttons,add listener to them. 
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
        let newTitle = '';
        let newAuthor = '';
        let newContent = '';
        let newData = {
            title: card.querySelector('#cardTitle').innerHTML,
            author: card.querySelector('#cardAuthor').innerHTML,
            content: card.querySelector('#cardContent').innerHTML,
            id: object.id
        }
        // object.title = newTitle.innerHTML
        // object.author = newAuthor.innerHTML
        // object.content = newContent.innerHTML
        // console.log(object)
        // console.log(newData)
        updateData(newData)
        // fetchCardData(selectCards);
    })
    card.querySelector('#cancelBtn').addEventListener('click', (e)=>{
        e.preventDefault();
        fetchCardData()
        console.log(selectCards)
    })


}

// FETCH REQUESTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//fetch request data.. gets blog data from server
function fetchCardData(selectContainer = selectCards){ //gets data from server and creates card
    cardContainer().innerHTML = ''; //empties container of all cards
    fetch(`http://localhost:3000/${selectContainer}`)
    .then(res => res.json())
    .then(data => {
        let array = data;
        array.forEach(object => {
            let card = createCard(object, selectContainer)
            return cardContainer().appendChild(card)
        });
        
    })
    .catch(err => console.log('Err, failed to fetchCardData', err))
}
function addData(object, selectContainer){ //post request to add object to selected container 
    fetch(`http://localhost:3000/${selectContainer}`,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log('Fail add:', err))
    fetchCardData(selectCards)
}
function updateData(object, selectContainer){ //Patch request to updata data
    fetch(`http://localhost:3000/${selectCards}/${object.id}`,{
        method:'PATCH',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then(data => {
        return object = data
    })
    .catch(err => console.log('Failure: ', err))
    // fetchCardData(selectCards)
}
function deleteData(object, selectContainer = selectCards){ //delete data by selecting container and object
    fetch(`http://localhost:3000/${selectContainer}/${object.id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log('Fail delete', err))
    fetchCardData(selectCards)
}
//EVENT LISTENERS
cardSelector().addEventListener('change', (e)=>{
    e.preventDefault();
    cardSelector().value = e.target.value
    selectCards = cardSelector().value
    fetchCardData(selectCards)
    console.log(selectCards)
})
createCardForm().addEventListener('submit', (e)=>{ //create new card, adds card to current card data
    e.preventDefault();
    // console.log('create card')
    let newCard = {
        title: titleInput().value,
        author: authorInput().value,
        content: contentInput().value
    }
    addData(newCard, 'currentCards');
    fetchCardData(selectCards)
    // resets input fields
    titleInput().value = '';
    authorInput().value = '';
    contentInput().value = '';
})

// document.addEventListener('DOMContentLoaded', (event) => {
//     event.preventDefault();
//     // fetchCardData(selectCards);//fetch request with current value of selector

//     console.log('DOM fully loaded and parsed');
// });
























