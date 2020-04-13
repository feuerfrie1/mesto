const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const submitButton = document.querySelector('.popup__submit');
const nameInput = document.querySelector('.popup__name');
const aboutInput = document.querySelector('.popup__about');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const formElement = document.querySelector('.popup__form');

function popupOpen() {
    document.getElementsByClassName('popup');
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
}

function popupClose() {
    document.getElementsByClassName('popup popup_opened');
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
}

editButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('submit', formSubmitHandler);
submitButton.addEventListener('click', popupClose);