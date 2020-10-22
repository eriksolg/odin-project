let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? "have read" : "not read yet"}`;
    }
}

function getUserInput() {}

function addBookToLibrary(title, author, pages, read) {}

function removeBookFromLibrary(book) {}

function toggleBookReadStatus(book) {}

function populateBookTable() {}