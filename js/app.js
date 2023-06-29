"use strict";
console.log("Hello");
const movieList = document.getElementById("movie-list");
const searchForm = document.getElementById("search-form");
const addNewMovieBtn = document.getElementById("add-new-movie-btn");

const closeModalWindow = document.getElementById("close-modal-window");
const modalBackDrop = document.getElementById("modal-back-drop");
const modalBody = document.getElementById("modal-body");
console.log(modalBody);
const sortSelection = document.getElementById("sort-select");
const wrapperActionBtn = document.getElementById("wrapper-action-btn");

let MOVIES = [];

const URL_BASE = `http://localhost:3333`;

fetch(`${URL_BASE}/movies?_sort=name&_order=asc`)
  .then((res) => res.json())
  .then((data) => {
    MOVIES = data;
    renderMovieList(movieList, MOVIES, true);
  });

sortSelection.addEventListener("change", (event) => {
  const [key, order] = event.target.value.split("/");

  fetch(`${URL_BASE}/movies?_sort=${key}&_order=${order}`)
    .then((res) => res.json())
    .then((data) => {
      MOVIES = data;
      renderMovieList(movieList, MOVIES, true);
    });
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQueryString = e.target.searchQuery.value
    .trim()
    .replaceAll(/\s{2,}/g, " ")
    .toLowerCase();

  fetch(`${URL_BASE}/movies?q=${searchQueryString}`)
    .then((res) => res.json())
    .then((data) => {
      MOVIES = data;
      renderMovieList(movieList, MOVIES, true);
    });
});

// tileActions.addEventListener("click", (e) => {
//       const updateBtn = event.target;
//     const updatingMovieId = Number(updateBtn.dataset.id);
//   const actionBtn = e.target;
//   const currentActionBtn = actionBtn.dataset.id;
//   if (currentActionBtn) {
//     ;
// }
// });

addNewMovieBtn.addEventListener("click", showNewMovieModal);

movieList.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    const updateBtn = event.target;
    const updatingMovieId = Number(updateBtn.dataset.id);
    const updatingMovie = MOVIES.find((movie) => movie.id === updatingMovieId);
    showUpdatedMovieModal(updatingMovie);
  }
});

modalBody.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formAction = form.dataset.action;
  if (formAction === "create") {
    addMovie(form);
  }
  if (formAction === "updateMovie") {
    const updatingMovieId = Number(form.dataset.updatingmovieid);
    updateMovie(form, updatingMovieId);
  }
});

function showNewMovieModal() {
  const modalForm = `<form data-action="create" id="modalForm">
      <div class="flex-col justify-between">
        <div class="modal-window-form-field">
          <label for="title">Title</label>
          <input name="title" class="inputField" type="text" placeholder="Enter name" />
        </div>
        <div class="modal-window-form-field">
          <label for="country">Country</label>
          <input name="country" class="inputField" type="text" placeholder="Enter country" />
        </div>
        <div class="modal-window-form-field">
          <label for="year">Year</label>
          <input name="year" class="inputField" type="text" placeholder="Enter year" />
        </div>
        <div class="modal-window-form-field">
          <label for="genre">Genre</label>
          <input name="genre" class="inputField" type="text" placeholder="Enter genre" />
        </div>
        <div class="modal-window-form-field">
          <label for="producer">Producer</label>
          <input name="producer" class="inputField" type="text" placeholder="Enter producer's name" />
        </div>
        <div class="modal-window-form-field">
          <label for="mainActor">Main Actor</label>
          <input name="mainActor" class="inputField" type="text" placeholder="Enter Main Actor's name" />
        </div>
        <div class="modal-window-form-field">
          <label for="description">Description</label>
          <input name="description" class="inputField" type="text-area" placeholder="Enter Description" />
        </div>
        <div>
        <button class="h-7 w-28 border bg-green-400 rounded" type="submit" id="submitBtn">
          Submit
        </button>
        <button class="h-7 w-28 border bg-red-400 rounded" type="reset" id="resetBtn">Clear</button>
      </div>
        
      </div>
    </form>`;
  renderModalBody(modalForm, modalBody, true);

  openModal();
}
function showUpdatedMovieModal(updatingMovie) {
  const { id, title, country, year, genre, producer, mainActor, description } =
    updatingMovie;
  const modalForm = `<form data-action="updateMovie" data-updatingMovieId="${id}" id="modalForm">
      <div class="flex-col justify-between">
        <div class="modal-window-form-field">
          <label for="title">Title</label>
          <input name="title" value="${title}" class="inputField" type="text" placeholder="Enter name" />
        </div>
        <div class="modal-window-form-field">
          <label for="country">Country</label>
          <input name="country" value="${country}" class="inputField" type="text" placeholder="Enter country" />
        </div>
        <div class="modal-window-form-field">
          <label for="year">Year</label>
          <input name="year" value="${year}" class="inputField" type="text" placeholder="Enter year" />
        </div>
        <div class="modal-window-form-field">
          <label for="genre">Genre</label>
          <input name="genre" value="${genre}" class="inputField" type="text" placeholder="Enter genre" />
        </div>
        <div class="modal-window-form-field">
          <label for="producer">Producer</label>
          <input name="producer" value="${producer}" class="inputField" type="text" placeholder="Enter producer's name" />
        </div>
        <div class="modal-window-form-field">
          <label for="mainActor">Main Actor</label>
          <input name="mainActor" value="${mainActor}" class="inputField" type="text" placeholder="Enter Main Actor's name" />
        </div>
        <div class="modal-window-form-field">
          <label for="description">Description</label>
          <input name="description" value="${description}" class="inputField" type="text-area" placeholder="Enter Description" />
        </div>
  
        <div>
         <button class="h-7 w-28 border bg-yellow-400 rounded" type="submit">
       Update
        </button>
        <button class="h-7 w-28 border bg-red-400 rounded" type="reset" >Clear</button>
      </div>

      </div>
    </form>`;
  renderModalBody(modalForm, modalBody, true);

  openModal();
}

