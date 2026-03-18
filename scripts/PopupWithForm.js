import Popup from "./Popup";

/*
1. Lleva un callback del envío del formulario al constructor, así como el selector popup.

2. Almacena un método privado llamado _getInputValues(), que recopila datos de todos los campos de entrada.

3. Modifica el método padre setEventListeners(). El método setEventListeners() de la clase PopupWithForm debe agregar al formulario
un controlador de eventos submit y el detector de eventos click en el icono para cerrar.

4. Modifica el método padre close() para reiniciar el formulario una vez se cierre el popup.

5. Crea una instancia de la clase PopupWithForm para cada popup.*/

class PopupWithForm extends Popup {
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
        });
        
    }
    
}