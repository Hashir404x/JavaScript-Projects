const search = document.getElementById("search")
const submit = document.getElementById("submit")
const generate = document.getElementById("generate")
const resultsHeading = document.getElementById("result-heading")
const meals = document.getElementById("meals")
const selectedMeal = document.getElementById("selected-meal")

const searchMeal = (e) => {
  e.preventDefault()
  const searchText = search.value
  if (searchText.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`
        if (data.meals === null) {
          console.log("no")
          resultsHeading.innerHTML = `<h2>No results found for ${searchText}</h2>`
        } else {
          meals.innerHTML = data.meals
            .map(
              (meal) => `<div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3 class="heading">${meal.strMeal}</h3>
          </div>
          </div>`
            )
            .join("")
        }
      })
    search.value = ""
  } else alert("Please enter search keyword")
}
submit.addEventListener("submit", searchMeal)

meals.addEventListener("click", (e) => {
  let mealId = undefined
  if (e.target.classList.contains("meal-info"))
    mealId = e.target.getAttribute("data-mealID")
  else if (e.target.tagName.toLowerCase() === "h3")
    mealId = e.target.parentElement.getAttribute("data-mealID")
  if (mealId) getMealData(mealId)
})

function getMealData(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0]
      displayMealDetails(meal)
    })
}

function displayMealDetails(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`
      )
    } else break
  }
  selectedMeal.innerHTML = `<div class="selected-meal-details">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="selected-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="selected-meal-instructions">
    <p>${meal.strInstructions}</p>
    <h3>Ingredients: </h3>
    <ul>
    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    </div>
  </div>`
}
