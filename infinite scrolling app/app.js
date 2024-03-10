const loader = document.getElementById("loader")
const filter = document.getElementById("filter-container")
const newsFeed = document.getElementById("news-feed-container")

let page = 1
let limit = 5

async function fetchPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  )
  const data = await res.json()
  return data
}

async function renderPosts() {
  const posts = await fetchPosts()
  posts.forEach((post) => {
    const postDiv = document.createElement("div")
    postDiv.classList.add("post")
    postDiv.innerHTML = `
    <div class="post-id">${post.id}</div>
    <div class="post-content">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `
    newsFeed.append(postDiv)
  })
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 15) {
    showLoader()
  }
})

function showLoader() {
  loader.classList.add("show")
  page++
  renderPosts()
  loader.classList.remove("show")
}

filter.addEventListener("input", (e) => filterPosts(e))

function filterPosts(e) {
  const keyWord = e.target.value.toLowerCase()
  const posts = document.querySelectorAll(".post")
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText
    const body = post.querySelector(".post-body").innerText
    if (title.includes(keyWord) || body.includes(keyWord)) {
      post.style.display = "flex"
    } else {
      post.style.display = "none"
    }
  })
}

renderPosts()
