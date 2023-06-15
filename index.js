class MessagePost extends HTMLElement {
  constructor() {
    super();

    const observer = new IntersectionObserver((observers) => {
      const actualObserver = observers[0];

      if (actualObserver.isIntersecting) {
        this.classList.add('visible');

        if (this.parentElement &&  !this.parentElement.classList.contains('visible')) {
          this.parentElement.classList.add('visible')
        }
      } else {
        this.classList.remove('visible');

        if (
            this.parentElement && !this.nextElementSibling && actualObserver.boundingClientRect.bottom < window.innerHeight) {
          this.parentElement.classList.remove('visible');
        }
      }
    }, { threshold: 1.0})

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
