const form = document.querySelector('form');
const bookArea = document.getElementById('bookArea');
let myLibrary = JSON.parse(localStorage.getItem('library') || '[]');

const clearBtn = document.getElementById('clearAll');

clearBtn.addEventListener('click', () => {
    window.localStorage.removeItem('library');
    myLibrary = [];
    bookArea.innerHTML = '';
});

displayBook();

form.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    addBook();
    clearForm();
    displayBook();
}

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}

function addBook() {
    const inputTitle = document.getElementById('inputTitle').value;
    const inputAuthor = document.getElementById('inputAuthor').value;
    const inputPages = document.getElementById('inputPages').value;

    let book = new Book(inputTitle, inputAuthor, inputPages);
    myLibrary.push(book);
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function displayBook() {
    bookArea.innerHTML = '';

    myLibrary.forEach(element => {
        const para = document.createElement('p');
        const node = document.createTextNode(`${element.title} by ${element.author} is ${element.pages} pages!`);
        para.appendChild(node);
        bookArea.appendChild(para);
    });
}

function clearForm() {
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
}