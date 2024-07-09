import styles from './styles.css';
import template from './template.html';

export class ArticlesListComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template}`;
    this._articles = [];
  }

  static get observedAttributes() {
    return ['articles'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'articles' && oldValue !== newValue) {
      this.articles = JSON.parse(newValue);
    }
  }

  set articles(value) {
    this._articles = value;
    this.render();
  }

  get articles() {
    return this._articles;
  }

  render() {
    const articlesListElement = this.shadowRoot.querySelector('.articles-list');
    articlesListElement.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (const article of this._articles) {
      const articleComponent = document.createElement('article-component');
      Object.entries(article).forEach(([key, value]) => {
        articleComponent.setAttribute(key, value);
      });

      try {
        fragment.appendChild(articleComponent);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    }

    articlesListElement.appendChild(fragment);
  }
}

customElements.define('articles-list-component', ArticlesListComponent);