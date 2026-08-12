let myLibrary = [];

const READ = "read";
const UNREAD = "unread";

const SELECTED = "selected";
const UNSELECTED = "unselected";

function Book(title, author, year, pages, readStatus, selected) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.readStatus = readStatus;
  this.selected = selected;
  this.id = crypto.randomUUID();
}

function addBook(title, author, year, pages, readStatus, selected) {
  let newBook = new Book(title, author, year, pages, readStatus, selected);
  myLibrary.push(newBook);
}

addBook("The Little Prince", "Antoine Saint-Exupery", "1943", "100", READ, UNSELECTED);
addBook("Yellowface", "RF Kuang", "2023", "500", UNREAD, UNSELECTED);
addBook("Small Boat", "Vincent Delacroix", "2023", "700", READ, UNSELECTED);
addBook("The Stranger", "Albert Camus", "1942", "1000", UNREAD, UNSELECTED);
addBook("A Tale of Two Cities", "Charles Dickens", "1859", "2000", READ, UNSELECTED);
addBook("Harry Potter and the Philosopher's Stone", "J. K. Rowling", "1997", "1300", UNREAD, UNSELECTED);
addBook("And Then There Were None", "Agatha Christie", "1939", "1500", READ, UNSELECTED);
addBook("Dream of the Red Chamber", "Cao Xueqin", "1791", "10000", UNREAD, UNSELECTED);
addBook("The Murder of Roger Ackroyd", "Agatha Christie", "1926", "800", UNREAD, UNSELECTED);

const libraryDiv = document.querySelector("#library-div");
renderLibrary(myLibrary)

function clearBookList() {
  libraryDiv.replaceChildren()
}

function renderLibrary(library) {
  const bookList = document.createElement("ul");
  bookList.id = "book-list";
  libraryDiv.appendChild(bookList);

  for (const book of library) {
    const bookListing = document.createElement("li");
    bookListing.classList.add("book");
    bookList.appendChild(bookListing);

    const bookTitle = document.createElement("h2");
    const subtitle = document.createElement("h3");
    subtitle.classList.add("subtitle");
    const bookPages = document.createElement("p");
    bookPages.classList.add("pages");

    bookTitle.textContent = book.title;
    subtitle.textContent = `${book.author}, ${book.year}`;
    bookPages.textContent = `${book.pages} pages`;

    bookListing.appendChild(bookTitle);
    bookListing.appendChild(subtitle);
    bookListing.appendChild(bookPages);

    const readStatusOptions = [
      { value: UNREAD, text: "Unread" },
      { value: READ, text: "Read" },
    ];

    const dropdown = document.createElement("select");
    dropdown.name = "read-status";

    readStatusOptions.forEach(readSelection => {
      const option = document.createElement("option");
      option.value = readSelection.value;
      option.textContent = readSelection.text;
      dropdown.appendChild(option);
    });

    dropdown.value = book.readStatus;

    dropdown.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === READ) {
      book.readStatus = READ
    }
    else if (selectedValue === UNREAD) {
      book.readStatus = UNREAD
    }
    });

    bookListing.appendChild(dropdown);

    const deleteBookBtn = Object.assign(document.createElement('button'), {
      textContent: 'Delete',
      onclick: () => deleteBook(book.id)
    });
    deleteBookBtn.classList.add("btn")
    bookListing.appendChild(deleteBookBtn);

    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.name = 'selected';

    checkbox.addEventListener("change", (event) => {
    if (checkbox.checked) {
      book.selected = SELECTED
    }
    else {
      book.selected = UNSELECTED
    }
    });

    bookListing.appendChild(checkbox);
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

function createNewBook() {
  const {title, author, year, pages, readStatus, selected} = getBookInfo();

  let newBook = new Book(title, author, year, pages, readStatus, selected);
  myLibrary.push(newBook);
  clearBookList();
  renderLibrary(myLibrary);
}

function getBookInfo() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let year = document.getElementById('year').value;
  let pages = document.getElementById('pages').value;
  let readStatus = document.getElementById('read-status').value;
  let selected = UNSELECTED;

  return {title: title, author: author, year: year, pages: pages, readStatus: readStatus, selected: selected}
}

function deleteBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id)

  myLibrary.splice(index, 1);
  clearBookList();
  renderLibrary(myLibrary)
};

const toolbar = document.querySelector("#toolbar");

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
readBtn.classList.add("btn");
readBtn.addEventListener("click", () => {
  clearBookList();
  renderLibrary(readBooks())
})

const unreadBtn = document.querySelector("#unread-btn");
unreadBtn.addEventListener("click", () => {
  clearBookList();
  renderLibrary(unreadBooks())
})

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

const searchBar = document.querySelector("#site-search");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", () => {
  let searchQuery = searchBar.value.toLowerCase();
  clearBookList();
  renderLibrary(search(searchQuery, myLibrary))
})

function search(query, library) {
  let filteredBooks = [];
  for (const book of library) {
    if (book.author.toLowerCase().includes(query)) {
      filteredBooks.push(book)
    }
    else if (book.title.toLowerCase().includes(query)) {
      filteredBooks.push(book)
    }
  }
  return filteredBooks
}

function deleteBooks(library) {
  let newLibrary = library.filter((book) => book.selected === UNSELECTED);
  myLibrary = newLibrary;
  return myLibrary
}

function bulkMarkAsRead(library) {
  for (book of library) {
    if (book.selected === SELECTED) {
      book.readStatus = READ
    }
  }
}

function bulkMarkAsUnread(library) {
  for (book of library) {
    if (book.selected === SELECTED) {
      book.readStatus = UNREAD
    }
  }
}

const bulkAction = document.querySelector("#bulk-action");
bulkAction.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
    if (selectedValue === "delete") {
      clearBookList();
      renderLibrary(deleteBooks(myLibrary))
    }
    else if (selectedValue === "mark-read") {
      bulkMarkAsRead(myLibrary);
      clearBookList();
      renderLibrary(myLibrary)
    }
    else if (selectedValue === "mark-unread") {
      bulkMarkAsUnread(myLibrary);
      clearBookList();
      renderLibrary(myLibrary)
    }
})
