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

//Modales 
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
const titleInputModal= editProfileModal.querySelector(".popup__input_type_name");
const descriptionInputModal= editProfileModal.querySelector(".popup__input_type_description");
const newCardForm = newCardModal.querySelector(".popup__form");
const pictureElement = imageModal.querySelector(".popup__image");
const pictureCaption = imageModal.querySelector(".popup__caption");

// Funciones
function openModal(modal){
    modal.classList.add("popup_is-opened");
    console.log("hola");
}
function closeModal(modal){
    modal.classList.remove("popup_is-opened");
    console.log("adiós");
}
function handleOpenEditModal(){
    fillProfileForm();
    openModal(editProfileModal);
}
function fillProfileForm () {
titleInputModal.value = profileTitle.textContent;
descriptionInputModal.value = profileDescription.textContent;
}
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = titleInputModal.value;
    profileDescription.textContent = descriptionInputModal.value;
    closeModal(editProfileModal);
}
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
function renderCard(name, link, container){
const newCard = getCardElement(name, link);
container.prepend(newCard);
console.log("holaa", newCard);
}
function getCardElement(name = "Sin título", link = "./images/placeholder.jpg"){
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
function handleCardFormSubmit(evt){
    evt.preventDefault(); // sin esto la página se refresca
    const cardNameInput = newCardModal.querySelector(".popup__input_type_card-name");
    const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
    renderCard(
        cardNameInput.value, // solo necesito el texto del input, asi lo recibe la funcion
        cardLinkInput.value, // y acá solo la URL como string
        cardsContainer
    );
    cardNameInput.value = ""; // reseteo los campos para la próxima
    cardLinkInput.value = "";
    closeModal(newCardModal); // cierro el modal y listo
    
};

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
