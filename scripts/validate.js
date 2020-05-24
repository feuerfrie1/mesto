const showInputError = (object, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  if (errorMessage) {
      inputElement.classList.add('popup__input_error');
      errorElement.classList.add(object.errorClass);
  } else {
      errorElement.textContent = '';
      inputElement.classList.remove('popup__input_error');
      errorElement.classList.remove(object.errorClass);
}
};

const checkInputValidity = (object, formElement, inputElement) => {
  showInputError(object, formElement, inputElement, inputElement.validationMessage);
};  

const hasInvalidInput = (inputList) => {
return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
};

const toggleButtonState = (object, inputList , buttonElement) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(object.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };
 
const setEventListeners = (object, formElement) => {
const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
const buttonElement = formElement.querySelector(object.submitButtonSelector);
toggleButtonState(object, inputList, buttonElement);
  inputList.forEach((inputElement) => { 
      inputElement.addEventListener('input', () => { 
      checkInputValidity(object, formElement, inputElement); 
      toggleButtonState(object, inputList, buttonElement); 
    }); 
  }); 
}; 

const enableValidation = (object) => { 
  const formLists = Array.from(document.querySelectorAll(object.formSelector)); 
    formLists.forEach((formElement) => { 
      formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault();
      checkInputValidity();
      }); 
      setEventListeners(object, formElement); 
  }); 
};    

enableValidation({ 
formSelector: '.popup__container',
inputSelector: '.popup__input',
submitButtonSelector: '.popup__submit',
inactiveButtonClass: 'popup__submit_inactive',
inputErrorClass: 'popup__error',
errorClass: 'popup__error_active'
});