const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCreateCard = document.querySelector('.popup__createcard');
const popupCloseButton = document.querySelector('.popup__close');
const popupCreateCloseButton = document.querySelector('.popup__createcardclose');
const submitButton = document.querySelector('.popup__submit');
const form = document.querySelectorAll('.form');
const formCardCreate = document.querySelector(".form-card-create");
const nameInput = document.querySelector('.form__input_name');
const aboutInput = document.querySelector('.form__input_about');
const createSrcInput = document.querySelector('.form__input_card-about');
const createNameInput = document.querySelector('.form__input_card-name');
const popupProfile = document.getElementById("profile");
const popupCardCreate = document.getElementById("card-create");
const popupScaleImage = document.getElementById("image-scale");
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const formElement = document.querySelector('.popup__form');
const elements = document.querySelector('.elements');
const createButton = document.querySelector('.popup__create');
const imageScaleButton = document.querySelector('.popup__imagescale');
const bigImage = document.querySelector('.popup__image');
const bigImageName = document.querySelector('.popup__imagename');
const popupImageScale = document.querySelector('.popup__imagescale');
const popupImageScaleCloseButton = document.querySelector('.popup__imagescaleclose');
const inputs = Array.from(document.querySelectorAll(".form__input"));
const errors = Array.from(document.querySelectorAll(".form__error"));
console.log(form);
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function popupOpen() {
    document.getElementsByClassName('popup');
    popup.classList.add('popup_opened');
    clearError(editButton);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
}

function popupClose()  {
    document.getElementsByClassName('popup popup_opened');
    popup.classList.remove('popup_opened');
}

function popupCreateCardClose() {
    document.getElementsByClassName('popup__createcard popup_opened');
    popupCreateCard.classList.remove('popup_opened');
    createNameInput.value = "";
    createSrcInput.value = "";
}

function popupImageScaleClose() {
    document.getElementsByClassName('popup__imagescale popup_opened');
    popupImageScale.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
}

function cardCollect(name, image) {
    const template = document.querySelector('#elements-template').content;
    const element = template.cloneNode(true);
    const elementImageScale = element.querySelector('.elements__imagescale');
    const elementDelete = element.querySelector('.elements__delete');
    const elementImage = element.querySelector('.elements__image');
    const elementTitle = element.querySelector('.elements__title');
    const elementLike = element.querySelector('.elements__like');
    elementTitle.textContent = name;
    elementImage.dataset.name = name;
    elementImage.src = image;
    elementImageScale.addEventListener('click', imageScale);
    elementDelete.addEventListener('click', deleteCard);
    elementLike.addEventListener('click', likeCard);
    return element;
}

function defaultCards() {
    initialCards.forEach(function loadArray(item) {
        elements.append(cardCollect(item.name, item.link));
    });
}

function popupCreateOpen() {
    popupCreateCard.classList.add('popup_opened');
}

function formSubmitAddCard(evt) {
    evt.preventDefault();
    elements.prepend(cardCollect(createNameInput.value, createSrcInput.value));
    createNameInput.value = "";
    createSrcInput.value = "";
}

function likeCard(evt) {
    evt.target.classList.toggle('elements__like_active');
}

function deleteCard(evt) {
    evt.target.closest('.elements__card').remove();
}

function imageScale(evt) {
    document.getElementsByClassName('popup__imagescale');
    imageScaleButton.classList.add('popup_opened');
    const image = evt.target;
    bigImage.src = image.src;
    bigImageName.textContent = image.dataset.name;
    bigImage.alt = image.dataset.name;
}

addButton.addEventListener('click', popupCreateOpen);
createButton.addEventListener('click', formSubmitAddCard);
createButton.addEventListener('click', popupCreateCardClose);
editButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupCreateCloseButton.addEventListener('click',popupCreateCardClose);
popupImageScaleCloseButton.addEventListener('click', popupImageScaleClose);
popup.addEventListener('submit', formSubmitHandler);
submitButton.addEventListener('click', popupClose);
defaultCards();
