const movieId = location.hash.substring(1);
const movieCard = document.getElementById("movieCard");
console.log(movieId);
let MOVIE = [];

const URL_BASE = `http://localhost:3333`;;

fetch(`${URL_BASE}/movies?${movieId}`)
  .then((res) => res.json())
  .then((data) => {
    MOVIE = data;
    renderMovie(movieCard, MOVIE);
  });

function renderMovie(to, movie) {
  const movieHTML = createMovieCard(movie);
  to.insertAdjacentHTML("beforeend", movieHTML);
}

function createMovieCard(movie) {
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
  } = movie;
  return `<div class="border-gray-400 border border-solid rounded-lg p-2 movie-card relative w-[32%] one-col bg-transparent text-gray-400 compact-card">
      <div class="movie-card-header">
        <img class="img-feature" src="${img}" alt="Movie-icon"/>
      </div>
      <div class="movie-card-main flex-1">
        <h2 class="text-2xl not-italic font-bold card-titles">${title}</h2>
        <dl class="flex justify-between">
          <dd class="card-titles">Country</dd>
          <td>${country}</td>
        </dl>
        <dl class="flex justify-between">
          <dd class="card-titles">Year</dd>
          <td>${year}</td>
        </dl>
        <dl class="flex justify-between">
          <dd class="card-titles">Genre</dd>
          <td>${genre}</td>
        </dl>
        <dl class="flex flex-col justify-between flex-wrap"> 
          <dd class="card-titles">Producer</dd>
          <td>${producer}</td>
        </dl>
        <dl class="flex justify-between">
          <dd class="card-titles">Main actor</dd>
          <td>${mainActor}</td>
        </dl>
        <dl class="">
          <dd class="card-titles">Description</dd>
          <td>${description}</td>
        </dl>
        <dl class="flex justify-between">
          <dd class="card-titles">Rate</dd>
          <td>${rate}</td>
        </dl>
        <dl class="flex justify-between">
          <dd class="card-titles">Created at</dd>
          <td>${createdAt}</td>
        </dl>
        <dl class="flex justify-between">
          <dd class="card-titles">Updated at</dd>
          <td>${updatedAt}</td>
        </dl>
    </div>`;
}
