let myLibrary = [];
const bookForm = document.querySelector('#book-form');
const bookTitleInput = document.querySelector('#book-title-input');
const bookAuthorInput = document.querySelector('#book-author-input');
const bookPagesInput = document.querySelector('#book-pages-input');

const existingBooks = document.querySelector('#existing-books');
const bookTemplate = document.querySelector('#book-template');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? "have read" : "not read yet"}`;
    }
}

function submitForm() {
    let title = bookTitleInput.value;
    let author = bookAuthorInput.value;
    let pages = bookPagesInput.value;
    myLibrary.push(new Book(title, author, pages, false));
    populateLibrary();
}

function getBookTemplate() {
    let template = document.querySelector('#book-template');
    return document.importNode(template.content, true);
}

function addBookHTML(book, index) {
    let newBookHTML = bookTemplate.content.cloneNode(true);

    newBookHTML.querySelector('.book-number').textContent = `Book ${index + 1}`;
    newBookHTML.querySelector('.book-title').textContent = book.title;
    newBookHTML.querySelector('.book-author').textContent = book.author;
    newBookHTML.querySelector('.book-pages').textContent = book.pages;

    existingBooks.appendChild(newBookHTML);
}

bookForm.addEventListener('submit', submitForm);

function removeBookFromLibrary(book) {}

function toggleBookReadStatus(book) {}

function populateLibrary() {
    existingBooks.innerHTML = '';
    myLibrary.forEach(addBookHTML);
}