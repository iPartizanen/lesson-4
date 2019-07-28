const Ui = require('./ui');
const Decryptor = require('./decryptor');
const Logger = require('./logger');
const AccountManager = require('./accountManager');
const Db = require('./db');

const customers = [
    {
        payload: {
            name: 'Pitter Black',
            email: '70626c61636b40656d61696c2e636f6d',
            password: '70626c61636b5f313233',
        },
        meta: {
            algorithm: 'hex',
        },
    },
];

const ui = new Ui(customers, {
    objectMode: true,
    decodeStrings: false,
});

const decryptor = new Decryptor({
    readableObjectMode: true,
    writableObjectMode: true,
});

const logger = new Logger(new Db(), {
    readableObjectMode: true,
    writableObjectMode: true,
});

const manager = new AccountManager({
    objectMode: true,
    decodeStrings: false,
});

ui.pipe(decryptor)
    .pipe(logger)
    .pipe(manager);

// {"payload":{"name":"Pitter Black","email":"pblack@email.com","password":"pblack_123"},"created":"2019-07-28T12:01:29.360Z"}
setTimeout(() => logger.print(), 500);
