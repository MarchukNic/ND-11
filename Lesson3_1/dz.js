const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/test';



mongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Невозможно подключится, ошибка:', err);
    }
    else {
        console.log('Соединение установлено для ', url);
    }

    var collection = db.db('test').collection('users');

    var user1 = { name: 'Аня', gender: 'ж' };
    var user2 = { name: 'Вася', gender: 'м' };
    var user3 = { name: 'Петя', gender: 'м' };
    var user4 = { name: 'Коля', gender: 'м' };
    var user5 = { name: 'Александра', gender: 'ж' };

    // Добавлять список имён в коллекцию
    collection.insert([user1,user2,user3,user4,user5], function(err, result){
        if (err) {
            console.log('Ошибка вставки данных: ', err);
        } else {
             console.log('Вставлено ' , result.insertedCount, ' записей');
        }
        //db.close();
    });

    // collection.find({ gender: 'м' }).toArray(function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     } else if (result.length) {
    //         console.log('Найденный: ', result);
    //     } else {
    //         console.log('Нет документов с данными условиями поиска.')
    //     }
    // });

    //Выводить этот список;
    collection.find().toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log('Найденный: ', result);
        } else {
            console.log('Нет документов с данными условиями поиска.')
        }
    });

    //Изменять несколько имён на другие;
    collection.update({ name: 'Вася' }, { '$set': { name: 'Василий' } }, { multi: true })

    //Отображать изменённый список;
    collection.find().toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log('Найденный: ', result);
        } else {
            console.log('Нет документов с данными условиями поиска.')
        }
    });

    //Удалять новые имена из п.3.
    collection.deleteMany({ name: "Василий" }, function (err, result) {
        console.log(result);
        db.close();
    });

    //Отображать изменённый список;
    collection.find().toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log('Найденный: ', result);
        } else {
            console.log('Нет документов с данными условиями поиска.')
        }
    });

    collection.remove();
    db.close();
});