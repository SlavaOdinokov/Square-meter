import 'url-search-params-polyfill'

// Рендер разметки
export function render(params){
    
    // Преобразовываем массив с названиями комплексов в строку HTML разметки
    let complexNames = ''
    params.complexNames.forEach(name => {
        complexNames += `<option value="${name}">ЖК ${name}</option>`
    })

    // Преобразовываем массив с количеством комнат в строку HTML разметки
    let rooms = ''
    params.roomValues.forEach(value => {
        rooms += `<input
                    name="rooms"
                    type="checkbox"
                    id="rooms_${value}"
                    class="rooms__checkbox"
                    value="${value}"
                /><label for="rooms_${value}" class="rooms__btn">${value}</label>`
    })

    const markup = `<form id="filterForm" method="GET" class="container p-0">
            <div class="heading-1">Выбор квартир:</div>
            <div class="filter">
                <div class="filter__col">
                    <div class="filter__label">Выбор проекта:</div>
                    <select name="complex" id="filter-dropdown" class="filter__dropdown">
                        <option value="all">Все проекты</option>
                        ${complexNames}
                    </select>
                </div>
                <div class="filter__col rooms">
                    <div class="filter__label">Комнат:</div>
                    <div class="rooms__wrapper">
                        ${rooms}
                    </div>
                </div>
                <div class="filter__col">
                    <div class="filter__label">Площадь:</div>
                    <div class="range__wrapper">
                        <label class="range">
                            <div for="" class="range__label">от</div>
                            <input
                                name="sqmin"
                                min="0"
                                type="number"
                                class="range__input"
                                placeholder="${params.squareMin}"
                                value="${params.squareMin}"
                            />
                            <div class="range__value">м2</div>
                        </label>
                        <label class="range">
                            <div for="" class="range__label">до</div>
                            <input
                                name="sqmax"
                                min="0"
                                type="number"
                                class="range__input"
                                placeholder="${params.squareMax}"
                                value="${params.squareMax}"
                            />
                            <div class="range__value">м2</div>
                        </label>
                    </div>
                </div>
                <div class="filter__col">
                    <div class="filter__label">Стоимость:</div>
                    <div class="range__wrapper">
                        <div class="range">
                            <label for="" class="range__label">от</label>
                            <input
                                type="number"
                                name="pricemin"
                                min="0"
                                class="range__input range__input--price"
                                placeholder="${params.priceMin}"
                                value="${params.priceMin}"
                            />
                            <div class="range__value">₽</div>
                        </div>
                        <div class="range">
                            <label for="" class="range__label">до</label>
                            <input
                                type="number"
                                name="pricemax"
                                min="0"
                                class="range__input range__input--price"
                                placeholder="${params.priceMax}"
                                value="${params.priceMax}"
                            />
                            <div class="range__value">₽</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter__buttons">
                <button id="filter-show" class="filter__show">Показать объекты</button>
                <button type="reset" class="filter__reset">Сбросить фильтр</button>
            </div>
        </form>`

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup)
}

// Обновление счетчика на кнопке
export function changeButtonText(number){
    const filterSubmit = document.getElementById('filter-show')
    let message

    if (number > 4) {
        message = `Показать ${number} объектов`
    } else if (number > 1) {
        message = `Показать ${number} объекта`
    } else if (number === 1) {
        message = `Показать ${number} объект`
    } else {
        message = `По Вашему запросу объекты не найдены`
    }
    
    filterSubmit.innerText = message

    // Делаем кнопку не активной если найденно 0 элементов
    filterSubmit.disabled = number === 0
}

// Получение данных с формы фильтра
export function getInput(){
    const filterSelect = document.getElementById('filter-dropdown')
    const filterRooms = document.getElementsByClassName('rooms__checkbox')
    const filterFields = document.getElementsByClassName('range__input')
    const searchParams = new URLSearchParams()

    // Значение с select
    if (filterSelect.value !== 'all') {
        // Добавляем параметры в строку запроса
        searchParams.append(filterSelect.name, filterSelect.value)
    }

    // Параметры кол-ва комнат - чекбоксы
    const roomsValues = []
    Array.from(filterRooms).forEach(checkbox => {
        if (checkbox.value !== '' && checkbox.checked) {
            roomsValues.push(checkbox.value)
        }
    })
    // Превращаем массив в строку
    const roomsValuesString = roomsValues.join(',')
    if (roomsValuesString !== '') {
        searchParams.append('rooms', roomsValuesString)
    }

    // Значения площадь и цена
    Array.from(filterFields).forEach(input => {
        if (input.value !== '') {
            searchParams.append(input.name, input.value)
        }
    })

    const queryString = searchParams.toString()
    
    return queryString ? '?' + queryString : ''
}
