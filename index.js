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
  for (i = 0; i < myLibrary.length; i++) {
  const latestBookTile = document.createElement("div");
  latestBookTile.classList.add("latest-book-tile");
  let bookTitle = myLibrary[i].title;
  latestBookTile.id = bookTitle.replace(" ", "");
  bookList.appendChild(latestBookTile);

  const latestBookTitle = document.createElement("h1");
  const latestBookAuthorYear = document.createElement("h3");
  latestBookAuthorYear.classList.add("header-author-year");

  const latestBookPagesAndReadStatus = document.createElement("p");
  latestBookPagesAndReadStatus.classList.add("p-pages-read-status");

  latestBookTitle.textContent = myLibrary[i].title;
  latestBookAuthorYear.textContent = `${myLibrary[i].author}, ${myLibrary[i].yearPublished}`;
  latestBookPagesAndReadStatus.textContent = `${myLibrary[i].pages} pages, ${myLibrary[i].readStatus}`;

  latestBookTile.appendChild(latestBookTitle);
  latestBookTile.appendChild(latestBookAuthorYear);
  latestBookTile.appendChild(latestBookPagesAndReadStatus);
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

// test: try to delete just "The Stranger"
let deleteTheStrangerBtn = document.createElement("button");
deleteTheStrangerBtn.textContent = "Delete"
deleteTheStrangerBtn.classList.add("btn-delete-the-stranger");
deleteTheStrangerBtn.addEventListener("click", deleteBook);
const theStrangerTile = document.querySelector("#TheStranger");
theStrangerTile.appendChild(deleteTheStrangerBtn);

function deleteBook(event) {
let clickedElement = event.target.parentElement;
clickedElement.remove();

// console.log("event.target", event.target);
// console.log("event.target.parentElement", event.target.parentElement);
}
