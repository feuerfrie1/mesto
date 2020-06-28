export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  prependItem(element) {
    this._containerSelector.prepend(element);
  }
}
