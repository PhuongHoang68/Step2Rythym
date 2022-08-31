let newsToken = "d7ecf1f23b946ddf28d72ec42e4bd482";
let searchWord = document.getElementById("searchArtist");

// wrap search input inside a eventlistener
function formSubmitHandler(event) {
  let searchWord = document.getElementById("searchArtist");
  event.preventDefault();
  // get value from input element
  let search = searchWord.value;
  console.log(search);
  if (search) {
    getArticles(search);
    searchWord.value = "";
  } else {
    alert("Please enter an Artist");
  }
}

// wrap api fetch inside a function

const getArticles = function (searchWord) {
  let search = searchWord.replace(/\s/g, "+");

  // format the github api url
  var apiUrl = `https://gnews.io/api/v4/search?q=${search}&token=${newsToken}`;

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        return response.json().then(function (data) {
          console.log(data.articles.slice(0, 5));
          let fiveArticles = data.articles.slice(0, 5);
          fiveArticles.forEach((article) => displayArticleCard(article));
          // displayArticleCard(data);
        });
      } else {
        alert("Error: Articles Not Found");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GNews");
    });
};

function displayArticleCard(article) {
  console.log(article);
  console.log(article.title);

  let articlesContainer = document.getElementById("article-card-container");

  const articleCard = document.createElement("div");
  articleCard.classList.add("column", "is-12", "is-mobile");

  const articleTitle = document.createElement("h3");
  articleTitle.classList.add("h3");
  articleTitle.innerText = article.title;

  const articleDesc = document.createElement("p");
  articleDesc.classList.add("p");
  articleDesc.innerText = article.description;

  const articleSrcName = document.createElement("h4");
  articleSrcName.classList.add("h4");
  articleSrcName.innerText = article.source.name;

  const articleSrcUrl = document.createElement("a");
  articleSrcUrl.classList.add("a");
  articleSrcUrl.href = article.source.url;
  articleSrcUrl.innerText = article.source.name;

  articleCard.append(articleTitle, articleDesc, articleSrcName, articleSrcUrl);

  articlesContainer.append(articleCard);
}

$("#search-form").on("submit", formSubmitHandler);
