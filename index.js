const myLibrary = [];

function Book(title, author, year, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

function addBook(title, author, year, pages, readStatus) {
  let newBook = new Book(title, author, year, pages, readStatus);
  myLibrary.push(newBook);
}

addBook("The Little Prince", "Antoine Saint-Exupery", "1943", "100", "read");
addBook("Yellowface", "RF Kuang", "2023", "500", "unread");
addBook("Small Boat", "Vincent Delacroix", "2023", "700", "unread");
addBook("The Stranger", "Albert Camus", "1942", "1000", "unread")

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

    const bookTitle = document.createElement("h1");
    const subtitle = document.createElement("h3");
    subtitle.classList.add("subtitle");

    const details = document.createElement("p");
    details.classList.add("details");

    bookTitle.textContent = book.title;
    subtitle.textContent = `${book.author}, ${book.year}`;
    details.textContent = `${book.pages} pages, ${book.readStatus}`;

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(subtitle);
    bookDiv.appendChild(details);

    const deleteBookBtn = Object.assign(document.createElement('button'), {
      textContent: 'Delete',
      onclick: () => deleteBook(book.id)
    })

    bookDiv.appendChild(deleteBookBtn)
  }
}

const newBookForm = document.querySelector("#new-book-form");
newBookForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let author = document.getElementById('author');
  if (author.value.trim() === '') {
    author.value = 'Unknown';
  };

  let year = document.getElementById('year');
  if (year.value.trim() === '') {
    year.value = 'Unknown';
  };

  let pages = document.getElementById('pages');
  if (pages.value.trim() === '') {
    pages.value = 'Unknown';
  };

  createNewBook();
  newBookForm.reset()
});

function getBookInfo() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let year = document.getElementById('year').value;
  let pages = document.getElementById('pages').value;
  let readStatus = document.getElementById('read-status').value;

  return {title: title, author: author, year: year, pages: pages, readStatus: readStatus}
}

function createNewBook() {
  const {title, author, year, pages, readStatus} = getBookInfo();

  let newBook = new Book(title, author, year, pages, readStatus);
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
