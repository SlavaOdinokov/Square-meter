import * as view from './listingView'

export default function(state){
    // Рендерим контейнер для карточек
    view.render()
    // Рендерим карточки
    state.results.forEach(item => {
        view.renderCard(item, state.favourites.isFav(item.id))
    })
    // Запускаем прослушку клика по иконке "Добавить в избранное"
    addToFavsListener()

    // Прослушка сгенерированного события - рендер карточек
    state.emitter.subscribe('event: render-listing', () => {
        // Отчищаем контейнер с карточками
        view.clearListingContainer()
        // Рендерим карточки согласно фильтра
        state.results.forEach(item => {
            view.renderCard(item, state.favourites.isFav(item.id))
        })
        // Запускаем прослушку клика по иконке "Добавить в избранное"
        addToFavsListener()
    })

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
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId))
            })
        })
    }
}
