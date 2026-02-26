//1. Se queda en index
const initialCards = [
    {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
    name: "Parque Nacional de Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
]



//2. Se quedan en index.js (y se pasan a funciones de utils si hace falta).FormValidator no debe saber nada de modales ni de popups, solo de formularios. 
const editProfileModal = document.querySelector("#edit-popup"); //Modal de edición de perfil
const newCardModal = document.querySelector("#new-card-popup"); //Modal para agregar tarjeta
const imageModal = document.querySelector("#image-popup"); //Modal para ampliar imagen

//3. Estos son querySelectors de botones. Estos irán en utils.js para la función que abre y cierra modales
// --> Los querySelector de botones van en index.js. Lo que irá en utils.js son las funciones openModal, closeModal, etc.
//Botones
const openProfileEditButton = document.querySelector(".profile__edit-button");
const openAddNewCardButton = document.querySelector(".profile__add-button");
const closeProfileEditButton = editProfileModal.querySelector(".popup__close");
const closeAddNewCardButton = newCardModal.querySelector(".popup__close");
const closeImageModalButton = imageModal.querySelector(".popup__close");

//4. Estos nodos se usan en los formularios, entonces irán en la clase FormValidator
//Nodos de modales
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//5.1 Estos valores pertenecen a los parámetros que necesitará el método público para regresar una tarjeta en la clase Card.
const cardsContainer = document.querySelector(".cards__list");
//5.2 Este es un parámetro del constructor de la clase Card: cardSelector
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

//6. Estas variables se usan en los formularios, entonces irán en la clase FormValidator
const newCardForm = newCardModal.querySelector("#new-card-form");
const pictureElement = imageModal.querySelector(".popup__image");
const pictureCaption = imageModal.querySelector(".popup__caption");
//Inputs de formulario
const nameInput= editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput= editProfileModal.querySelector(".popup__input_type_description");
const cardNameInput = newCardModal.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const profileInputList = [nameInput, descriptionInput];
const newCardInputList = [cardNameInput, cardLinkInput];
//Formulario de perfil y campos para validación
const profileForm = document.querySelector('#edit-profile-form');
const profileSubmitButton = profileForm.querySelector('.popup__button');
//7. Esta variable para el botón la necesito en el método de la clase Card para generar la tarjeta
const newCardSubmitButton = newCardForm.querySelector('.popup__button');
//8. De nuevo, esto irá en la clase FormValidator
//Selectores para los mensajes de error
const nameError = profileForm.querySelector('.name-input-error');
const descriptionError = profileForm.querySelector('.description-input-error');
const cardNameError = newCardForm.querySelector('.place-name-input-error');
const linkError = newCardForm.querySelector('.link-input-error');

//9. Los event listeners van en FormValidator
//Event listener para inputs de formulario
const setEventListeners = (formElement, inputList, buttonElement) => {
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', ()=>{
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
    toggleButtonState(inputList, buttonElement);
}
setEventListeners(profileForm, profileInputList, profileSubmitButton);
setEventListeners(newCardForm, newCardInputList, newCardSubmitButton);
toggleButtonState(profileInputList, profileSubmitButton);

//10. Estas funciones para abrir y cerrar modales irán en utils.js
// Funciones
function openModal(modal){
    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
}
function closeModal(modal){
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
}
function handleOpenEditModal(){
    fillProfileForm();
    openModal(editProfileModal);
}

//11. Este formará parte de FormValidator
function fillProfileForm () {
nameInput.value = profileTitle.textContent;
descriptionInput.value = profileDescription.textContent;
}

//12. Esta función handle tipo submit irá en la clase FormValidator 
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editProfileModal);
}

