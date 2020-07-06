import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        let text = this._popupSelector.querySelector('.popup-container__button-add').textContent;
        this._popupSelector.querySelector('.popup-container__button-add').textContent = 'Сохранение...';
        this._handleFormSubmit(this._getInputValues(), this._popupSelector, text);
        this.close();
      },
      { once: true }
    );
  }

  close() {
    super.close();
  }
}
