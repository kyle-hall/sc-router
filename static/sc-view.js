
(function() {

  class SCView extends HTMLElement {

    constructor() {
      super();
      this._route = this.getAttribute('route');
    }

    connectedCallback() {

    }

    get route() {
      return this._route;
    }

    in(data) {
      return new Promise((resolve, reject) => {
        const onTransitionEnd = () => {
          this.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        };

        this.classList.add('visible');
        this.addEventListener('transitionend', onTransitionEnd);

      });
    }

    out(data) {
      return new Promise((resolve, reject) => {
        const onTransitionEnd = () => {
          this.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        };

        this.classList.add('visible');
        this.addEventListener('transitionend', onTransitionEnd);

      });
    }

    update(data) {
      console.log(data);
      return Promise.resolve();
    }

  }

  window.customElements.define('sc-view', SCView);

})();
