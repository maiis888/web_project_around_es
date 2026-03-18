import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor (popupSelector, formSubmit){
        super(popupSelector);
        this._handleFormSubmit = formSubmit;
        this._form = this._popup.querySelector(".popup__form");
    }
    
    close(){
        super.close();
        this._form.reset();
    }
    
    _getInputValues(){
    this._inputList = this._form.querySelectorAll(".popup__input");
    const inputValues = {}

    this._inputList.forEach(input => {
        inputValues[input.name] = input.value
    })
    return inputValues
    }
    
    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener("submit", (evt)=>{
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
        
    }
    
}