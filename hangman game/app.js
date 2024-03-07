const words = [
  "crow",
  "cat",
  "elephant",
  "dog",
  "wolf",
  "buffalo",
  "dolphin",
  "deer",
  "shark",
  "parrot"
]

const hangmanParts = document.querySelectorAll(".figure-part")
const hiddenLetters = document.querySelector("#hidden-word")
const wrongLetters = document.querySelector("#wrong-word")
const playAgain = document.getElementById("play-again")
const playAgainText = document.querySelector("#play-again p")
const notification = document.getElementById("notification")
const playAgainButton = document.querySelector("#play-again button")

let hiddenWord = words[Math.floor(Math.random() * words.length)]

const correctLettersArray = []
const wrongLettersArray = []

function displayHiddenWord() {
  hiddenLetters.innerHTML = hiddenWord
    .split("")
    .map((letter) => {
      return `<span class="hidden-word-letters">${
        correctLettersArray.includes(letter) ? letter : ""
      }</span>`
    })
    .join("")
  console.log(hiddenLetters.innerText)
  if (hiddenWord === hiddenLetters.innerText) {
    gameOver("won")
  }
}

function displayWrongWord() {
  wrongLetters.innerHTML = wrongLettersArray
    .map((letter) => `<span>${letter} </span>`)
    .join("")

  for (let i = 0; i < wrongLettersArray.length; i++) {
    hangmanParts[i].style.display = "block"
  }
  if (wrongLettersArray.length === hangmanParts.length) {
    gameOver("lost")
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (
      !correctLettersArray.includes(e.key) &&
      !wrongLettersArray.includes(e.key)
    ) {
      if (hiddenWord.includes(e.key)) {
        correctLettersArray.push(e.key)
        displayHiddenWord()
      } else {
        wrongLettersArray.push(e.key)
        displayWrongWord()
      }
    } else showNotification()
  }
})

function showNotification() {
  notification.style.display = "block"
  setTimeout(() => (notification.style.display = "none"), 2000)
}

function gameOver(res) {
  if (res === "won") playAgainText.innerText = "Congrats! You won"
  else playAgainText.innerText = "Sad! You lost"
  playAgain.style.display = "flex"
}

playAgainButton.addEventListener("click", () => {
  hiddenWord = words[Math.floor(Math.random() * words.length)]
  wrongLettersArray.splice(0)
  correctLettersArray.splice(0)
  displayHiddenWord()
  displayWrongWord()
  console.clear()
  for (let i = 0; i < hangmanParts.length; i++) {
    hangmanParts[i].style.display = "none"
  }
  playAgain.style.display = "none"
})

displayHiddenWord()
