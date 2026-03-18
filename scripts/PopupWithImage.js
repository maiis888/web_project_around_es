import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector){
        super(popupSelector);
    }

open({name, link}){
    const imageElement = this._popup.querySelector(".popup__image");
    const captionElement = this._popup.querySelector(".popup__caption")
    imageElement.alt = name;
    imageElement.src = link;
    captionElement.textContent = name;
    super.open();
}
}