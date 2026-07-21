const myLibrary = [];

function Book(title, author, yearPublished, read) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, yearPublished, read) {
  let newBook = new Book(title, author, yearPublished, read);
  myLibrary.push(newBook);
}

addBookToLibrary("The Little Prince", "Antoine Saint-Exupery", "1943", "read");
addBookToLibrary("Yellowface", "RF Kuang", "2023", "unread");
addBookToLibrary("Small Boat", "Delacroix", "2023", "unread");
addBookToLibrary("The Stranger", "Albert Camus", "1942", "unread")

const bookList = document.querySelector("#book-list");

for (i = 0; i < myLibrary.length; i++) {
  const latestBook = document.createElement("p");
  latestBook.textContent = `${myLibrary[i].title}, by ${myLibrary[i].author}, ${myLibrary[i].yearPublished}.`;
  bookList.appendChild(latestBook)
}

function createNewBook(title, author, year) {
  const newBook = document.createElement("p");
  newBook.textContent = `${title}, by ${author}, ${year}.`
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
