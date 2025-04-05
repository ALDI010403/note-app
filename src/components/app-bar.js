class AppBar extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <header class="app-bar">
          <div class="container">
            <h1 class="app-title">Note App</h1>
          </div>
        </header>
      `;
    }
  }
  
  customElements.define("app-bar", AppBar);
  