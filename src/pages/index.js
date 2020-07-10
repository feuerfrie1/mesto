import "./index.css";
import { Api } from "../scripts/components/Api.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Popup } from "../scripts/components/Popup.js";
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
  popupConfirm,
  popupUpdateAvatar,
  profileCover,
  cardTemplate,
  submitButton,
  popupSubmitConfirm,
  popupSubmitAvatar,
} from "../scripts/utils/constants.js";

export const token = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-12",
  headers: {
    authorization: "2eeb39c4-648d-45ea-9400-2121e3e34a4d",
    "Content-Type": "application/json",
  },
};

export const api = new Api(token);

const popupImage = new PopupWithImage(popupScaleImage);

api.getInitialCards("/cards").then((arr) => {
  cardList.renderItems(arr.reverse());
});

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        cardTemplate,
        () => api.putLike(item._id),
        () => api.deleteLike(item._id),
        {
          data: item,
          handleCardClick: () => {
            popupImage.open(item);
          },
        },
        () => confirmPopup.submit(item._id)
      );
      const cardElement = card.generateCard();
      cardList.prependItem(cardElement);
    },
  },
  elements
);

const openFormPic = new PopupWithForm(popupCreateCard, {
  submitForm: (item) => {
    api
      .addNewCard(item.name, item.link)
      .then((res) => {
        const card = new Card(
          cardTemplate,
          () => api.putLike(res._id),
          () => api.deleteLike(res._id),
          {
            data: res,
            handleCardClick: () => {
              popupImage.open(res);
            },
          },
          () => confirmPopup.submit(res._id)
        );
        const cardElement = card.generateCard();
        cardList.prependItem(cardElement);
      })
      .catch((err) => {
        console.log(err);
      });
    openFormPic.close();
  },
});

const confirmPopup = new Popup(popupConfirm);
confirmPopup.submit = function (_id) {
  confirmPopup.open();
  popupSubmitConfirm.addEventListener("click", (evt) => {
    evt.preventDefault();
    document.getElementById(_id).remove();
    api.deleteCard(_id);
    this.close();
  });
};

export const formProfileInfo = {
  profileAuthor: document.querySelector(".profile__info-title"),
  profileStatus: document.querySelector(".profile__info-subtitle"),
  profileAvatar: document.querySelector(".profile__avatar"),
};

const userInfo = new UserInfo(formProfileInfo);

api
  .getUserInfo()
  .then((user) => {
    userInfo.getUserInfo(user.name, user.about, user.avatar);
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

const openFormInfo = new PopupWithForm(popup, {
  submitForm: (item) => {
    renderLoading(popup);
    api
      .updateUserInfo(item.name, item.about)
      .then((res) => {
        userInfo.setUserInfo(res);
        openFormInfo.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const openInfoForm = () => {
  formValidatorAuthor.clearError();
  submitButton.textContent = "Сохранить";
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  aboutInput.value = infoUser.about;
  openFormInfo.open();
};

const updateAvatar = new PopupWithForm(popupUpdateAvatar, {
  submitForm: (item) => {
    renderLoading(popupUpdateAvatar);
    api
      .setUserAvatar(item.avatar)
      .then((item) => {
        userInfo.writeUserAvatar(item);
      })
      .then(() => {
        updateAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

function renderLoading(popupSelector) {
  const formButton = popupSelector.querySelector(".popup__submit");
  formButton.textContent = "Сохранение...";
}

const formValidatorAuthor = new FormValidator(object, formInfo);
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(object, popupCreateCard);
formValidatorPlace.enableValidation();

const formValidatorAvatar = new FormValidator(object, popupUpdateAvatar);
formValidatorAvatar.enableValidation();

popupImage.close();
editButton.addEventListener("click", openInfoForm);
addButton.addEventListener("click", function () {
  formValidatorPlace.clearError();
  openFormPic.open();
});
profileCover.addEventListener("click", function () {
  popupSubmitAvatar.textContent = "Сохранить";
  formValidatorAvatar.clearError();
  updateAvatar.open();
});
