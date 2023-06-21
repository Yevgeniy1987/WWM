"use strict";
console.log("Hello");
const movieElem = document.getElementById("movie-list");

const searchForm = document.getElementById("search-form");

const addNewMovieBtn = document.getElementById("add-new-movie-btn");

const closeModalWindow = document.getElementById("close-modal-window");

const modalBackDrop = document.getElementById("modal-back-drop");

const modalBody = document.getElementById("modal-body");
console.log(modalBody);

let MOVIES = [];

const URL_BASE = `http://localhost:3333`;

fetch(`${URL_BASE}/movies`)
  .then((res) => res.json())
  .then((data) => {
    MOVIES = data;
    renderMovieList(movieElem, MOVIES, true);
    console.log(MOVIES);
  });

addNewMovieBtn.addEventListener("click", () => {
  const modalForm = `<form data-action= "active" id="modalForm">
    <div class="flex-col justify-between">
      <div class="modal-window-form-field">
        <label for="title">Name</label>
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

      <button class="h-7 w-28 border bg-green-400 rounded" type="submit" id="submitBtn">
        Submit
      </button>
    </div>
  </form>`;
  renderModalBody(modalForm, modalBody, true);

  openModal();

  const createForm = document.getElementById("modalForm");

  createForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
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
  });
});

modalForm.addEventListener("mouseover", (event) => {
  if (event.target === modalForm) {

  }
});

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
  } = card;
  return `<div class="border-black border border-solid rounded-lg p-2 bg-white movie-card w-1/3">
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
      <p>Rate: ${rate}</p> 
      <p>Created: ${createdAt}</p>
      <p>Updated: ${updatedAt}</p>
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
