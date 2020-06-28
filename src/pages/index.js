import './index.css';
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import {
  initialCards,
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
} from "../scripts/utils/constants.js";

const formValidatorAuthor = new FormValidator(object, formInfo);
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(object, popupCreateCard);
formValidatorPlace.enableValidation();

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

cardList.renderItems(initialCards);

const formSubmitPlace = new PopupWithForm(
  {
    handleFormSubmit: (formData) => {
      const arrayImage = [formData];
      cardList.renderItems(arrayImage);
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

formSubmitPlace.close();
popupImage.close();
editButton.addEventListener("click", openProfileForm);
addButton.addEventListener("click", function () {
  formValidatorPlace.clearError();
  formSubmitPlace.open();
});
