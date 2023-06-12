"use strict";

const movieElem = document.getElementById("movie-list");

const searchForm = document.getElementById("searchForm");

let MOVIES = [];

const URL_BASE = `http://localhost:3333`;

fetch(`${URL_BASE}/movies`)
  .then((res) => res.json())
  .then((data) => {
    MOVIES = data;
    renderMovieList(movieElem, MOVIES, true);
    console.log(MOVIES);
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
  return `<div class="movie-card">
    <div class="movie-card-header">
      <img class="" src="${img}" alt="Movie-icon" />
      <h2 class="">Movie:${name}</h2>
    </div>
    <div class="movie-card-main">
      <p>${country}</p>
      <p>${year}</p>
      <p>${genre}</p>
      <p>${producer}</p>
      <p>${mainActor}</p>
      <p>${description}</p>
    </div>
    <div class="movie-card-footer">
      <p>${rate}</p> 
      <p>${createdAt}</p>
      <p>${upDatedAt}</p>
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
