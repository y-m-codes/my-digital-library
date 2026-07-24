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

// for (i = 0; i < myLibrary.length; i++) {
//   const latestBook = document.createElement("p");
//   latestBook.textContent = `${myLibrary[i].title}, by ${myLibrary[i].author}, published ${myLibrary[i].yearPublished}, ${myLibrary[i].pages} pages, ${myLibrary[i].read}.`;
//   bookList.appendChild(latestBook)
// }

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
  latestBookPagesAndRead.textContent = myLibrary[i].pages;

  latestBookTile.appendChild(latestBookTitle);
  latestBookTile.appendChild(latestBookAuthorYear);
  latestBookTile.appendChild(latestBookPagesAndRead);
}

function createNewBook(title, author, year) {
  const newBook = document.createElement("p");
  newBook.textContent = `${title}, by ${author}, published ${year}.`
  bookList.appendChild(newBook)
}

function newBookInfo() {
  let title = prompt("What's the book's title?");
  let author = prompt("Who wrote it?");
  let yearPublished = prompt("When was it published?");

  createNewBook(title, author, yearPublished)
}

const newBookBtn = document.querySelector("#btn-new-book");
newBookBtn.addEventListener("click", newBookInfo);
