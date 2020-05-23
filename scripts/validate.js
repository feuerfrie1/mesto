const showInputError = (object, formElement, element, errorMessage) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`);
  element.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

const hideInputError = (object, formElement, element) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`);
  element.classList.remove('popup__input_error');
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

const isValid = (object, formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(object, formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(object, formElement, formInput);
  }
};

const setEventListeners = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(object, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(object, formElement, inputElement);
      toggleButtonState(object, inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formElement));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(object, formElement);
});
};

enableValidation ({
  formElement: '.popup-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: '.popup__submit_inactive',
  inputErrorClass: '.popup__error',
  errorClass: '.popup__error_active'
});
