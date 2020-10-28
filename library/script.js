(function() {

    let library = {

        myLibrary: [],

        init: function() {
            this.getLocalStorage();
            this.cacheDom();
            this.bindEvents();
            this.populateLibrary();
        },

        cacheDom: function() {
            this.submitBook = document.querySelector('#submit-book');
            this.bookTitleInput = document.querySelector('#book-title-input');
            this.bookAuthorInput = document.querySelector('#book-author-input');
            this.bookPagesInput = document.querySelector('#book-pages-input');
            this.existingBooks = document.querySelector('#existing-books');
            this.bookTemplate = document.querySelector('#book-template');
            this.template = document.querySelector('#book-template');

        },

        bindEvents: function() {
            this.submitBook.addEventListener('click', this.submitForm.bind(this));

        },

        updateLocalStorage: function() {
            localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
        },


        getLocalStorage: function() {
            if (localStorage.getItem('myLibrary')) {
                this.myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
            }
        },

        submitForm: function(event) {
            event.preventDefault();
            let title = this.bookTitleInput.value;
            let author = this.bookAuthorInput.value;
            let pages = this.bookPagesInput.value;
            let read = document.querySelector('input[name="book-read-input"]:checked').value == "true";

            this.myLibrary.push(bookFactory(title, author, pages, read));
            this.updateLocalStorage();
            this.populateLibrary();
        },

        getBookTemplate: function() {
            return document.importNode(this.template.content, true);
        },

        addBookHTML: function(book, index) {
            let newBookHTML = this.bookTemplate.content.cloneNode(true);

            newBookHTML.querySelector('.book-number').textContent = `Book ${index + 1}`;
            newBookHTML.querySelector('.book-title').textContent = book.title;
            newBookHTML.querySelector('.book-author').textContent = book.author;
            newBookHTML.querySelector('.book-pages').textContent = book.pages;
            newBookHTML.querySelector('.book-read').textContent = book.read ? 'Yes' : 'No';
            newBookHTML.querySelector('.have-read').textContent = book.read ? 'Haven\'t read' : 'Have read';
            newBookHTML.querySelector('.book').setAttribute('data-book-id', index);
            newBookHTML.querySelector('.have-read').addEventListener('click', () => this.toggleBookReadStatus(index));
            newBookHTML.querySelector('.delete-book').addEventListener('click', () => this.removeBookFromLibrary(index));


            this.existingBooks.appendChild(newBookHTML);
        },


        removeBookFromLibrary: function(index) {
            this.myLibrary.splice(index, 1);
            this.updateLocalStorage();
            this.populateLibrary();
        },

        toggleBookReadStatus: function(index) {
            this.myLibrary[index].read = !this.myLibrary[index].read;
            this.updateLocalStorage();
            this.populateLibrary();
        },

        populateLibrary: function() {
            this.existingBooks.innerHTML = '';
            this.myLibrary.forEach(this.addBookHTML.bind(this));
        }

    };


    let bookFactory = (title, author, pages, read) => {

        return { title, author, pages, read }
    }

    library.init();

})();