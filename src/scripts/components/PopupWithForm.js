import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(_popupSelector, { submitForm }) {
    super(_popupSelector);
    this.submitForm = submitForm;
    this._popupSelector = _popupSelector;
  }

  setEventListeners() {
    this._submit = this._setSubmitForm.bind(this);
    this._popupSelector.addEventListener("submit", this._submit, {
      once: false,
    });
    super.setEventListeners();
  }

  _setSubmitForm(evt) {
    evt.preventDefault();
    this.submitForm(this._getInputValues());
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    this._popupSelector.removeEventListener("submit", this.submitForm);
    this._popupSelector.querySelector("form").reset();
    super.close();
  }
}
