import Filter from './filterModel'
import * as view from './filterView'
import * as preloader from './../preloader/preloaderView'

export default async function(state){
    // Создаем объект фильтра на основе класса Filter
    if (!state.filter) state.filter = new Filter()
    // Получение параметров для фильтра с сервера
    await state.filter.getParams()
    // Рендерим прелоадер
    preloader.renderPreloader()
    // Делаем запрос на сервер при старте страницы, получаем все карточки
    await state.filter.getResults()
    // Удаляем прелоадер
    preloader.removePreloader()
    // Отображаем фильтр на странице
    view.render(state.filter.params)
    // Сохроняем полученные данные в state приложения
    state.results = state.filter.result
    // Обновляем счетчик на кнопке 'Показать...'
    view.changeButtonText(state.filter.result.length)

    // Прослушка событий формы фильтра
    const form = document.querySelector('#filterForm')
    
    // Изменение формы
    form.addEventListener('change', async function(e){
        e.preventDefault()
        // Получаем строку для запроса на сервер
        state.filter.query = view.getInput()
        // Делаем запрос на сервер
        await state.filter.getResults()
        // Сохроняем полученные данные в state приложения
        state.results = state.filter.result
        // Обновляем счетчик на кнопке
        view.changeButtonText(state.filter.result.length)
    })

    // Прослушка кнопки сброса фильтра
    form.addEventListener('reset', async function(){
        // Обнуляем строку запроса
        state.filter.query = ''
        // Делаем запрос на сервер
        await state.filter.getResults()
        // Обновляем счетчик на кнопке
        view.changeButtonText(state.filter.result.length)
        // Обновляем данные в state приложения
        state.results = state.filter.result
        state.emitter.emit('event: render-listing', {})
    })

    // Прослушка отправки формы
    form.addEventListener('submit', async function(e){
        e.preventDefault()
        // Генерируем событие
        state.emitter.emit('event: render-listing', {})
    })
}
