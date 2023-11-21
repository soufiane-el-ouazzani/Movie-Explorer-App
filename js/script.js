const global = {
    currentPage: window.location.pathname,
};
const navBarLinks = document.querySelectorAll(".nav-link");
const popularMovies = document.querySelector("#popular-movies");
const popularShows = document.querySelector("#popular-shows");
const movieDetails = document.querySelector("#movie-details");
const swiperrSlide = document.querySelector(".swiper-slide");

// display on screen =====================================>


async function displayPopluerMovies(resultsData){
    resultsData.forEach(element => {
    const newCard = document.createElement('div');
    newCard.className='card'; 
    newCard.innerHTML = `<a href="movie-details.html?id=${element.id}">
    ${
        element.poster_path ? 
    `<img src="https://image.tmdb.org/t/p/w500/${element.poster_path}"
    class="card-img-top"
    alt="${element.original_title}"
    /> ` :
    `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${element.original_title}"
    />` 
    }   
    </a>
    <div class="card-body">
        <h5 class="card-title">${element.original_title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${element.release_date}</small>
        </p>
    </div>`
        popularMovies.appendChild(newCard);
    
    });
    
}


async function displayPopluerTvShow(resultsData){
    resultsData.forEach(element => {
    const newCard = document.createElement('div');
    newCard.className='card'; 
    newCard.innerHTML = `<a href="tv-details.html?id=${element.id}">
    ${
        element.poster_path ? 
    `<img src="https://image.tmdb.org/t/p/w500/${element.poster_path}"
    class="card-img-top"
    
    alt="${element.original_name}"
    /> ` :
    `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${element.original_name}"
    />` 
    }   
    </a>
    <div class="card-body" >
        <h5 class="card-title">${element.original_name}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${element.first_air_date}</small>
        </p>
    </div>`
        popularShows.appendChild(newCard);
    
    });
    
}

// get the infos from the API =====================================>


async function getPopulerTvShow(){
    const API_KEY='9f0e4fda6a6c5673d23c28458e29fc16';
    const url = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBlNGZkYTZhNmM1NjczZDIzYzI4NDU4ZTI5ZmMxNiIsInN1YiI6IjY1MDU4YzI1MTA5ZGVjMDEyZDg4NDg4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8R3w0MvFiY6yY-UWjnNpx85rJp-9cR4bOjjrs-YasKo'
        }}
    
    fetch(url, options)
    .then(res => res.json())
    .then(data =>displayPopluerTvShow(data.results));
    // const data = response.json();
    console.log(data);
    
}

async function getPopulerMovies(){
    console.log("there is a bag")
    const API_KEY='9f0e4fda6a6c5673d23c28458e29fc16';
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBlNGZkYTZhNmM1NjczZDIzYzI4NDU4ZTI5ZmMxNiIsInN1YiI6IjY1MDU4YzI1MTA5ZGVjMDEyZDg4NDg4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8R3w0MvFiY6yY-UWjnNpx85rJp-9cR4bOjjrs-YasKo'
        }}
    
    fetch(url, options)
    .then(res => res.json())
    .then(data => displayPopluerMovies(data.results));
    // const data = response.json();
    // console.log(data);
    
}


function hightlightActiveLinks2() {
    navBarLinks.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

async function movieDetailsPage(){
    const movieId = window.location.search.split("=")[1];
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBlNGZkYTZhNmM1NjczZDIzYzI4NDU4ZTI5ZmMxNiIsInN1YiI6IjY1MDU4YzI1MTA5ZGVjMDEyZDg4NDg4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8R3w0MvFiY6yY-UWjnNpx85rJp-9cR4bOjjrs-YasKo'
        }}
    
    fetch(url, options)
    .then(res => res.json())
    .then(data => showMovieDetails(data))
    function showMovieDetails(element){
        console.log(element);
        const div = document.createElement('div');
        div.innerHTML=`<div class="details-top">
          <div>
            
            ${
                element.poster_path ? 
            `<img src="https://image.tmdb.org/t/p/w500/${element.poster_path}"
            class="card-img-top"
            
            alt="${element.original_name}"
            /> ` :
            `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${element.original_name}"
            />` 
            }   

          </div>
          <div>
            <h2>${element.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${element.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${element.release_date}</p>
            <p>
              ${element.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${element.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $1,000,000</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
            
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>
      `
            
        movieDetails.appendChild(div);
    }
            
        
}

async function grabOnSwiper(){ 
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBlNGZkYTZhNmM1NjczZDIzYzI4NDU4ZTI5ZmMxNiIsInN1YiI6IjY1MDU4YzI1MTA5ZGVjMDEyZDg4NDg4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8R3w0MvFiY6yY-UWjnNpx85rJp-9cR4bOjjrs-YasKo'
        }}
    
    fetch(url, options)
    .then(res => res.json())
    .then(data => displayOnSwiper(data.results));
} 

async function displayOnSwiper(data){
    console.log(data);
    data.forEach(element => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML=` 
    <a href="movie-details.html?id=${element.id}">
    
    ${
        // element.poster_path ? 
    `<img src="https://image.tmdb.org/t/p/w500/${element.poster_path}"
    alt="${element.original_name}"
    // /> `
    //  :
    // `<img
    // src="../images/no-image.jpg"
    // alt="${element.original_name}"
    // />` 
    }
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${element.vote_average} / 10
    </h4>
  `
    swiperrSlide.appendChild(div);
    initSwiper();
    })
}

function initSwiper(){
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop:true,
        autoplay : {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPreView: 2
            },
            700: {
                slidesPreView: 3
            },
            1200: {
                slidesPreView: 4
            },
        }
      });
}

function init() {
    console.log(global.currentPage);
    switch (global.currentPage){
        
        case '/':
            console.log("Home");
            getPopulerMovies();
            grabOnSwiper();
            break;
        case '/index.html':
            console.log("index");
            getPopulerMovies();
            grabOnSwiper();
            break;
        case '/shows.html':
            console.log('Shows');
            getPopulerTvShow();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            movieDetailsPage()
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;

    }
    hightlightActiveLinks2() 
    
}

init();


