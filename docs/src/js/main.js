import homePage from './pages/homePage'
import singleItem from './pages/singleItem'
import favouritesPage from './pages/favouritesPage'
import bidsPage from './pages/bidsPage'
import errorPage from './pages/errorPage'
import EventEmitter from './utils/EventEmitter'
import Favourites from './favoutites/favoutitesModel'

// Состояние приложения
const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites()
}

// Для тестирования!
window.state = state

// Routes
const routes = {
    '/': homePage,
    'item': singleItem,
    'favourites': favouritesPage,
    'bids': bidsPage
}

// Функция работы роутора
function router(){
    //  Разбиваем массив c путем на части
    const pathArray = location.hash.split('/')
    // Определяем текущий путь
    const currentPath = pathArray[0] && pathArray[1] ? pathArray[1] : '/'
    // Сохраняем параметр пути c id карточки
    state.routeParams = pathArray[2] ? pathArray[2] : ''
    // Выбираем компонент для указанного адреса, либо компонент с ошибкой
    const component = routes[currentPath] || errorPage

    component(state)
}

// Прослушка событий и запуск роутера
window.addEventListener('load', router) // событие загрузки страницы
window.addEventListener('hashchange', router) // событие перехода по ссылкам внутри страницы
