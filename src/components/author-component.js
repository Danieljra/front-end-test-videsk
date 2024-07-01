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
