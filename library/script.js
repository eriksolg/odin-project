let library = (function() {

    let myLibrary = [];
    let submitBook;
    let bookTitleInput;
    let bookAuthorInput;
    let bookPagesInput;
    let existingBooks;
    let bookTemplate;
    let template;

    getLocalStorage();
    cacheDom();
    bindEvents();
    populateLibrary();

    function cacheDom() {
        submitBook = document.querySelector('#submit-book');
        bookTitleInput = document.querySelector('#book-title-input');
        bookAuthorInput = document.querySelector('#book-author-input');
        bookPagesInput = document.querySelector('#book-pages-input');
        existingBooks = document.querySelector('#existing-books');
        bookTemplate = document.querySelector('#book-template');
        template = document.querySelector('#book-template');
    };

    function bindEvents() {
        submitBook.addEventListener('click', submitForm.bind(this));

    };

    function updateLocalStorage() {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    };

    function populateLibrary() {
        existingBooks.innerHTML = '';
        myLibrary.forEach(addBookHTML.bind(this));
    };

    function getLocalStorage() {
        if (localStorage.getItem('myLibrary')) {
            myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        }
    };

    function submitForm(event) {
        event.preventDefault();
        let title = bookTitleInput.value;
        let author = bookAuthorInput.value;
        let pages = bookPagesInput.value;
        let read = document.querySelector('input[name="book-read-input"]:checked').value == "true";

        myLibrary.push(bookFactory(title, author, pages, read));
        updateLocalStorage();
        populateLibrary();
    };

    function getBookTemplate() {
        return document.importNode(template.content, true);
    };

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
    };


    function removeBookFromLibrary(index) {
        myLibrary.splice(index, 1);
        updateLocalStorage();
        populateLibrary();
    };

    function toggleBookReadStatus(index) {
        myLibrary[index].read = !myLibrary[index].read;
        updateLocalStorage();
        populateLibrary();
    }

    let bookFactory = (title, author, pages, read) => {

        return { title, author, pages, read }
    }


})();