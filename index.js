class MessagePost extends HTMLElement {
  constructor() {
    super();

    const observer = new IntersectionObserver((observers) => {
      const actualObserver = observers[0];

      if (actualObserver.isIntersecting) {
        if (!this.classList.contains('visible')) {
          this.classList.add('visible');
        }

        if (this.parentElement &&  !this.parentElement.classList.contains('visible')) {
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
    }, { threshold: 1})

    observer.observe(this);
  }
}

customElements.define("message-post", MessagePost);

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

customElements.define("message-list", MessageList);
