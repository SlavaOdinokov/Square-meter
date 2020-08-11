import FavouritesCards from './favouritesCardsModel'
import * as view from './favouritesCardsView'

export default async function(state){
    // Получаем список объектов с избранными (id)
    const favsList = state.favourites.favs
    // Cоздаем объект на основе класса FavouritesCards
    const favouriteCards = new FavouritesCards(favsList)
    // Делаем запрос на сервер для получения объектов по их id
    await favouriteCards.getFavs()
    // Отрисовка карточек
    view.renderPage(favouriteCards.cards)
    addToFavsListener()

    // Обработка клика по иконке "Добавить в избранное"
    function addToFavsListener(){
        Array.from(document.getElementsByClassName('card__like')).forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                // Определяем id карточки по которой кликнули
                const currentId = e.target.closest('.card').dataset.id
                // Добавляем/Удаялем из избранного
                state.favourites.toggleFav(currentId)
                // Меняем состояние иконки 
                view.toggleFavouriteIcon(e.target.closest('.card__like'))
            })
        })
    }
} 
