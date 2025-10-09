let i = 0
let articlesShown = 0
let galleryImages = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: ''
}
let galleryTitle = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: ''
}
let galleryUrl = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: ''
}
const apiUrl = `https://newsapi.org/v2/everything?language=pt&q=musculação%20-idoso%20-moda&sortBy=popularity&apiKey=6ef6b1a8dccc40828289087a7d441e33`;

function nextImg() {
    if (i === articlesShown) {
        i = 0
    }
    else {
        i++
    }
    let img = document.getElementById('imgInGallery')
    img.crossOrigin = 'anonymous'
    img.src = galleryImages[i]
    document.getElementById('galleryDesc').innerHTML = galleryTitle[i]
    document.getElementById('descLink').href = galleryUrl[i]
}

function previousImg() {
    if (i === 0) {
        i = articlesShown
    }
    else {
        i--
    }
    document.getElementById("imgInGallery").src = galleryImages[i]
    document.getElementById('galleryDesc').innerHTML = galleryTitle[i]
    document.getElementById('descLink').href = galleryUrl[i]
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let numberOfResults = data.totalResults
    console.log(data.totalResults)
    let articleTitle = data.articles[0].title
    let articleUrl = data.articles[0].url
    let articleImage = data.articles[0].urlToImage
    if (numberOfResults < 5) {
      articlesShown = numberOfResults
    }
    else {
      articlesShown = 5
    }
    for (a = articlesShown; a != -1; a--) {
      galleryImages[a] = data.articles[a].urlToImage
      galleryTitle[a] = data.articles[a].title
      galleryUrl[a] = data.articles[a].url
    }
    document.getElementById('imgInGallery').src = articleImage
    document.getElementById('galleryDesc').innerHTML = articleTitle
    document.getElementById('descLink').href = articleUrl
  })