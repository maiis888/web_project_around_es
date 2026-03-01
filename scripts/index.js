import { openModal, closeModal, handleEscClose, closePopupOverlay } from "./utils.js";
import { Card } from "./Card.js";

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
        name: cardLinkInput.value,
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

closePopupOverlay (editProfileModal);
closePopupOverlay (newCardModal);
closePopupOverlay (imageModal);