function addMovie(form) {
  const title = form.title.value;
  console.log(title);
  const country = form.country.value;
  const year = form.year.value;
  const genre = form.genre.value;
  const producer = form.producer.value;
  const mainActor = form.mainActor.value;
  const description = form.description.value;

  const newMovie = {
    title,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  fetch(`${URL_BASE}/movies`, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(newMovie),
  })
    .then((res) => res.json())
    .then((data) => {
      MOVIES.push(data);
      renderMovieList(movieElem, MOVIES, true);
      form.reset();
    });
}
function updateMovie(form, updatingMovieId) {
  const title = form.title.value;
  const country = form.country.value;
  const year = form.year.value;
  const genre = form.genre.value;
  const producer = form.producer.value;
  const mainActor = form.mainActor.value;
  const description = form.description.value;
  const updatedMovieCard = {
    title,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
    updatedAt: new Date().toISOString(),
  };

  const updatingMovingIdx = MOVIES.findIndex(
    (movie) => movie.id === updatingMovieId
  );

  fetch(`${URL_BASE}/movies/${updatingMovieId}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(updatedMovieCard),
  })
    .then((res) => res.json())
    .then((data) => {
      MOVIES[updatingMovingIdx] = data;
      renderMovieList(movieList, MOVIES, true);
      closeModal();
    });
}

closeModalWindow.addEventListener("mousedown", (event) => {
  if (event.target === modalBackDrop || closeModalWindow) {
    closeModal();
  }
});

function createMovieCard(card) {
  const {
    img,
    title,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
    rate,
    createdAt,
    updatedAt,
    id,
  } = card;
  return `<div class="border-black border border-solid rounded-lg p-2 bg-white movie-card w-1/3 one-col">
    <div class="movie-card-header">
      <img class="w-full" src="${img}" alt="Movie-icon" />
      <h2 class="text-xl not-italic hover:italic">${title}</h2>
    </div>
    <div class="movie-card-main">
      <p>Country: ${country}</p>
      <p>Year: ${year}</p>
      <p>Genre: ${genre}</p>
      <p>Producer: ${producer}</p>
      <p>Main actor: ${mainActor}</p>
      <p>Description: ${description}</p>
    </div>
     <div class="movie-card-footer">
  <div class="">
    <p>Rate: ${rate}</p>
    <p>Created: ${createdAt}</p>
    <p>Updated: ${updatedAt}</p>
  </div>
  <button data-id = "${id}" data-action = "update" class="btn h-7 w-7 border bg-yellow-400 rounded" type="submit">&#9998;</button>

  </div>
  </div>`;
}

function renderMovieList(to, array, clear) {
  if (clear) {
    to.innerHTML = "";
  }

  array.forEach((card) => {
    const movieHTML = createMovieCard(card);
    to.insertAdjacentHTML("beforeend", movieHTML);
  });
}
function openModal() {
  document.body.classList.add("modal-open");
}

function closeModal() {
  document.body.classList.remove("modal-open");
}

function renderModalBody(content, to) {
  to.innerHTML = content;
}
