import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const popupImage = this._popupSelector.querySelector(".popup__image");
    popupImage.src = link;
    popupImage.alt = name;
    this._popupSelector.querySelector(".popup__imagename").textContent = name;
    super.open();
  }
}
