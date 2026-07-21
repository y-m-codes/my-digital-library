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

// console.log("myLibrary", myLibrary);
// console.log("myLibrary[0].title", myLibrary[0].title)
// console.log("myLibrary[0].author", myLibrary[0].author)
// console.log("myLibrary[0].yearPublished", myLibrary[0].yearPublished)
// console.log("myLibrary[0].read", myLibrary[0].read)

const bookList = document.querySelector("#book-list");
const newBookBtn = document.querySelector("#new-book");

// const listedBook = document.querySelector("#book-one");
// listedBook.textContent = myLibrary[0].title;

for (i = 0; i < myLibrary.length; i++) {
  const latestBook = document.createElement("p");
  latestBook.textContent = myLibrary[i].title;
  bookList.appendChild(latestBook)
}
