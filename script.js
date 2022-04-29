const bookArea = document.getElementsByTagName('main')[0];
let myLibrary = JSON.parse(localStorage.getItem('library') || '[]');
const modal = document.getElementById('myModal');
const addBookBtn = document.getElementById('addBook');
const searchResults = document.getElementById('searchResults');

searchBar = document.getElementById('searchBar');

displayBook();

addBookBtn.onclick = openModal;

searchBar.addEventListener('input', debounce(searchBooks, 300));

//modal

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    searchBar.value = '';
    searchResults.innerHTML = '';
    modal.style.display = 'none';
}

window.onclick = function(e) {
    if (e.target == modal) {
        closeModal();
    }
}

 class Book {
     constructor(title, author, thumbnail) {
         this.title = title;
         this.author = author;
         this.thumbnail = thumbnail;
     }
 }

 function addBook(title, author, thumbnail) {
     let book = new Book(title, author, thumbnail);
     myLibrary.push(book);
     localStorage.setItem('library', JSON.stringify(myLibrary));
     closeModal();
     displayBook();
 }

 function removeBook(e) {
     className = e.currentTarget.parentNode.className;
     window.localStorage.removeItem('library');
     myLibrary.splice(className, 1);
     localStorage.setItem('library', JSON.stringify(myLibrary));
     displayBook();
 }

 function displayBook() {
     bookArea.innerHTML = '';
     bookArea.appendChild(addBookBtn);

     for (let i = 0;i<myLibrary.length;i++) {
         const newDiv = document.createElement('div');
         const textDiv = document.createElement('div');
         const bookDiv = document.createElement('div');
         const titleNode = document.createTextNode(`"${myLibrary[i].title}"`);
         const authorNode = document.createTextNode(myLibrary[i].author);
         const img = document.createElement('img');
         const para1 = document.createElement('p');
         const para2 = document.createElement('p');
         const removeButton = document.createElement('button');

         img.setAttribute('src', myLibrary[i].thumbnail);

         newDiv.classList.add(i);
         removeButton.textContent = 'Remove';

         para1.appendChild(titleNode);
         para2.appendChild(authorNode);
         textDiv.appendChild(para1);
         textDiv.appendChild(para2);
         newDiv.appendChild(img);
         newDiv.appendChild(textDiv);
         bookDiv.appendChild(newDiv);
         bookDiv.appendChild(removeButton);
         bookArea.appendChild(bookDiv);

         removeButton.addEventListener('click', (e) => {
             removeBook(e);
         });
     }
 }

 function displaySearchResults(data){

    searchResults.innerHTML = '';

    for (let i=0;i<data.items.length;i++) {
        let returnedTitle = data.items[i].volumeInfo.title;
        let returnedAuthor = data.items[i].volumeInfo.authors;
        let thumbnail;

        if (data.items[i].volumeInfo.imageLinks != undefined) {
            thumbnail = data.items[i].volumeInfo.imageLinks.thumbnail;
        } else {
            thumbnail = './images/nullCover.png'
        }

        const titleNode = document.createTextNode(returnedTitle);
        const authorNode = document.createTextNode(returnedAuthor);
        const para1 = document.createElement('p');
        const para2 = document.createElement('p');
        const img = document.createElement('img');
        const bookToDisplay = document.createElement('div');
        const bookInformation = document.createElement('div');

        img.setAttribute('src', thumbnail);

        para1.appendChild(titleNode);
        para2.appendChild(authorNode);
        bookInformation.appendChild(para1);
        bookInformation.appendChild(para2);
        bookToDisplay.appendChild(img);
        bookToDisplay.appendChild(bookInformation);

        bookToDisplay.addEventListener('click', addBook.bind(this, returnedTitle, returnedAuthor, thumbnail));

        searchResults.appendChild(bookToDisplay);
    }
}

function searchBooks(){
    let searchQuery = searchBar.value.replace(/\s/g, '+');
    if (searchQuery.length > 0) {
        getDataFromGoogleBooks(searchQuery);
    }
}

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
  };
}
function getDataFromGoogleBooks(searchQuery) {
    let response = fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyAJz7T2KwI4VncI6x_5Sa1uQpVelZelmTE`);
    response
        .then (data => data.json())
        .then (data => {
            displaySearchResults(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

