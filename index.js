class WithVisibility extends HTMLElement {
  constructor({threshold = 1} = {}) {
    super();

    const observer = new IntersectionObserver((observers) => {
        const actualObserver = observers[0];

        if (actualObserver.isIntersecting) {
          if (!this.classList.contains('visible')) {
            this.classList.add('visible');
          }

          if (this.parentElement && !this.parentElement.classList.contains('visible')) {
            this.parentElement.classList.add('visible')
          }
        } else {
          if (this.classList.contains('visible')) {
            this.classList.remove('visible');
          }

          if (
              this.parentElement && !this.nextElementSibling && actualObserver.boundingClientRect.bottom < window.innerHeight) {
            this.parentElement.classList.remove('visible');
          }
        }
      }, { threshold: threshold})

      observer.observe(this);
  }
}

class BlogPost extends WithVisibility {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('blogPost')
  }
}

class BlogImage extends WithVisibility {
  constructor() {
    super({threshold: 0.2});
  }

  connectedCallback() {
    ['src', 'alt'].map((attr) => {
        if (!this.hasAttribute(attr)) {
          throw new Error(`<blog-image> component requires '${attr}' attribute`);
        }
      })

      this.classList.add('blogImage');

      this.innerHTML = `
      <a target="_blank" rel="noopener noreferrer" href="${this.getAttribute('src')}"><img alt="${this.getAttribute('alt')}" src="${this.getAttribute('src')}" /></a>
      `;
    }
}

class BlogVideo extends WithVisibility {
  constructor() {
    super({threshold: 0.2});
  }

  connectedCallback() {
    ['src'].map((attr) => {
        if (!this.hasAttribute(attr)) {
          throw new Error(`<blog-image> component requires '${attr}' attribute`);
        }
      })

      const source = this.getAttribute('src');

      this.classList.add('blogVideo');

      this.innerHTML = `
      <video playsinline controls preload="metadata">
        <source src="${source}" type="video/quicktime">
      </video>
      `;
    }
}

class BlogList extends HTMLElement {
  static slotted;

  constructor() {
    super();

    this.slotted = this.innerHTML;
  }

  connectedCallback() {
    this.classList.add('blogListContainer')

    this.innerHTML = `
      <div class="container" aria-label="${this.getAttribute('emoji') ?? '🧑‍💻'}">
      ${this.slotted}
      </div>

      <span aria-hidden="true">${this.getAttribute('emoji') ?? '🧑‍💻'}</span>
    `;
  }
}

class HelpDialog extends HTMLElement {
  static slotted;

  constructor() {
    super();

    this.slotted = this.innerHTML;
  }

  connectedCallback() {
    this.innerHTML = `
    <dialog id="modal">
      <div class="container">
        ${this.slotted}
        <form method="dialog">
          <button type="submit">Close</button>
        </form>
      </div>
    </dialog>
    `

    this.firstElementChild.classList.add('helpDialog');
  }
}

class HelpButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const button = document.createElement('button');

    button.textContent = "🤔"
    button.classList.add('helpButton');
    button.onclick = () => {
      document.getElementById('modal').showModal()
    };

    this.appendChild(button);
  }
}

customElements.define("blog-image", BlogImage);
customElements.define("blog-list", BlogList);
customElements.define("blog-post", BlogPost);
customElements.define("blog-video", BlogVideo);
customElements.define("help-button", HelpButton);
customElements.define("help-dialog", HelpDialog );
