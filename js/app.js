"use strict";
console.log("Hello");
const movieElem = document.getElementById("movie-list");

const searchForm = document.getElementById("searchForm");

const AddNewMovieBtn = document.getElementById("addNewMovieBtn");

const CloseModalWindow = document.getElementById("closeModalWindow");

const modalBackDrop = document.getElementById("modalBackDrop");

const modalBody = document.getElementById("modalBody");
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

AddNewMovieBtn.addEventListener("click", () => {
  const modalForm = `<form id="modalForm">
    <div class="flex-col justify-between">
      <div class="modal-window-form-field">
        <label for="name">Name</label>
        <input class="inputField" type="text" placeholder="Enter name" />
      </div>
      <div class="modal-window-form-field">
        <label for="country">Country</label>
        <input class="inputField" type="text" placeholder="Enter country" />
      </div>
      <div class="modal-window-form-field">
        <label for="year">Year</label>
        <input class="inputField" type="text" placeholder="Enter year" />
      </div>
      <div class="modal-window-form-field">
        <label for="Genre">Genre</label>
        <input class="inputField" type="text" placeholder="Enter genre" />
      </div>
      <div class="modal-window-form-field">
        <label for="producer">Producer</label>
        <input class="inputField" type="text" placeholder="Enter producer's name" />
      </div>
      <div class="modal-window-form-field">
        <label for="main-actor">Main Actor</label>
        <input class="inputField" type="text" placeholder="Enter Main Actor's name" />
      </div>
      <div class="modal-window-form-field">
        <label for="Description">Description</label>
        <input class="inputField" type="text-area" placeholder="Enter Description" />
      </div>

      <button class="h-7 w-28 border bg-green-400 rounded" type="submit" id="submitBtn">
        Submit
      </button>
    </div>
  </form>`;
  renderModalBody(modalForm, modalBody);
  
  openModal();

  const createForm = getElementById("modalForm");

  createForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const country = form.country.value;
    const year = form.year.value;
    const genre = form.genre.value;
    const producer = form.producer.value;
    const mainActor = form.mainActor.value;
    const description = form.description.value;

    const newMovie = {
      content: {
        name,
        country,
        year,
        genre,
        producer,
        mainActor,
        description,
      },
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
        renderMovieList(movieElem, MOVIES);
        form.reset();
      });
  });
});

CloseModalWindow.addEventListener("mousedown", (event) => {
  if (event.target === modalBackDrop || CloseModalWindow) {
    closeModal();
  }
});

function createMovieCard(card) {
  const {
    img,
    name,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
    rate,
    createdAt,
    upDatedAt,
  } = card;
  return `<div class="border-black border border-solid rounded-lg p-2 bg-white movie-card w-1/3">
    <div class="movie-card-header">
      <img class="" src="${img}" alt="Movie-icon" />
      <h2 class="">Movie: ${name}</h2>
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
      <p>Updated: ${upDatedAt}</p>
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
