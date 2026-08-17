let books = [
  {
    id: 1,
    title: "Libro 1",
    author: "Autor 1",
    publisher: "Editorial 1",
    year: 2018,
    isRead: false,
  },
  {
    id: 2,
    title: "Libro 2",
    author: "Autor 2",
    publisher: "Editorial 2",
    year: 2020,
    isRead: false,
  },
  {
    id: 3,
    title: "Libro 3",
    author: "Autor 3",
    publisher: "Editorial 1",
    year: 2015,
    isRead: false,
  },
  {
    id: 4,
    title: "Libro 4",
    author: "Autor 4",
    publisher: "Editorial 3",
    year: 2022,
    isRead: false,
  },
  {
    id: 5,
    title: "Libro 5",
    author: "Autor 5",
    publisher: "Editorial 4",
    year: 2019,
    isRead: false,
  },
  {
    id: 6,
    title: "Libro 6",
    author: "Autor 6",
    publisher: "Editorial 2",
    year: 2021,
    isRead: false,
  },
  {
    id: 7,
    title: "Libro 7",
    author: "Autor 7",
    publisher: "Editorial 5",
    year: 2017,
    isRead: false,
  },
  {
    id: 8,
    title: "Libro 8",
    author: "Autor 8",
    publisher: "Editorial 3",
    year: 2023,
    isRead: false,
  },
  {
    id: 9,
    title: "Libro 9",
    author: "Autor 9",
    publisher: "Editorial 5",
    year: 2016,
    isRead: false,
  },
  {
    id: 10,
    title: "Libro 10",
    author: "Autor 10",
    publisher: "Editorial 4",
    year: 2024,
    isRead: false,
  },
];

let nextId = 11;

const booksContainer = document.getElementById("books-container");
const searchInput = document.getElementById("search-input");
const editorialFilter = document.getElementById("editorial-filter");
const clearFilterBtn = document.getElementById("clear-filter-btn");
const addBookForm = document.getElementById("add-book-form");

function createBookCard(book) {
  const article = document.createElement("article");
  article.className = `book-card${book.isRead ? " read" : ""}`;
  article.dataset.id = book.id;

  const h3 = document.createElement("h3");
  h3.textContent = book.title;

  const pAuthor = document.createElement("p");
  const strongAuthor = document.createElement("strong");
  strongAuthor.textContent = "Autor: ";
  pAuthor.appendChild(strongAuthor);
  pAuthor.appendChild(document.createTextNode(book.author));

  const pEditorial = document.createElement("p");
  const strongEditorial = document.createElement("strong");
  strongEditorial.textContent = "Editorial: ";
  pEditorial.appendChild(strongEditorial);
  pEditorial.appendChild(document.createTextNode(book.publisher));

  const pYear = document.createElement("p");
  const strongYear = document.createElement("strong");
  strongYear.textContent = "Año: ";
  pYear.appendChild(strongYear);
  pYear.appendChild(document.createTextNode(book.year));

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "book-actions";

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.className = "btn-toggle";
  toggleBtn.dataset.action = "toggle-read";
  toggleBtn.textContent = book.isRead ? "✓ Leído" : "Marcar leído";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn-delete";
  deleteBtn.dataset.action = "delete";
  deleteBtn.textContent = "Eliminar";

  actionsDiv.appendChild(toggleBtn);
  actionsDiv.appendChild(deleteBtn);

  article.appendChild(h3);
  article.appendChild(pAuthor);
  article.appendChild(pEditorial);
  article.appendChild(pYear);
  article.appendChild(actionsDiv);

  return article;
}

function updateEditorialOptions() {
  if (!editorialFilter) return;

  const selectedValue = editorialFilter.value;
  const uniqueEditorials = Array.from(
    new Set(books.map((b) => b.publisher)),
  ).sort();

  editorialFilter.innerHTML =
    '<option value="todas">Todas las editoriales</option>';

  uniqueEditorials.forEach((editorial) => {
    const option = document.createElement("option");
    option.value = editorial;
    option.textContent = editorial;
    editorialFilter.appendChild(option);
  });

  if (uniqueEditorials.includes(selectedValue)) {
    editorialFilter.value = selectedValue;
  } else {
    editorialFilter.value = "todas";
  }
}

function applyFilterAndRender() {
  if (!booksContainer) return;

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedEditorial = editorialFilter ? editorialFilter.value : "todas";

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.publisher.toLowerCase().includes(searchTerm) ||
      String(book.year).includes(searchTerm);

    const matchesEditorial =
      selectedEditorial === "todas" || book.publisher === selectedEditorial;

    return matchesSearch && matchesEditorial;
  });

  booksContainer.innerHTML = "";

  if (filteredBooks.length === 0) {
    const noResultsMsg = document.createElement("p");
    noResultsMsg.className = "no-results";
    noResultsMsg.textContent =
      "No se encontraron libros que coincidan con los criterios de búsqueda.";
    booksContainer.appendChild(noResultsMsg);
  } else {
    filteredBooks.forEach((book) => {
      booksContainer.appendChild(createBookCard(book));
    });
  }
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilterAndRender);
}

if (editorialFilter) {
  editorialFilter.addEventListener("change", applyFilterAndRender);
}

if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (editorialFilter) editorialFilter.value = "todas";
    applyFilterAndRender();
  });
}

if (addBookForm) {
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("new-book-title");
    const authorInput = document.getElementById("new-book-author");
    const editorialInput = document.getElementById("new-book-editorial");
    const yearInput = document.getElementById("new-book-year");

    const newBook = {
      id: nextId++,
      title: titleInput.value.trim(),
      author: authorInput.value.trim(),
      publisher: editorialInput.value.trim(),
      year: Number(yearInput.value) || new Date().getFullYear(),
      isRead: false,
    };

    books.push(newBook);
    addBookForm.reset();

    updateEditorialOptions();
    applyFilterAndRender();
  });
}

if (booksContainer) {
  booksContainer.addEventListener("click", (e) => {
    const targetBtn = e.target.closest("[data-action]");
    if (!targetBtn) return;

    const bookCard = targetBtn.closest(".book-card");
    if (!bookCard) return;

    const bookId = Number(bookCard.dataset.id);
    const action = targetBtn.dataset.action;

    if (action === "delete") {
      books = books.filter((b) => b.id !== bookId);
      updateEditorialOptions();
      applyFilterAndRender();
    } else if (action === "toggle-read") {
      const targetBook = books.find((b) => b.id === bookId);
      if (targetBook) {
        targetBook.isRead = !targetBook.isRead;
        applyFilterAndRender();
      }
    }
  });
}

updateEditorialOptions();
applyFilterAndRender();
