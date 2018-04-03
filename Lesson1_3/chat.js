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
  }
  // Часть 2.1 Добавляем метод close
  close() {
    this.emit('close', `Чат ${this.title} закрылся :(`);
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
webinarChat.on('message', chatOnMessage);
webinarChat.on('message', chatOnMessageReady);
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
  vkChat.removeListener('message', chatOnMessageReady);
}, 10000);


// Закрыть фейсбук
setTimeout(() => {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000);


// Доп задавние 1
setTimeout(() => {
  console.log('End');
  webinarChat.removeListener('message', chatOnMessage);
  webinarChat.removeListener('message', chatOnMessageReady);
}, 30000);