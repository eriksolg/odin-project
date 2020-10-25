let myLibrary = [];
if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
}


const submitBook = document.querySelector('#submit-book');
const bookTitleInput = document.querySelector('#book-title-input');
const bookAuthorInput = document.querySelector('#book-author-input');
const bookPagesInput = document.querySelector('#book-pages-input');
const existingBooks = document.querySelector('#existing-books');
const bookTemplate = document.querySelector('#book-template');

submitBook.addEventListener('click', submitForm);

function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? "have read" : "not read yet"}`;
    }
}

function submitForm(event) {
    event.preventDefault();
    let title = bookTitleInput.value;
    let author = bookAuthorInput.value;
    let pages = bookPagesInput.value;
    let read = document.querySelector('input[name="book-read-input"]:checked').value == "true";

    myLibrary.push(new Book(title, author, pages, read));
    updateLocalStorage();
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
    newBookHTML.querySelector('.book-read').textContent = book.read ? 'Yes' : 'No';
    newBookHTML.querySelector('.have-read').textContent = book.read ? 'Haven\'t read' : 'Have read';
    newBookHTML.querySelector('.book').setAttribute('data-book-id', index);
    newBookHTML.querySelector('.have-read').addEventListener('click', () => toggleBookReadStatus(index));
    newBookHTML.querySelector('.delete-book').addEventListener('click', () => removeBookFromLibrary(index));


    existingBooks.appendChild(newBookHTML);
}


function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    updateLocalStorage();
    populateLibrary();
}

function toggleBookReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    updateLocalStorage();
    populateLibrary();
}

function populateLibrary() {
    existingBooks.innerHTML = '';
    myLibrary.forEach(addBookHTML);
}


populateLibrary();