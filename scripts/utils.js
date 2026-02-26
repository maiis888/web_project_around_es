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