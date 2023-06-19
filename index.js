class MessageVisibleObserver extends HTMLElement {
  constructor(threshold = 1) {
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

class MessagePost extends MessageVisibleObserver {
  constructor() {
    super();

    this.classList.add('messagePost')
  }
}

class MessageImage extends MessageVisibleObserver {
  constructor() {
    super(0.1);

    ['src', 'alt'].map((attr) => {
      if (!this.hasAttribute(attr)) {
        throw new Error(`<message-image> component requires '${attr}' attribute`);
      }
    })

    const description = this.getAttribute('alt');
    const source = this.getAttribute('src');

    this.classList.add('messageImage');

    this.innerHTML = `
    <a target="_blank" rel="noopener noreferrer" href="${source}"><img alt="${description}" src="${source}" /></a>
    `;
  }
}

class MessageVideo extends MessageVisibleObserver {
  constructor() {
    super(0.1);

    ['src'].map((attr) => {
      if (!this.hasAttribute(attr)) {
        throw new Error(`<message-image> component requires '${attr}' attribute`);
      }
    })

    const source = this.getAttribute('src');

    this.classList.add('messageVideo');

    this.innerHTML = `
    <video playsinline controls preload="metadata">
      <source src="${source}" type="video/quicktime">
    </video>

    `;
  }
}

class MessageList extends HTMLElement {
  constructor() {
    super();

    this.classList.add('messageListContainer')

    this.innerHTML = `
      <div class="container">
      ${this.innerHTML}
      </div>
      
      <span>${this.getAttribute('emoji') ?? '🧑‍💻'}</span>
    `;
  }
}

customElements.define("message-image", MessageImage);
customElements.define("message-list", MessageList);
customElements.define("message-post", MessagePost);
customElements.define("message-video", MessageVideo);
