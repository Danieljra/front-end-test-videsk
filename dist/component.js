/**
 * Copyright (C) 2024 by videsk - All Rights Reserved
 * @name @videsk/frontend-junior-dev-2024
 * @author Videsk
 * @license ISC
 * Written by videsk
 * Date 1719858117244
 *
 * Frontend Junior developer tests
 * 
 * Do not copy this code.
*/
(function () {

  class ArticleComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
            <style>
                .article {
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin: 10px 0;
                    cursor: pointer;
                }
                .article img {
                    max-width: 100%;
                }
                .content {
                    display: none;
                }
                .author-info {
                    display: none;
                }
            </style>
           <div class="article">
                <h2 id="title"></h2>
                <p class="author"></p>
                <img id="image" />
                <p id="company"></p>
                <p id="description"></p>
                <div id="content"></div>
                <div id="author-info" class="author-info"></div>
                <button id="show-author-info"></button>
            </div>
        `;
    }

    set title(value) {
      this.shadowRoot.querySelector('#title').innerText = value;
    }

    set image(value) {
      this.shadowRoot.querySelector('#image').src = value;
    }

    set company(value) {
      this.shadowRoot.querySelector('#company').innerText = value;
    }

    set description(value) {
      this.shadowRoot.querySelector('#description').innerText = value;
    }

    set content(value) {
      this.shadowRoot.querySelector('#content').innerText = value;
    }

    set author(value) {
      this._author = value;
      this.renderAuthorInfo();
      this.updateAuthorButton();
    }

    renderAuthorInfo() {
      if (this._author) {
        const authorInfo = this.shadowRoot.querySelector('#author-info');
        authorInfo.innerHTML = `
                <author-component></author-component>
            `;
        const authorComponent = authorInfo.querySelector('author-component');
        authorComponent.author = this._author;
      }
    }

    updateAuthorButton() {
      if (this._author) {
        const showAuthorInfoButton = this.shadowRoot.querySelector('#show-author-info');
        showAuthorInfoButton.textContent = `Ver más acerca de ${this._author.name}`;
      }
    }

    connectedCallback() {
      this.shadowRoot.querySelector('.article').addEventListener('click', () => {
        const contentDiv = this.shadowRoot.querySelector('#content');
        contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
      });

      this.shadowRoot.querySelector('#show-author-info').addEventListener('click', (event) => {
        event.stopPropagation();
        const authorInfo = this.shadowRoot.querySelector('#author-info');
        authorInfo.style.display = authorInfo.style.display === 'none' ? 'block' : 'none';
      });
    }
  }

  customElements.define('article-component', ArticleComponent);

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

  class AuthorComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
            <style>
                .author {
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin: 10px 0;
                }
                .author img {
                    max-width: 100%;
                }
            </style>
            <div class="author">
                <img id="avatar" src="" alt="Author Avatar">
                <h2 id="name"></h2>
                <p id="birthdate"></p>
                <p id="bio"></p>
            </div>
        `;
    }

    set author(value) {
      this._author = value;
      this.render();
    }

    get author() {
      return this._author;
    }

    render() {
      this.shadowRoot.querySelector('#avatar').src = this._author.avatar;
      this.shadowRoot.querySelector('#name').innerText = this._author.name;
      this.shadowRoot.querySelector('#birthdate').innerText = this._author.birthdate;
      this.shadowRoot.querySelector('#bio').innerText = this._author.bio;
    }
  }

  customElements.define('author-component', AuthorComponent);

  document.addEventListener('DOMContentLoaded', () => {
    const articlesListComponent = document.querySelector('articles-list-component');

    fetch('https://5fb46367e473ab0016a1654d.mockapi.io/articles')
      .then((response) => response.json())
      .then((articles) => {
        articlesListComponent.articles = articles;
      });
  });

})();
