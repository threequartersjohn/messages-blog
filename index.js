class MessagePost extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `<p class='messagePost'>${this.textContent}</p>`;
  }
}

customElements.define("message-post", MessagePost);

class MessageList extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <div class="messageListContainer">
      <img class="messageImage" src="https://picsum.photos/50/50" />
      <div class="messageList">
      ${this.innerHTML}
      </div>
    </div>
    `;
  }
}

customElements.define("message-list", MessageList);

console.log("what happened?");
