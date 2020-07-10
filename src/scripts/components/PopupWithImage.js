import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = document.querySelector(".popup__image");
    this.popupText = document.querySelector(".popup__imagename");
  }

  open(data) {
    this.popupImage.src = data.link;
    this.popupImage.alt = data.name;
    this.popupText.textContent = data.name;
    super.open();
  }
}
