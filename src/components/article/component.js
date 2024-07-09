import styles from './styles.css';
import template from './template.html';
import Author from '../author/component.js'

export class ArticleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template}`;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.article').addEventListener('click', this.toggleContent.bind(this));
    this.shadowRoot.querySelector('#show-author-info').addEventListener('click', this.toggleAuthorInfo.bind(this));
    this.authorComponent = new Author();
    this.shadowRoot.querySelector('#author-info').appendChild(this.authorComponent);
  }

  static get observedAttributes() {
    return ['title', 'image', 'company', 'description', 'content', 'author'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const element = this.shadowRoot.querySelector(`#${name}`);
    const propertyMapping = { image: 'src' };
    if (element) element[propertyMapping[name] || 'innerText'] = newValue;
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get title() {
    return this.getAttribute('title');
  }

  set image(value) {
    this.setAttribute('image', value);
  }

  get image() {
    return this.getAttribute('src');
  }

  set company(value) {
    this.setAttribute('company', value);
  }

  get company() {
    return this.getAttribute('company');
  }

  set description(value) {
    this.setAttribute('description', value);
  }

  get description() {
    return this.getAttribute('description');
  }

  set content(value) {
    this.setAttribute('content', value);
  }

  get content() {
    return this.getAttribute('content');
  }

  set author(value) {
    this.setAttribute('author', value);
  }

  get author() {
    return Number(this.getAttribute('author'));
  }

  toggleContent(event) {
    const contentDiv = this.shadowRoot.querySelector('#content');
    contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
  }

  async toggleAuthorInfo(event) {
    const data = isNaN(this.authorComponent.id) && await this.constructor.fetchAuthor(this.author);
    const authorInfo = this.shadowRoot.querySelector('#author-info');
    authorInfo.classList.toggle('hidden');
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      this.authorComponent.setAttribute(key, value);
    });
    this.authorComponent.render();
  }

  static async fetchAuthor(authorId) {
    const response = await fetch(`https://5fb46367e473ab0016a1654d.mockapi.io/users/${authorId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}


customElements.define('article-component', ArticleComponent);
