const mylibrary = [];

function Book(title, author, yearPublished, read) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
  this.read = read;
  this.id = crypto.randomUUID();
}

// const theStranger = new Book("The Stranger", "Albert Camus", "1942", "unread");
// console.log(theStranger);

// mylibrary.push(theStranger);
// console.log(mylibrary)


function addBookToLibrary(title, author, yearPublished, read) {
  let newBook = new Book(title, author, yearPublished, read);
  mylibrary.push(newBook);
}

addBookToLibrary("The Little Prince", "Antoine Saint-Exupery", "1943", "read")
console.log(mylibrary)
