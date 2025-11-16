//Variables
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopupModal = document.querySelector("#edit-popup");
const closeButtonModal = editPopupModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInputModal= editPopupModal.querySelector(".popup__input_type_name");
const descriptionInputModal= editPopupModal.querySelector(".popup__input_type_description");


//1. ABRIR Y CERRAR CUADRO EMERGENTE
function openModal(){
    editPopupModal.classList.add("popup_is-opened");
    console.log("hola");
}
function closeModal(){
    editPopupModal.classList.remove("popup_is-opened");
    console.log("adiós");
}
profileEditButton.addEventListener("click", handleOpenEditModal);
closeButtonModal.addEventListener("click", closeModal);

//2. CAMPOS DEL FORMULARIO
function fillProfileForm () {
titleInputModal.value = profileTitle.textContent;
descriptionInputModal.value = profileDescription.textContent;
}

function handleOpenEditModal(){
    fillProfileForm();
    openModal();
}

//3. SUBMIT
let formElement = editPopupModal.querySelector("#edit-profile-form"); 

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    let nameInput = editPopupModal.querySelector(".popup__input_type_name");
    let jobInput = editPopupModal.querySelector(".popup__input_type_description")
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal();
}

formElement.addEventListener('submit', handleProfileFormSubmit);