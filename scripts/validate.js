const formObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: ".popup__submit_inactive",
  inputErrorClass: ".form__error",
  errorClass: "form__error_active",
}


const showInputError = (form, inputElement, errorMessage) => {
  const formError = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_error');
  formError.textContent = errorMessage;
  formError.classList.add('form__error_active');
};

const hideInputError = (form, inputElement) => {
  const formError = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_error');
  formError.classList.remove('form__error_active');
  formError.textContent = '';
};

const checkInputValidity = (form, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(form, inputElement);
       toggleButtonState(inputList, submitButton);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form);
    toggleButtonState(false);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add('popup__submit_inactive');
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove('popup__submit_inactive');
    submitButton.removeAttribute('disabled');
  }
};

enableValidation({
  form: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: '.popup__submit_inactive',
  inputErrorClass: '.form__error',
  errorClass: '.form__error_active'
});