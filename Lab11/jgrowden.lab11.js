// consts to store references to HTML elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const bookList = document.getElementById('bookList');
const bookDetails = document.getElementById('bookDetails');
const readingList = document.getElementById('readingList');

// event listener for the search
searchButton.addEventListener('click', searchBooks);

//
// function to use the google api
function searchBooks() {
    // Clear previous results
    bookList.innerHTML = '';

    // Get user's search query
    const query = searchInput.value.trim();

    // Make sure the query isnt empty
    if (query === '') {
        alert('Please enter a book title or author.');
        return;
    }

    // Make a request to the Google Books API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(response => response.json())
        .then(data => {
            // check the API response and create books
            const books = data.items.map(item => {
                const book = {
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                    description: item.volumeInfo.description || 'No description available',
                    thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
                    read: false
                };
                return book;
            });

            // Display the books in the book list
            books.forEach(book => {
                const bookElement = createBookElement(book);
                bookList.appendChild(bookElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while searching for books. Please try again.');
        });
}

// Function to create a book
function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.textContent = book.title;

    const authorElement = document.createElement('div');
    authorElement.classList.add('author');
    authorElement.textContent = book.author;

    const expandButton = document.createElement('button');
    expandButton.textContent = 'Expand';
    expandButton.addEventListener('click', () => {
        showBookDetails(book);
    });

    const addToReadingListButton = document.createElement('button');
    addToReadingListButton.textContent = 'Add to Reading List';
    addToReadingListButton.addEventListener('click', () => {
        addToReadingList(book);
    });

    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(expandButton);
    bookElement.appendChild(addToReadingListButton);


    return bookElement;
}

// Function to display book details
function showBookDetails(book) {
    bookDetails.innerHTML = '';

    const titleElement = document.createElement('h2');
    titleElement.textContent = book.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${book.author}`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = book.description;

    const thumbnailElement = document.createElement('img');
    thumbnailElement.src = book.thumbnail;
    thumbnailElement.alt = book.title;

    bookDetails.appendChild(titleElement);
    bookDetails.appendChild(authorElement);
    bookDetails.appendChild(descriptionElement);
    bookDetails.appendChild(thumbnailElement);

    bookDetails.style.display = 'block';
}

// Initialize the reading list from local storage
const savedBooks = JSON.parse(localStorage.getItem('readingList')) || [];

// Function to add a book to the reading list
function addToReadingList(book) {
    savedBooks.push({ ...book, read: false });
    localStorage.setItem('readingList', JSON.stringify(savedBooks));
    showReadingList();
}

// Function to remove a book from list
function removeFromReadingList(bookId) {
    const index = savedBooks.findIndex(book => book.id === bookId);
    if (index !== -1) {
        savedBooks.splice(index, 1);
        localStorage.setItem('readingList', JSON.stringify(savedBooks));
        showReadingList();
    }
}

// Function to display the list
function showReadingList() {
    readingList.innerHTML = '';

    if (savedBooks.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your reading list is empty.';
        readingList.appendChild(emptyMessage);
    } else {
        savedBooks.forEach(book => {
            const bookElement = createBookElement(book);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromReadingList(book.id);
            });

            bookElement.appendChild(removeButton);
            readingList.appendChild(bookElement);
        });
            }
        }
        //displaying the list
        showReadingList();