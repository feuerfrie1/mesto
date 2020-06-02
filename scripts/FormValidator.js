export default class FormValidator {
  constructor(object, element) {
    this._element = element;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners(this._element);
  };
}
