export class Card{
    constructor(data, templateSelector, handlePreviewPicture){
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handlePreviewPicture = handlePreviewPicture;
    }

_getTemplate(){
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
    return cardElement;
}

//EventListeners
_setEventListeners(){
    this._likeButton.addEventListener("click", ()=>{
        this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", ()=>{
        this._handleDeleteButton();
    });
    this._cardImage.addEventListener("click", ()=>{
        this._handlePreviewPicture({
            name: this._name,
            link: this._link
        });
    });
}

//Handlers
_handleLikeButton(){
    this._likeButton.classList.toggle("card__like-button_is-active");
}
_handleDeleteButton(){
    this._element.remove();
}

//Método público
generateCard(){
    //clonar template
    this._element = this._getTemplate();
    //nodos del DOM
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    //rellenar datos
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    //event listeners
    this._setEventListeners();
    //generar la tarjeta
    return this._element;
}
}
