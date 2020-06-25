import './index.css';
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Popup } from "./scripts/components/Popup.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { Section } from "./scripts/components/Section.js";
import { UserInfo } from "./scripts/components/UserInfo.js";
import {
  initialCards,
  elements,
  nameInput,
  aboutInput,
  createButton,
  popup,
  popupCreateCard,
  popupImageScale,
  popupScaleImage,
  editButton,
  object,
  formInfo,
  addButton,
  popupCreateCloseButton,
  profileTitle,
  profileSubtitle,
} from "./scripts/utils/constants.js";

const formValidatorAuthor = new FormValidator(object, formInfo);
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(object, popupCreateCard);
formValidatorPlace.enableValidation();

function closePopup() {
  popup.classList.remove("popup_opened");
  popupCreateCard.classList.remove("popup_opened");
  popupScaleImage.classList.remove("popup_opened");
}

const popupImage = new PopupWithImage(popupScaleImage);

function handlePlace(data) {
  const card = new Card(
    data,
    {
      handleCardClick: () => {
        popupImage.open(data.name, data.link);
      },
    },
    ".card"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.prependItem(handlePlace(data));
    },
  },
  elements
);

cardList.addItem(initialCards);

const formSubmitPlace = new PopupWithForm(
  {
    handleFormSubmit: (formData) => {
      const arrayImage = [formData];
      cardList.addItem(arrayImage);
    },
  },
  popupCreateCard
);

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  aboutSelector: profileSubtitle,
});

const profileForm = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
    },
  },
  popup
);

const openProfileForm = () => {
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  aboutInput.value = infoAuthor.info;
  formValidatorAuthor.clearError();
  profileForm.open();
};

function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
}

formSubmitPlace.close();
popupImage.close();
editButton.addEventListener("click", openProfileForm);
createButton.addEventListener("click", closePopup);
popupCreateCloseButton.addEventListener("click", closePopup);
popupScaleImage.addEventListener("click", closePopup);
popup.addEventListener('click', closePopupOnOverlay);
popupImageScale.addEventListener('click', closePopupOnOverlay);
popupCreateCard.addEventListener('click', closePopupOnOverlay);
addButton.addEventListener("click", function () {
  formValidatorPlace.clearError();
  formSubmitPlace.open();
});
