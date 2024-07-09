import styles from './styles.css';
import template from './template.html';

export class AuthorComponent extends HTMLElement {
  constructor(authorId) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${styles}</style>${template}`;
    this.setAttribute('author', authorId);
  }

  static get observedAttributes() {
    return ['author'];
  }

  connectedCallback() {
    this.render();
  }

  set id(value) {
    this.setAttribute('id', value);
  }

  get id() {
    return Number(this.getAttribute('id') || NaN);
  }

  set name(value) {
    return this.setAttribute('name', value);
  }

  get name() {
    return this.getAttribute('name');
  }

  set birthdate(value) {
    return this.setAttribute('birthdate', value);
  }

  get birthdate() {
    return this.getAttribute('birthdate');
  }

  set bio(value) {
    return this.setAttribute('bio', value);
  }

  get bio() {
    return this.getAttribute('bio');
  }

  set avatar(value) {
    return this.setAttribute('avatar', value);
  }

  get avatar() {
    return this.getAttribute('avatar');
  }

  render() {
    if (isNaN(this.id)) return;

    const elements = {
      avatar: this.shadowRoot.querySelector('#avatar'),
      name: this.shadowRoot.querySelector('#name'),
      birthdate: this.shadowRoot.querySelector('#birthdate'),
      bio: this.shadowRoot.querySelector('#bio')
    };

    elements.avatar.src = this.avatar || '';
    elements.avatar.alt = `${this.name}'s avatar`;
    elements.name.textContent = this.name || '';
    elements.birthdate.textContent = this.birthdate ? `Born: ${this.birthdate}` : '';
    elements.bio.textContent = this.bio || '';

    // Toggle visibility of elements based on data presence
    Object.entries(elements).forEach(([key, element]) => {
      if (key !== 'avatar') {
        element.style.display = this[key] ? 'block' : 'none';
      }
    });
  }
}

customElements.define('author-component', AuthorComponent);