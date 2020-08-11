// Рендер контейнера для заявок
function renderContainer(){
    
    const markupContainer = `<div class="container p-0 mb-5">
                                <div class="heading-1">Заявки</div>
                            </div>
                            
                            <div class="panels-wrapper">
                                <div id="bidsHolder" class="container p-0">
                                    
                                </div>
                            </div>`

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markupContainer)
}

// Рендер заявок
function renderBid(bid){
    const markupBid = `<div class="panel panel--no-hover">
                            <div class="panel__bidid">${bid.id}</div>
                            <div class="panel__bidname">${bid.name}</div>
                            <div class="panel__bidphone">${bid.phone}</div>
                        </div>`

    document.querySelector('#bidsHolder').insertAdjacentHTML('beforeend', markupBid)
}

// 
export function render(bids){
    renderContainer()
    bids.forEach(item => {
        renderBid(item)
    })
}
