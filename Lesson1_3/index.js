
const ChatApp = require('./chatApp');

let webinarChat = new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat = new ChatApp('---------vk');

let chatOnMessage = (message) => {
    console.log(message);
};

// Часть 1.1 Начало. Добавляем обработчик события
let chatOnMessageReady = () => {
    console.log('Готовлюсь к ответу');
};

// Добавляем обработчик для webinarChat
webinarChat.on('message', chatOnMessage, chatOnMessageReady);
// Часть 1.1 Конец

facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

// Часть 1.2 Устанавливаем максимальное количество обработчиков 2
vkChat.setMaxListeners(2);

// Часть 1.3 Добавляем обработчик vkChat
vkChat.on('message', chatOnMessageReady);

// Часть 2.2 добавить обработчик
vkChat.on('close', chatOnMessage);

// Закрыть вконтакте
setTimeout(() => {
    console.log('Закрываю вконтакте...');

    // Часть 2.3 Вызывать метод
    vkChat.close();

    vkChat.removeListener('message', chatOnMessage);
}, 10000);


// Закрыть фейсбук
setTimeout(() => {
    console.log('Закрываю фейсбук, все внимание — вебинару!');
    facebookChat.removeListener('message', chatOnMessage);
}, 15000);


// Доп задавние 1
setTimeout(() => {
    console.log('Закрываю Вебинар');
    webinarChat.removeListener('message', chatOnMessage, chatOnMessageReady);
}, 30000);