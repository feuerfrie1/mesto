import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._popupSelector.querySelector(".popup__image").src = link;
    this._popupSelector.querySelector(".popup__image").alt = name;
    this._popupSelector.querySelector(".popup__imagename").textContent = name;
    super.open();
  }
}
