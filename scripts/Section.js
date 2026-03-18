export class Section{
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
/*renderItems() {
    this._items.forEach(item => {
    this._renderer(item);
    });
}
*/

renderItems() {
    this._items.forEach(item => {
    const element = this._renderer(item);  // Crea el elemento
    this.addItem(element);                 // Lo agrega al contenedor
    });
}

addItem(element){
    this._container.append(element);
}
}