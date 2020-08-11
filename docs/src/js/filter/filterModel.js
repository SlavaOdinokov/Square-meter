export default class Filter {
    constructor(){
        this.query = ''
    }
    
    // Получаем данные для фильтра с сервера
    async getParams(){
        try {
            const queryString = 'http://jsproject.webcademy.ru/itemsinfo'
            const response = await fetch(queryString)
            const data = await response.json()
            this.params = await data
        } catch (error) {
            alert(error)
        } 
    }

    // Получаем данные всех карточек с сервера
    async getResults(){
        try {
            const queryString = `http://jsproject.webcademy.ru/items${this.query}`
            const response = await new Promise(resolve => setTimeout(() => resolve(fetch(queryString)), 2000))
            const data = await response.json()
            this.result = await data
        } catch (error) {
            alert('Error with getting Filter')
            console.log(error)
        } 
    }
}



