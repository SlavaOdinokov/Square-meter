export default class Favoutites {
    constructor(){
        // Получаем элементы из LocalStorage при загрузке страницы
        this.favs = this.readStorage()
    }

    // Метод добавляет id объекта в массив избранное
    addFav(id){
        this.favs.push(id)
        // Обновление LS
        this.saveData()
    }

    // Метод удаляет id объекта из массива
    removeFav(id){
        this.favs = this.favs.filter(cardId => cardId !== id)
        // Обновление LS
        this.saveData()
    }

    // Проверка на наличие элемента в масииве избранное
    isFav(id){
        return this.favs.indexOf(id) !== -1
    }

    // Метод переключения
    toggleFav(id){
        this.isFav(id) ? this.removeFav(id) : this.addFav(id)
    }

    // Работа с LS
    saveData(){
        localStorage.setItem('favs', JSON.stringify(this.favs))
    }

    // Получение данных из LS при загрузке страницы
    readStorage(){
        return JSON.parse(localStorage.getItem('favs')) || []
    }
}

