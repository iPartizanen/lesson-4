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
