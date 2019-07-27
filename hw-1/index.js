const Ui = require('./ui');
const Guardian = require('./guardian');
const AccountManager = require('./accountManager');

const customers = [
    {
        name: 'Pitter Black',
        email: 'pblack@email.com',
        password: 'pblack_123',
    },
    {
        name: 'Oliver White',
        email: 'owhite@email.com',
        password: 'owhite_456',
    },
];

const ui = new Ui(customers, {
    objectMode: true,
    decodeStrings: false,
});

const guardian = new Guardian({
    readableObjectMode: true,
    writableObjectMode: true,
});

const manager = new AccountManager({
    objectMode: true,
    decodeStrings: false,
});

ui.pipe(guardian).pipe(manager);

// 1. Реализовать класс Ui который будет имплементировать Readable интерфейс и будет
// служить поставщиком данных.
// 2. Реализовать класс Guardian который будет имплементировать Transform интерфейс
// и будет служить для шифрования данных. Для шифрования пароля будем
// использовать преобразование строки в hex формат. Зашировать необходимо email
// и password.
// 1. Реализовать класс AccountManager который будет имплементировать Writable
// интерфейс и будет служить в качестве хранилища данных.

// Обратите внимание!
// 1. Все поля в объекте пользователя являются обязательными. Генерировать ошибку в
// случае если условие не соблюдено.
// 2. Все поля в объекте пользователя должны быть строками. Генерировать ошибку в
// случае если условие не соблюдено.
// 3. Объект пользователя не должен содержать дополнительных полей. Генерировать
// ошибку в случае если условие не соблюдено.

const aa = {
    name: 'Pitter Black',
    email: 'pblack@email.com',
    password: 'pblack_123',
};

const bb = {
    meta: {
        source: 'ui',
    },
    payload: {
        name: 'Pitter Black',
        email: '70626c61636b40656d61696c2e636f6d',
        password: '70626c61636b5f313233',
    },
};
