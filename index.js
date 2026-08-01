const myLibrary = [];

const READ = "read";
const UNREAD = "unread"

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

addBook("The Little Prince", "Antoine Saint-Exupery", "1943", "100", READ);
addBook("Yellowface", "RF Kuang", "2023", "500", UNREAD);
addBook("Small Boat", "Vincent Delacroix", "2023", "700", UNREAD);
addBook("The Stranger", "Albert Camus", "1942", "1000", UNREAD);
addBook("A Tale of Two Cities", "Charles Dickens", "1859", "2000", UNREAD);
addBook("Harry Potter and the Philosopher's Stone", "J. K. Rowling", "1997", "1300", UNREAD);
addBook("And Then There Were None", "Agatha Christie", "1939", "1500", UNREAD);
addBook("Dream of the Red Chamber", "Cao Xueqin", "1791", "10000", UNREAD);
addBook("The Murder of Roger Ackroyd", "Agatha Christie", "1926", "800", UNREAD);

const bookList = document.querySelector("#book-list");
renderLibrary(myLibrary, bookList)

function clearBookList() {
  bookList.replaceChildren()
}

function renderLibrary(library) {
  for (const book of library) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookList.appendChild(bookDiv);

    const bookTitle = document.createElement("h2");
    const subtitle = document.createElement("h3");
    subtitle.classList.add("subtitle");

    const bookPages = document.createElement("p");
    bookPages.classList.add("pages");

    bookTitle.textContent = book.title;
    subtitle.textContent = `${book.author}, ${book.year}`;
    bookPages.textContent = `${book.pages} pages`;

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(subtitle);
    bookDiv.appendChild(bookPages);

    const readStatusOptions = [
      { value: UNREAD, text: "Unread" },
      { value: READ, text: "Read" },
    ];

    const dropdown = document.createElement("select");
    dropdown.id = "read-status";

    readStatusOptions.forEach(readSelection => {
    const option = document.createElement("option");
    option.value = readSelection.value;
    option.textContent = readSelection.text;
    dropdown.appendChild(option);
    });

    // dropdown.value = UNREAD;

    dropdown.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === READ) {
      book.readStatus = READ
    }
    else if (selectedValue === UNREAD) {
      book.readStatus = UNREAD
    }
    });

    bookDiv.appendChild(dropdown);

    const deleteBookBtn = Object.assign(document.createElement('button'), {
      textContent: 'Delete',
      onclick: () => deleteBook(book.id)
    });
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
  renderLibrary(myLibrary);
}

function deleteBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id)

  myLibrary.splice(index, 1);
  clearBookList();
  renderLibrary(myLibrary)
};

function sortByTitle() {
  myLibrary.sort((a, b) => a.title.localeCompare(b.title, "en",
    { ignorePunctuation: true }));
};

function sortByYear() {
  myLibrary.sort((a, b) => a.year - b.year);
}

const sortBy = document.querySelector("#sort-by");
sortBy.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
    if (selectedValue === "title") {
      sortByTitle();
      clearBookList();
      renderLibrary(myLibrary)
    }
    else if (selectedValue === "year") {
      sortByYear();
      clearBookList();
      renderLibrary(myLibrary)
    }
  }
);

// filter by read status, working area

const readBooks = function() {
  return myLibrary.filter((book) => book.readStatus === READ)
}

const unreadBooks = function() {
  return myLibrary.filter((book) => book.readStatus === UNREAD)
}

const noFilterBtn = document.querySelector("#no-filter-btn");
noFilterBtn.addEventListener("click", () => {
  clearBookList();
  renderLibrary(myLibrary)
})

const readBtn = document.querySelector("#read-btn");
readBtn.addEventListener("click", () => {
  clearBookList();
  renderLibrary(readBooks())
})

const unreadBtn = document.querySelector("#unread-btn");
unreadBtn.addEventListener("click", () => {
  clearBookList();
  renderLibrary(unreadBooks())
})
