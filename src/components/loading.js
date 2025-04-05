class LoadingIndicator extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <div class="loading"></div>
      `;
    }
  
    show() {
      const loadingElement = this.querySelector(".loading");
      loadingElement.style.display = "block";
    }
  
    hide() {
      const loadingElement = this.querySelector(".loading");
      loadingElement.style.display = "none";
    }
  }
  
  customElements.define("loading-indicator", LoadingIndicator);
  