import bids from './../bids/bidsController'

export default function(state){
    // Отчищаем контейнер приложения
    document.querySelector('#app').innerHTML = ''
    // Запускаем компонент bids
    bids(state)
}
