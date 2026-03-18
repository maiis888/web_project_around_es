export class UserInfo {
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