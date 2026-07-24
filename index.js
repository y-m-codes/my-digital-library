const myLibrary = [];

function Book(title, author, yearPublished, pages, read) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, yearPublished, pages, read) {
  let newBook = new Book(title, author, yearPublished, pages, read);
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
  bookList.appendChild(latestBookTile);

  const latestBookTitle = document.createElement("h1");
  const latestBookAuthorYear = document.createElement("h3");
  latestBookAuthorYear.classList.add("header-author-year");

  const latestBookPagesAndRead = document.createElement("p");
  latestBookPagesAndRead.classList.add("p-pages-read");

  latestBookTitle.textContent = myLibrary[i].title;
  latestBookAuthorYear.textContent = `${myLibrary[i].author}, ${myLibrary[i].yearPublished}`;
  latestBookPagesAndRead.textContent = `${myLibrary[i].pages} pages, ${myLibrary[i].read}`;

  latestBookTile.appendChild(latestBookTitle);
  latestBookTile.appendChild(latestBookAuthorYear);
  latestBookTile.appendChild(latestBookPagesAndRead);
  }
}

function createNewBook() {
  const {title, author, yearPublished, pages, read} = getBookInfo();

  let newBook = new Book(title, author, yearPublished, pages, read);
  myLibrary.push(newBook);
  clearBookList();
  renderLibrary()
}

function getBookInfo() {
  let title = prompt("What's the book's title?");
  let author = prompt("Who wrote it?");
  let yearPublished = prompt("When was it published?");
  let pages = prompt("How many pages in this book?");
  let read = prompt("Have you read it?");

  // return new Book(title, author, yearPublished, pages, read);
  return {title: title, author: author, yearPublished: yearPublished, pages: pages, read: read}
}

const newBookBtn = document.querySelector("#btn-new-book");
newBookBtn.addEventListener("click", createNewBook);
