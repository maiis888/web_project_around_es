import Popup from "./Popup";

/*Esta clase tiene que cambiar el método padre open().
En el método open() de la clase PopupWithImage, debes añadir una imagen al popup y el correspondiente atributo de imagen src junto con una leyenda para la imagen.*/

class PopupWithImage extends Popup {
    constructor (popupSelector){
        super(popupSelector);
    }

open({imageName, imageLink}){
    const imageElement = this._popup.querySelector(".popup__image");
    const captionElement = this._popup.querySelector(".popup__caption")
    imageElement.alt = imageName;
    imageElement.src = imageLink;
    captionElement.textContent = imageName;
    super.open();
}
}