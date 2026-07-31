const myLibrary = [];

function Book(title, author, yearPublished, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, yearPublished, pages, readStatus) {
  let newBook = new Book(title, author, yearPublished, pages, readStatus);
  myLibrary.push(newBook);
}

addBookToLibrary("The Little Prince", "Antoine Saint-Exupery", "1943", "100", "read");
addBookToLibrary("Yellowface", "RF Kuang", "2023", "500", "unread");
addBookToLibrary("Small Boat", "Vincent Delacroix", "2023", "700", "unread");
addBookToLibrary("The Stranger", "Albert Camus", "1942", "1000", "unread")

const bookList = document.querySelector("#book-list");
renderLibrary(myLibrary, bookList)

function clearBookList() {
  bookList.replaceChildren()
}

function renderLibrary() {
  for (const book of myLibrary) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookList.appendChild(bookDiv);

    const latestBookTitle = document.createElement("h1");
    const latestBookAuthorYear = document.createElement("h3");
    latestBookAuthorYear.classList.add("header-author-year");

    const latestBookPagesAndReadStatus = document.createElement("p");
    latestBookPagesAndReadStatus.classList.add("p-pages-read-status");

    latestBookTitle.textContent = book.title;
    latestBookAuthorYear.textContent = `${book.author}, ${book.yearPublished}`;
    latestBookPagesAndReadStatus.textContent = `${book.pages} pages, ${book.readStatus}`;

    bookDiv.appendChild(latestBookTitle);
    bookDiv.appendChild(latestBookAuthorYear);
    bookDiv.appendChild(latestBookPagesAndReadStatus);

    const deleteBookBtn = Object.assign(document.createElement('button'), {
      textContent: 'Delete',
      onclick: () => deleteBook(book.id)
    })

    bookDiv.appendChild(deleteBookBtn)
  }
}

const addNewBookForm = document.querySelector("#form-add-new-book");
addNewBookForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let newBookAuthor = document.getElementById('new-book-author');
  if (newBookAuthor.value.trim() === '') {
    newBookAuthor.value = 'Unknown';
  };

  let newBookPublishingYear = document.getElementById('new-book-publishing-year');
  if (newBookPublishingYear.value.trim() === '') {
    newBookPublishingYear.value = 'Unknown';
  };

  let newBookPages = document.getElementById('new-book-pages');
  if (newBookPages.value.trim() === '') {
    newBookPages.value = 'Unknown';
  };

  createNewBook();
  addNewBookForm.reset()
});

function getBookInfo() {
  let title = document.getElementById('new-book-title').value;
  let author = document.getElementById('new-book-author').value;
  let yearPublished = document.getElementById('new-book-publishing-year').value;
  let pages = document.getElementById('new-book-pages').value;
  let readStatus = document.getElementById('read-status').value;

  return {title: title, author: author, yearPublished: yearPublished, pages: pages, readStatus: readStatus}
}

function createNewBook() {
  const {title, author, yearPublished, pages, readStatus} = getBookInfo();

  let newBook = new Book(title, author, yearPublished, pages, readStatus);
  myLibrary.push(newBook);
  clearBookList();
  renderLibrary();
}

function deleteBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id)

  myLibrary.splice(index, 1);
  clearBookList();
  renderLibrary()
}
