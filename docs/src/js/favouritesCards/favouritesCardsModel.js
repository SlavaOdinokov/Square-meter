export default class FavouritesCards {
    constructor(favsList){
        this.favsList = favsList
    }

    // Получения объектов с сервера по их id
    async getFavs(){
        try {
            const ids = this.favsList.toString() // 1,2,3
            if (ids) {
                const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`
                const result = await fetch(queryString)
                const data = await result.json()
                this.cards = await data
            }
        } catch (error) {
            alert('Error with getting favouritesCards')
            console.log(error)
        }
    }
}
