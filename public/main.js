document.addEventListener('DOMContentLoaded', () => {
  const articlesListComponent = document.querySelector('articles-list-component');

  fetch('https://5fb46367e473ab0016a1654d.mockapi.io/articles')
    .then((response) => response.json())
    .then((articles) => {
      articlesListComponent.articles = articles;
    });
});