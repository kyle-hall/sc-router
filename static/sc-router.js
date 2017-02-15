
(function() {
  'use strict';

  class SCRouter extends HTMLElement {

    constructor() {
      super();
      this._onChanged = this._onChanged.bind(this);
      this._routes = new Map();
    }

    _clearRoutes() {
      this._routes.clear();
    }

    _createRoute(route, view) {

      if (this._routes.has(route)) {
        return console.warn('route already exists');
      }

      this._routes.set(route, view);
    }

    _createRoutes() {
      for (let view of document.querySelectorAll('sc-view')) {
        if (!view.route)
          continue;

        this._createRoute(new RegExp(view.route, 'i'), view);
      }
    }

    _onChanged() {
      const path = window.location.pathname;
      const routes = Array.from(this._routes.keys());
      const route = routes.find(r => r.test(path));
      const data = route.exec(path);

      if (!route) {
        return;
      }

      const newView = this._routes.get(route);

      let outViewPromise = Promise.resolve();
      if (this._currentView) {
        if (this._currentView == newView) {
          this._currentView.update(data);
        }

        outViewPromise = this._currentView.out(data);
      }

      this._currentView = newView;
      outViewPromise.then(_ => newView.in(data));

    }

    go(url) {
      window.history.pushState(null, null, url);
      this._onChanged();
    }

    connectedCallback() {
      window.addEventListener('popstate', this._onChanged);
      this._clearRoutes();
      this._createRoutes();
      this._onChanged();
    }

    disconnectedCallback() {
      window.removeEventListener('popstate', this._onChanged);
    }
  }

  window.customElements.define('sc-router', SCRouter);
})();
