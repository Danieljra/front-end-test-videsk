import styles from './styles.css';
import template from './template.html';

export class ArticleComponent extends HTMLElement {
  constructor(authorId) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template}`;
    this.authorId = authorId;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.article').addEventListener('click', this.toggleContent.bind(this));
    this.shadowRoot.querySelector('#show-author-info').addEventListener('click', this.toggleAuthorInfo.bind(this));
  }

  static get observedAttributes() {
    return ['title', 'image', 'company', 'description', 'content', 'author'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  set title(value) {
    this.shadowRoot.querySelector('#title').textContent = value;
  }

  set image(value) {
    this.shadowRoot.querySelector('#image').src = value;
  }

  set company(value) {
    this.shadowRoot.querySelector('#company').textContent = value;
  }

  set description(value) {
    this.shadowRoot.querySelector('#description').textContent = value;
  }

  set content(value) {
    this.shadowRoot.querySelector('#content').textContent = value;
  }

  set author(value) {
    this._author = Number(value);
  }

  get author() {
    return this.authorId || Number(this.getAttribute('author'));
  }

  toggleContent(event) {
    const contentDiv = this.shadowRoot.querySelector('#content');
    contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
  }

  async toggleAuthorInfo(event) {
    event.stopPropagation();
    const author = this.shadowRoot.querySelector('author-component');
    const data = isNaN(author.id) && await this.constructor.fetchAuthor(this.author);
    const authorInfo = this.shadowRoot.querySelector('#author-info');
    authorInfo.classList.toggle('hidden');
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      author.setAttribute(key, value);
    });
    author.render();
  }

  static async fetchAuthor(authorId) {
    const response = await fetch(`https://5fb46367e473ab0016a1654d.mockapi.io/users/${authorId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

customElements.define('article-component', ArticleComponent);