export default class Bids {
    // Запрос заявок с сервера и сохронение в объект 
    async getBids(){
        try {
            const queryString = `http://jsproject.webcademy.ru/bids`
            const result = await fetch(queryString)
            const data = await result.json()
            this.bids = await data
        } catch (error) {
            alert('Error with getting bids')
            console.log(error)
        }
    }
}
