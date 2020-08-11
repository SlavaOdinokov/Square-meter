import SingleItem from './singleItemModel'
import * as view from './singleItemView'

export default async function(state){
    
    // Создаем объект с данными
    state.singleItem = new SingleItem(state.routeParams)
    // Получаем данные с сервера
    await state.singleItem.getItem()
    // Отрисовываем разметку для отдельного объекта
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id))

    // -----------------------------
    // Запускаем прослушку событий
    // -----------------------------

    // Открытие модального окна
    document.querySelector('.button-order').addEventListener('click', () => {
        view.showModal()
    })
    
    // Закрытие модального окна по кнопке 'закрыть'
    document.querySelector('.modal__close').addEventListener('click', () => {
        view.hideModal()
    })

    // Закрытие модального окна по клику вне окна
    document.querySelector('.modal-wrapper').addEventListener('click', (e) => {
        if (!e.target.closest('.modal')) {
            view.hideModal()
        } 
    })

    // Отправка формы
    document.querySelector('.modal__form').addEventListener('submit', async function(e){
        e.preventDefault()
        // Собираем данные с формы
        const formData = view.getInput()
        // Отправляем данные на сервер
        await state.singleItem.submitForm(formData)

        const response = state.singleItem.response
        const check = document.querySelector('#policy')

        if (response.message === 'Bid Created' && check.checked) {
            alert('Ваша заявка получена!')
            view.hideModal()
            view.clearInput()
        } else if (response.message === 'Bid Not Created') {
            response.errors.forEach(item => {
                alert(item)
            })
        } else if (!check.checked) {
            alert('Примите согласие обработки персональных данных!')
        }
    })

    // Клик "Добавить в избранное"
    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        // Добавляем/Удаляем объект в избранном
        state.favourites.toggleFav(state.singleItem.id)
        // Переключем класс на кнопке
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id))
    })
}
