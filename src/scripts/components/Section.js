export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems(array) {
    array.forEach((item) => {
      this._renderer(item);
    });
  }

  prependItem(element) {
    this._containerSelector.prepend(element);
  }
}
