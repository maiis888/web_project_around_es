/*Crea la clase Popupque abre y cierra la ventana emergente, según los siguientes requisitos:
El constructor tiene un solo parámetro, que es el selector popup.
Almacena los métodos públicos open() y close() que abrirán y cerrarán el popup.
Almacena un método privado llamado _handleEscClose() que almacena la lógica para cerrar el popup al pulsar la tecla Esc.
Almacena un método público llamado setEventListeners() que agrega un detector de eventos de click al icono para cerrar el popup. 
La ventana modal también debe cerrarse cuando los usuarios hacen clic en el área sombreada del formulario.*/

export class Popup{
    constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    }

open(){
this._popup.classList.add("popup_is-opened");
document.addEventListener("keydown", this._handleEscClose);
}

close(){
this._popup.classList.remove("popup_is-opened");
document.removeEventListener("keydown", this._handleEscClose);
}

_handleEscClose(evt){
    if (evt.key === "Escape") {
        this.close();
    }
}

setEventListeners(){
this._popup.querySelector(".popup__close")
.addEventListener("click", () => {
this.close();
});

this._popup.addEventListener("mousedown", (evt) => {
    if(evt.target === evt.currentTarget){
        this.close();
    }
});

    }
}