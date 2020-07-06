import './index.css';
import { Api } from "../scripts/components/Api.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import {
  elements,
  nameInput,
  aboutInput,
  popup,
  popupCreateCard,
  popupScaleImage,
  editButton,
  object,
  formInfo,
  addButton,
  profileTitle,
  profileSubtitle,
  baseUrl,
  avatar,
  popupConfirm,
  popupUpdateAvatar,
  popupSubmitConfirm,
  profileCover,
} from "../scripts/utils/constants.js";

const api = new Api({baseUrl});

const formValidatorAuthor = new FormValidator(object, formInfo);
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(object, popupCreateCard);
formValidatorPlace.enableValidation();

const formValidatorAvatar = new FormValidator(object, popupUpdateAvatar);
formValidatorAvatar.enableValidation();

const popupImage = new PopupWithImage(popupScaleImage);

function handlePlace(item) {
  const card = new Card(api, item, {
    handleCardClick: () => {
      popupImage.open(item.name, item.link);
    },
    handleCardDelete: (element) => {
      const popupClose = new PopupWithForm({
        handleFormSubmit: ({}, popupSelector, text) => {
          api.deleteCard(`/cards/${item._id}`)
            .then(() => {
              element.remove();
              renderLoading(popupSelector, text);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`)
            });
        }
      }, popupConfirm);
      popupClose.open();
    }
  }, '.card');
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.prependItem(handlePlace(item));
    },
  },
  elements
);

api.getInitialCards('/cards').then((arr) => {
  cardList.renderItems(arr);
});

const formSubmitPlace = new PopupWithForm({
  handleFormSubmit: (formData, popupSelector, text) => {
    api.sendPlaceCard('/cards', formData)
      .then((data) => {
        cardList.prependItem([data]);
        renderLoading(popupSelector, text);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
    }
}, popupCreateCard);

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
  avatar,
  inputAuthor: nameInput,
  inputJob: aboutInput
}, api);
userInfo.userInterface();

const formSubmitHandler = new PopupWithForm({
  handleFormSubmit: (formData, popupSelector, text) => {
    userInfo.setUserInfo(formData, popupSelector, text);
  }
}, popup);


function editForm() {
  formValidatorAuthor.clearError();
  userInfo.getUserInfo();
  formSubmitHandler.open();
}

const formSubmitAvatar = new PopupWithForm({
  handleFormSubmit: (data, popupSelector, text) => {
    api.changeAvatar('/users/me/avatar', data)
    .then((data) => {
      document.querySelector('.profile__avatar').setAttribute('src', data.avatar);
      renderLoading(popupSelector, text);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }
}, popupUpdateAvatar);

function renderLoading(popupSelector, text) {
  popupSelector.classList.remove('popup_opened');
  popupSelector.querySelector('.popup__submit').textContent = text;
  popupSelector.firstElementChild.reset();
}

formSubmitPlace.close();
popupImage.close();
popupSubmitConfirm.addEventListener("click", handlePlace);
editButton.addEventListener("click", editForm);
addButton.addEventListener("click", function () {
  formValidatorPlace.clearError();
  formSubmitPlace.open();
});
profileCover.addEventListener('click', function () {
  formValidatorAvatar.clearError();
  formSubmitAvatar.open();
});