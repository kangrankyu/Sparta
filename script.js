let movieList = document.querySelector("#movieList");
let searchInput = document.querySelector("#searchInput");
let modalIist = document.querySelector("#modalcontainer");
let modalcontent = document.querySelector(".modalcontent");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjU2YjY0ZGIzNWU0NzBiODQ0NzZiNjk5ZGI2ZWNjOSIsIm5iZiI6MTcyOTU4NDAxNS43MDY5NzUsInN1YiI6IjY2YjA4YzA4ZDc0OWJhYTk4NTIxZmI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_j9eARZbuhcDauIV4GbjKkHd6L8Q0D7Ag4Qt9JOq0A",
  },
};

// 카드함수 //
function createMovieCards(movies) {
  movies.forEach((movie) => {
    let tempHtml = `
      <div class="movie-card" data-id="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>평점: ${movie.vote_average}</p>
      </div>`;

    movieList.innerHTML += tempHtml;
  });
 // 이벤트 리스너를 동적으로 생성된 카드들에 추가
 let moviecard = document.querySelectorAll(".movie-card");
 // 클릭했을때 영화id 가져오기 
 moviecard.forEach((movieCard) => {
 movieCard.addEventListener("click", () => {
 
    let movieId = movieCard.getAttribute("data-id"); // 영화의 ID를 가져옴
// id를 인자로 받는 함수 호출 
    movieID(movieId);
  });
});

}
//  검색 결과 함수 //
function searchMoviecard(movies) {
  searchInput.addEventListener("input", (event) => {
    let filter = event.target.value.toLowerCase();

    let filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filter)
    );
    movieList.innerHTML = "";
    createMovieCards(filteredMovies);
  });
}


//영화 상세정보 함수 
function movieID(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then((res) => res.json())
    .then((res) =>    {
      let modal = `<div class="modalcontent">
			<img class ="modalimg"src="https://image.tmdb.org/t/p/w500${res.poster_path}" alt="">
			<h2 class = "modalTitle">${res.title}</h2>
			<p class= "modalOverview">${res.overview}</p>
			<p class= "modalReleaseDate">${res.release_date}</p>
      <p class= "modalRating"><span>평점</span>${res.vote_average}</p>
      <button id ="closebtn">Close</button> 
		</div>`
    modalIist.innerHTML = modal;
    modalIist.style.display = "flex"; 


    let closebtn = document.querySelector("#closebtn");
    closebtn.addEventListener("click", ()=> {
      modalIist.style.display = "none";
    })
  })
    .catch((err) => console.error(err));
}

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    let movies = response.results;
    createMovieCards(movies);
    searchMoviecard(movies);
  });
