import { openModal, closeModal, handleEscClose, closePopupOverlay } from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

//Popups / modales
const editProfileModal = document.querySelector("#edit-popup"); //Modal de edición de perfil
const newCardModal = document.querySelector("#new-card-popup"); //Modal para agregar tarjeta
const imageModal = document.querySelector("#image-popup"); //Modal para ampliar imagen

//Botones
const openProfileEditButton = document.querySelector(".profile__edit-button");
const openAddNewCardButton = document.querySelector(".profile__add-button");
const closeProfileEditButton = editProfileModal.querySelector(".popup__close");
const closeAddNewCardButton = newCardModal.querySelector(".popup__close");
const closeImageModalButton = imageModal.querySelector(".popup__close");

//Nodos de modales
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
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
const newCardSubmitButton = newCardForm.querySelector('.popup__button');

//Selectores para los mensajes de error
const nameError = profileForm.querySelector('.name-input-error');
const descriptionError = profileForm.querySelector('.description-input-error');
const cardNameError = newCardForm.querySelector('.place-name-input-error');
const linkError = newCardForm.querySelector('.link-input-error');

//Funciones
function fillProfileForm () {
nameInput.value = profileTitle.textContent;
descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal(){
    fillProfileForm();
    openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editProfileModal);
}

function handlePreviewPicture({name, link}){
pictureCaption.textContent = name; 
pictureElement.alt = name;
pictureElement.src = link;
    openModal(imageModal);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handlePreviewPicture);
  return card.generateCard();
}

function renderCard(cardData, container){
const newCard = createCard(cardData);
container.prepend(newCard);
}

initialCards.forEach((item) => {
renderCard(item, cardsContainer);
});

function handleCardFormSubmit(evt){
    evt.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    renderCard(cardData, cardsContainer);

    cardNameInput.value = "";
    cardLinkInput.value = "";
    closeModal(newCardModal);
    
};

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
newCardForm.addEventListener("submit", handleCardFormSubmit,);
profileForm.addEventListener("submit", handleProfileFormSubmit);

closePopupOverlay (editProfileModal);
closePopupOverlay (newCardModal);
closePopupOverlay (imageModal);

//Para FormValidator.js
const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorMessageClass: "popup__input-error_active",
}

//instancias de clase de FormValidator para cada formulario
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.setEventListeners();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.setEventListeners();