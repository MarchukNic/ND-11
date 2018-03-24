const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  
    // Часть 2.1 Добавляем метод close
    let close = this.close;
  }
}

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
webinarChat.on('message', chatOnMessageReady);
// Часть 1.1 Конец

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

// Часть 1.2 Устанавливаем максимальное количество обработчиков 2
vkChat.setMaxListeners(2);

// Часть 1.3 Добавляем обработчик vkChat
vkChat.on('message', chatOnMessageReady);


// Закрыть вконтакте
setTimeout(() => {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', chatOnMessage);
  
  // Часть 2.2 
  vkChat.on('close',chatOnMessage('Чат вконтакте закрылся :('));

  // Часть 2.3
  vkChat.close();
}, 10000);


// Закрыть фейсбук
setTimeout(() => {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000);