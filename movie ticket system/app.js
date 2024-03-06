const movies = [
  {
    title: "Fury (15$)",
    src: "/movie ticket system/posters/fury.webp",
    price: 15
  },
  {
    title: "Avengers (25$)",
    src: "/movie ticket system/posters/avengers.jpg",
    price: 25
  },
  {
    title: "Batman (20$)",
    src: "/movie ticket system/posters/batman.webp",
    price: 20
  },
  {
    title: "Harry Potter (28$)",
    src: "/movie ticket system/posters/harry-potter.jpg",
    price: 28
  },
  {
    title: "Top Gun (10$)",
    src: "/movie ticket system/posters/topgun.webp",
    price: 10
  }
]

const moviePoster = document.querySelector("#screen img")
const movieTitle = document.querySelector("#screen p")
const moviesSelectionList = document.querySelector("select")
const seatsSection = document.querySelector("#seats-section")
let selectedSeatsSpan = document.querySelector("#total-seats")
let priceOfSelectedSeatsSpan = document.querySelector("#total-price")

let priceOfMovie = movies[0].price
moviePoster.src = movies[0].src
movieTitle.innerText = movies[0].title

let movieOption
for (let movie of movies) {
  movieOption = document.createElement("option")
  movieOption.value = movie.title
  movieOption.innerText = movie.title
  moviesSelectionList.append(movieOption)
}

let seatsRow, oneSeat
for (let i = 0; i < 6; i++) {
  seatsRow = document.createElement("div")
  seatsRow.classList.add("seat-row")
  seatsSection.append(seatsRow)
  for (let j = 0; j < 8; j++) {
    oneSeat = document.createElement("div")
    oneSeat.classList.add("one-seat")
    seatsRow.append(oneSeat)
  }
}

const allSeatsRows = document.querySelectorAll(".seat-row")
let randomIndex1, randomIndex2

allSeatsRows.forEach((row) => {
  randomIndex1 = Math.floor(Math.random() * 8)
  randomIndex2 = Math.floor(Math.random() * 8)
  row.children[randomIndex1].classList.add("occupied")
  row.children[randomIndex2].classList.add("occupied")
})

moviesSelectionList.addEventListener("change", (e) => {
  for (let movie of movies) {
    if (e.target.value === movie.title) {
      moviePoster.src = movie.src
      movieTitle.innerText = movie.title
      priceOfMovie = movie.price
      updateSeatsData()
    }
  }
})

seatsSection.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("one-seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected")
    updateSeatsData()
  }
})

function updateSeatsData() {
  const numOfSelectedSeats = document.querySelectorAll(".selected").length
  selectedSeatsSpan.innerText = numOfSelectedSeats
  priceOfSelectedSeatsSpan.innerText = numOfSelectedSeats * priceOfMovie
}
