class ArticlesListComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <style>
                .articles-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 16px;
                }

                @media (max-width: 1200px) {
                    .articles-list {
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    }
                }

                @media (max-width: 768px) {
                    .articles-list {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            <div class="articles-list"></div>
        `;
  }

  set articles(value) {
    this._articles = value;
    this.render();
  }

  get articles() {
    return this._articles;
  }

  async render() {
    this.shadowRoot.querySelector('.articles-list').innerHTML = '';

    for (const article of this._articles) {
      const articleComponent = document.createElement('article-component');
      articleComponent.title = article.title;
      articleComponent.image = article.image;
      articleComponent.company = article.company;
      articleComponent.description = article.description;
      articleComponent.content = article.content;

      try {
        const author = await this.fetchAuthor(article.author);
        articleComponent.author = author;

        this.shadowRoot.querySelector('.articles-list').appendChild(articleComponent);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    }
  }

  fetchAuthor(authorId) {
    return fetch(`https://5fb46367e473ab0016a1654d.mockapi.io/users/${authorId}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }
    );
  }
}

customElements.define('articles-list-component', ArticlesListComponent);