//13. Estas funciones irán en la clase Card
function handleLikeButton(evt){
    evt.target.classList.toggle("card__like-button_is-active");
}
function handleDeleteButton(evt) {
const card = evt.target.closest(".card");
card.remove();
}
function handlePreviewPicture(card){
pictureElement.src = card.link;
pictureCaption.textContent = card.name; 
pictureElement.alt = card.name;
    openModal(imageModal);
}
//1. card.js
function renderCard(name, link, container){
const newCard = getCardElement(name, link);
container.prepend(newCard);
}

function getCardElement(name, link){
const cardElement = cardTemplate.cloneNode(true);
const cardTitle = cardElement.querySelector(".card__title");
const cardImage = cardElement.querySelector(".card__image");
const likeButton = cardElement.querySelector(".card__like-button");
const deleteButton = cardElement.querySelector(".card__delete-button");
cardImage.src = link;
cardImage.alt = name;
cardTitle.textContent = name;
likeButton.addEventListener("click", handleLikeButton);
deleteButton.addEventListener("click", handleDeleteButton);
cardImage.addEventListener("click", () => {
handlePreviewPicture({ name, link });
});
return cardElement;
}
//1. card.js

//14. Esta función irá en FormValidator
function handleCardFormSubmit(evt){
    evt.preventDefault(); // sin esto la página se refresca
    renderCard(
        cardNameInput.value, // solo necesito el texto del input, asi lo recibe la funcion
        cardLinkInput.value, // y acá solo la URL como string
        cardsContainer
    );
    cardNameInput.value = ""; // reseteo los campos para la próxima
    cardLinkInput.value = "";
    closeModal(newCardModal); // cierro el modal y listo
    
};

//15. Estos event listeners irán en un método público setEventListeners() en FormValidator 
//Event listeners
openProfileEditButton.addEventListener("click", () => {
handleOpenEditModal();
});
openAddNewCardButton.addEventListener("click", () =>{
    openModal(newCardModal);
});
closeProfileEditButton.addEventListener("click", () =>{
    closeModal(editProfileModal);
});
closeAddNewCardButton.addEventListener("click", () =>{
    closeModal(newCardModal);
});
closeImageModalButton.addEventListener("click", () =>{
    closeModal(imageModal);
});
initialCards.forEach(card => {
renderCard(card.name, card.link, cardsContainer);
});
newCardForm.addEventListener("submit", handleCardFormSubmit,);
editProfileModal.addEventListener('submit', handleProfileFormSubmit);

//16. Las funciones restantes irán en FormValidator
//Función para controlar el estado del botón
function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput (inputList)){
        buttonElement.classList.add ('popup__button_inactive');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__button_inactive');
        buttonElement.disabled = false;
    }
}

//Detectar si hay inputs inválidos
function hasInvalidInput(inputList){
    return inputList.some((inputElement) =>{
        return !inputElement.validity.valid;
    });
}

//Mostrar/ocultar mensaje de error
function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = ""
};

function checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid){
        showInputError(formElement,inputElement, inputElement.validationMessage)
    } else {
        hideInputError (formElement, inputElement);
    }
};

//Close modal click overlay
function closePopupOverlay (popupOverlay){
    popupOverlay.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModal(popupOverlay);
        }
    });
}
closePopupOverlay (editProfileModal);
closePopupOverlay (newCardModal);
closePopupOverlay (imageModal);

//Close modal esc key
function handleEscClose (evt){
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

/*Se queda:
import { Card } from "./Card.js";
import { openModal } from "./utils.js";

const cardsContainer = document.querySelector(".cards__list");
const imageModal = document.querySelector("#image-popup");
const pictureElement = imageModal.querySelector(".popup__image");
const pictureCaption = imageModal.querySelector(".popup__caption");

función que le pasamos a Card para hacer el preview
function handlePreviewPicture({ name, link }) {
  pictureElement.src = link;
  pictureElement.alt = name;
  pictureCaption.textContent = name;
  openModal(imageModal);
}

crear una card desde initialCards
initialCards.forEach((item) => {
  const card = new Card(item, "#card-template", handlePreviewPicture);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}); */