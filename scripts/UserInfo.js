/**La clase UserInfo es responsable de presentar información sobre el usuario en la página. Esta clase debe:

1. Llevar al constructor un objeto con los selectores de dos elementos: uno que contiene el nombre del usuario, y otro que contiene el trabajo del usuario.
2. Almacenar un método público llamado getUserInfo(), que devuelve un objeto con información sobre el usuario. 
Este método será útil para casos en los que es necesario mostrar los datos del usuario en el formulario abierto.

3. Almacena un método público llamado setUserInfo(), que toma los datos del nuevo usuario y los agrega en la página. */

class UserInfo {
    constructor({nameSelector, jobSelector}){
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }
getUserInfo(){
    const userObject = {
        name: this._nameElement.textContent,
        job: this._jobElement.textContent
    }
return userObject;
}

setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
}
}