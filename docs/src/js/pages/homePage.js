import filter from './../filter/filterController'
import listing from './../listing/listingController'

export default async function(state){
    // Отчищаем контейнер приложения
    document.querySelector('#app').innerHTML = ''
    // Запускаем компонент фильтр
    await filter(state)
    // Запускаем компонент показывающий карточки
    listing(state)
}
