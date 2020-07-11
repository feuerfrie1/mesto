export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems(array, userId) {
    array.forEach((item) => {
      this._renderer(item, userId);
    });
  }

  prependItem(element) {
    this._containerSelector.prepend(element);
  }
}
