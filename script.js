const form = document.querySelector('form');
const bookArea = document.getElementsByTagName('main')[0];
let myLibrary = JSON.parse(localStorage.getItem('library') || '[]');
const modal = document.getElementById('myModal');
const addBookBtn = document.getElementById('addBook');


 const inputAuthor = document.getElementById('inputAuthor').value;
 const inputPages = document.getElementById('inputPages').value;

// const clearBtn = document.getElementById('clearAll');

//modal

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

addBookBtn.onclick = openModal;

window.onclick = function(e) {
    if (e.target == modal) {
        closeModal();
    }
}

displayBook();

form.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    const inputTitle = document.getElementById('inputTitle').value;
    inputTitle.replace(/\s/g, '+');
    searchBooks(inputTitle);
    closeModal();
    addBook();
    clearForm();
    displayBook();
}

// class Book {
//     constructor(title, author, pages) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//     }
// }

// function addBook() {
//     let book = new Book(inputTitle, inputAuthor, inputPages);
//     myLibrary.push(book);
//     localStorage.setItem('library', JSON.stringify(myLibrary));
// }

// function removeBook(e) {
//     //get class of book item which correlates to the index
//     className = e.currentTarget.parentNode.className;
    
//     //remove arr from storage and remove book obj based on index, then add back into storage, then redisplay books

//     window.localStorage.removeItem('library');
//     myLibrary.splice(className, 1);
//     localStorage.setItem('library', JSON.stringify(myLibrary));

//     displayBook();
// }

function clearForm() {
    inputTitle.value = '';
    // inputAuthor.value = '';
    // inputPages.value = '';
}

// function displayBook() {
//     bookArea.innerHTML = '';
//     bookArea.appendChild(addBookBtn);

//     for (let i = 0;i<myLibrary.length;i++) {
//         const newDiv = document.createElement('div');
//         newDiv.classList.add(i);

//         const titleNode = document.createTextNode(`"${myLibrary[i].title}"`);
//         const authorNode = document.createTextNode(myLibrary[i].author);
//         const pagesNode = document.createTextNode(`${myLibrary[i].pages} pages`);

//         const para1 = document.createElement('p');
//         const para2 = document.createElement('p');
//         const para3 = document.createElement('p');

//         const removeButton = document.createElement('button');
//         removeButton.textContent = 'Remove';

//         para1.appendChild(titleNode);
//         para2.appendChild(authorNode);
//         para3.appendChild(pagesNode);
//         newDiv.appendChild(para1);
//         newDiv.appendChild(para2);
//         newDiv.appendChild(para3);
//         newDiv.appendChild(removeButton);
//         bookArea.appendChild(newDiv);

//         removeButton.addEventListener('click', (e) => {
//             removeBook(e);
//         });
//     }
// }

function searchBooks(inputTitle) {



    fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputTitle}&key=AIzaSyAJz7T2KwI4VncI6x_5Sa1uQpVelZelmTE`).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
  }).catch(function() {
    console.log("Booo");
  });
}

