import favouritesCards from './../favouritesCards/favouritesCardsController'

export default function(state){
    // Отчищаем контейнер приложения
    document.querySelector('#app').innerHTML = ''
    // Запускаем компонент
    favouritesCards(state)
}
