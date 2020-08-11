import * as view from './bidsView'
import Bids from './bidsModel'

export default async function(state){
    // Создаем объект класса Bids
    if (!state.bids) state.bids = new Bids()
    // Получаем данные с сервера
    await state.bids.getBids()
    // Рендерим заявки
    view.render(state.bids.bids)
}
