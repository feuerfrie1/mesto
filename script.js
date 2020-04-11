const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const submitButton = document.querySelector('.popup__submit');


function popupOpen() {
    
    popup.classList.remove('popup');
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpen);

function popupClose() {
    
    popup.classList.remove('popup_opened');
    popup.classList.add('popup');
}

popupCloseButton.addEventListener('click', popupClose);

const formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
  
    const nameInput = document.querySelector('.popup__name');
    const aboutInput = document.querySelector('.popup__about');
    const profileTitle = document.querySelector('.profile__info-title');
    const profileSubtitle = document.querySelector('.profile__info-subtitle');

    nameInput.value;
    aboutInput.value;
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
}

popup.addEventListener('submit', formSubmitHandler);
submitButton.addEventListener('click', popupClose);