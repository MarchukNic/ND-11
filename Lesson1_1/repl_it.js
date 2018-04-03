/**
 * Когда результат одного промиса - массив 
 * и нам что-то нужно асинхронно на промисах сделать с его элементами 
 * используем Array.map результатом которого будет массив промисов
 * 
 */

// возвращает промис, который разрешается массивом значений
function readData() {
    return new Promise((done, reject) => {
        done([1, 2, 3, 4]);
    })
}

// возвращает промис, который разрешается текстом для 
function getText(itemId) {
    items = ['Netologiya', 'Mongo', 'Express', 'Angular', 'Nodejs']
    return new Promise((resolve, reject) => {
        //  проверяем наличие элемента
        if (itemId < items.length) {
            // возвращаем значение
            resolve(items[itemId]);
        } else {
            // понятная ошибка
            reject(new Error('Index is outside the bounds of the array'));
        }
    })
}

readData()
    .then(itemIds => Promise.all(
        /**
         * получаем массив промисов:
         * map превращает один массив в другой
         * каждому элементу соспоставлено новое значение которое вернулось в map для старого
         */
        itemIds.map(
            // itemId - элемент массива itemIds
            itemId => {

                // для каждого itemId вовзращаем результат всей цепочки промисов
                return getText(itemId)
                    .then(text => {
                        return { text, itemId }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        )
    ))
    /**
     * Promise.all разрешится когда все Promise нового массива (полученного из map) разрешатся
     * Результатом будет массив объектов вида {text, itemId}
     */
    .then(items => {
        /**
         * результат синхронных логических вычислений или приведения данных к единому виду можно вернуть не оборачивая в Promise.
        */
        return items.map(item => {
            return item ? { id: item.itemId, text: item.text } : null
        })
    })
    .then(items => console.log(items))
    .catch(err => console.error(err))