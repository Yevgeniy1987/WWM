"use strict";
console.log("Hello");
const movieList = document.getElementById("movie-list");
const searchForm = document.getElementById("search-form");
const addNewMovieBtn = document.getElementById("add-new-movie-btn");

const closeModalWindow = document.getElementById("close-modal-window");
const modalBackDrop = document.getElementById("modal-back-drop");
const modalBody = document.getElementById("modal-body");
console.log(modalBody);

window.addEventListener("beforeunload", saveAddMovieFormValues);

const sortSelect = document.getElementById("sort-select");
const wrapperActions = document.getElementById("wrapper-action-btn");

let MOVIES = [];

const URL_BASE = `http://localhost:3333`;

fetch(`${URL_BASE}/movies?_sort=title&_order=asc`)
  .then((res) => res.json())
  .then((data) => {
    MOVIES = data;
    renderMovieList(movieList, MOVIES, true);
  });

sortSelect.addEventListener("change", (event) => {
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

wrapperActions.addEventListener("click", (e) => {
  const currentBtn = e.target;
  const actionBtn = currentBtn.dataset.action;

  if (actionBtn === "one-col") {
    movieList.classList.add("one-col");
    movieList.classList.remove("three-col");
  }
  if (actionBtn === "three-col") {
    movieList.classList.add("three-col");
    movieList.classList.remove("one-col");
  }

  //   currentActionBtn.classList.add ("is-active");
  // } else {
  //   currentActionBtn.classList.remove("is-active");
});

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
  const modalForm = `<form data-action="create" id="addMovieForm">
      <div class="flex-col justify-between w-[300px] h-[550px] text-white">
         <div class="modal-window-form-field">
           <label class="text-white italic font-bold text-xl" for="imgLink">Movie image</label>
           <input name="imgLink" class="inputField" type="text" placeholder="Paste movie image Link" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="title">Title</label>
          <input name="title" class="inputField" type="text" placeholder="Enter name" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="country">Country</label>
          <input name="country" class="inputField" type="text" placeholder="Enter country" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="year">Year</label>
          <input name="year" class="inputField" type="text" placeholder="Enter year" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="genre">Genre</label>
          <input name="genre" class="inputField" type="text" placeholder="Enter genre" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="producer">Producer</label>
          <input name="producer" class="inputField" type="text" placeholder="Enter producer's name" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="mainActor">Main Actor</label>
          <input name="mainActor" class="inputField" type="text" placeholder="Enter Main Actor's name" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="description">Description</label>
          <textarea name="description" class="inputField" type="text" placeholder="Enter Description" ></textarea>
        </div>
        <div class="flex my-5">
        <button class="h-7 w-1/2  border bg-green-400 rounded" type="submit" id="submitBtn">
          Submit
        </button>
        <button class="h-7 w-1/2 border bg-red-400 rounded" type="reset" id="resetBtn">Clear</button>
      </div>
        
      </div>
    </form>`;
  renderModalBody(modalForm, modalBody, true);
  restoreAddMovieFormValue();
  openModal();
}
function showUpdatedMovieModal(updatingMovie) {
  const {
    id,
    title,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
    imgLink,
  } = updatingMovie;
  const modalForm = `<form data-action="updateMovie" data-updatingMovieId="${id}" id="modalForm">
      <div class="flex-col w-[300px] h-[550px]">
         <div class="modal-window-form-field">
           <label class="text-white italic font-bold text-xl " for="imgLink">Movie image</label>
           <input name="imgLink" value="${imgLink}" class="inputField" type="text" placeholder="Paste movie image Link" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="title">Title</label>
          <input name="title" value="${title}" class="inputField" type="text" placeholder="Enter name" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="country">Country</label>
          <input name="country" value="${country}" class="inputField" type="text" placeholder="Enter country" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="year">Year</label>
          <input name="year" value="${year}" class="inputField" type="text" placeholder="Enter year" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="genre">Genre</label>
          <input name="genre" value="${genre}" class="inputField" type="text" placeholder="Enter genre" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="producer">Producer</label>
          <input name="producer" value="${producer}" class="inputField" type="text" placeholder="Enter producer's name" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="mainActor">Main Actor</label>
          <input name="mainActor" value="${mainActor}" class="inputField" type="text" placeholder="Enter Main Actor's name" />
        </div>
        <div class="modal-window-form-field">
          <label class="text-white italic font-bold text-xl" for="description">Description</label>
          <textarea name="description" value="${description}" class="inputField" type="text" placeholder="Enter Description"></textarea>
        </div>
  
        <div class="flex my-5">
         <button class="h-7 w-1/2 border bg-yellow-400 rounded" type="submit">
       Update
        </button>
        <button class="h-7 w-1/2 border bg-red-400 rounded" type="reset" >Clear</button>
      </div>

      </div>
    </form>`;
  renderModalBody(modalForm, modalBody, true);

  openModal();
}

function addMovie(form) {
  const img = form.title.value;
  const title = form.title.value;
  console.log(title);
  const country = form.country.value;
  const year = form.year.value;
  const genre = form.genre.value;
  const producer = form.producer.value;
  const mainActor = form.mainActor.value;
  const description = form.description.value;

  const newMovie = {
    img,
    title,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
    createdAt: new Date().toString().toLocaleString(),
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
  const img = form.title.value;
  const title = form.title.value;
  const country = form.country.value;
  const year = form.year.value;
  const genre = form.genre.value;
  const producer = form.producer.value;
  const mainActor = form.mainActor.value;
  const description = form.description.value;
  const updatedMovieCard = {
    img,
    title,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
    updatedAt: new Date().toString().toLocaleString(),
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
  return `<div class="border-gray-400 border border-solid rounded-lg p-2 movie-card relative w-[45%] one-col bg-transparent text-gray-400 compact-card">
    <div class="movie-card-header">
      <img class="img-feature" src="${img}" alt="Movie-icon"/>
    </div>
    <div class="movie-card-main">
      <h2 class="text-xl not-italic ">${title}</h2>
      <dl class="flex">
        <dd class="card-titles">Country</dd>
        <td>${country}</td>
      </dl>
      <dl class="flex">
        <dd class="card-titles">Year</dd>
        <td>${year}</td>
      </dl>
      <dl class="flex">
        <dd class="card-titles">Genre</dd>
        <td>${genre}</td>
      </dl>
      <dl class="flex"> 
        <dd class="card-titles">Producer</dd>
        <td>${producer}</td>
      </dl>
      <dl class="flex">
        <dd class="card-titles">Main actor</dd>
        <td>${mainActor}</td>
      </dl>
      <dl class="">
        <dd class="card-titles">Description</dd>
        <td>${description}</td>
      </dl>
      <dl class="flex">
        <dd class="card-titles">Rate</dd>
        <td>${rate}</td>
      </dl>
      <dl class="flex">
        <dd class="card-titles">Created at</dd>
        <td>${createdAt}</td>
      </dl>
      <dl class="flex">
        <dd class="card-titles">Updated at</dd>
        <td>${updatedAt}</td>
      </dl>
  </div>
     <button data-id = "${id}" data-action = "update" class="btn h-7 w-7 border border-gold rounded-full absolute top-2 right-4 bg-gray-400" type="submit">&#9998;</button>

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

function restoreAddMovieFormValue() {
  const addMovieFormValue = JSON.parse(
    window.localStorage.getItem("addMovieForm")
  );
  if (addMovieFormValue) {
    const form = document.getElementById("addMovieForm");
    form.title.value = addMovieFormValue.title;
    form.country.value = addMovieFormValue.country;
    form.year.value = addMovieFormValue.year;
    form.genre.value = addMovieFormValue.genre;
    form.producer.value = addMovieFormValue.producer;
    form.mainActor.value = addMovieFormValue.mainActor;
    form.description.value = addMovieFormValue.description;
  }
}
function saveAddMovieFormValues() {
  const form = document.getElementById("addMovieForm");
  const title = form.title.value;
  const country = form.country.value;
  const year = form.year.value;
  const genre = form.genre.value;
  const producer = form.producer.value;
  const mainActor = form.mainActor.value;
  const description = form.description.value;

  const addFormValues = {
    title,
    country,
    year,
    genre,
    producer,
    mainActor,
    description,
  };

  window.localStorage.setItem("addMovieForm", JSON.stringify(addFormValues));
}
