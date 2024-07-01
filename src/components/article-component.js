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
