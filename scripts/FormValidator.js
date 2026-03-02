export class FormValidator {
    constructor (config, formElement){
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorMessageClass = config.errorMessageClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

_toggleButtonState(){
    if (this._hasInvalidInput()){
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    } else {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }
}

_hasInvalidInput(){
    return this._inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
});
}

_showInputError(inputElement, errorMessage){
const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`);
inputElement.classList.add(this._inputErrorClass);
errorElement.textContent = errorMessage;
errorElement.classList.add(this._errorMessageClass);
}

_hideInputError(inputElement){
const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`);
inputElement.classList.remove(this._inputErrorClass);
errorElement.textContent = "";
errorElement.classList.remove(this._errorMessageClass); 
}

_checkInputValidity(inputElement){
if(!inputElement.validity.valid){
    this._showInputError(inputElement, inputElement.validationMessage)
} else{
    this._hideInputError(inputElement);
}
}

setEventListeners(){
this._inputList.forEach((inputElement) => {
inputElement.addEventListener("input", ()=>{
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
});
});
this._toggleButtonState();
}
}