const { Writable } = require('stream');
const { validateChunk } = require('./chunk');

class AccountManager extends Writable {
    constructor(options = {}) {
        super(options);
        this._data = [];

        this.on('finish', () => {
            console.log('Data has received by Account Manager:');
            this._data.forEach(item => console.log(item));
        });

        this.on('error', ({ message }) => {
            console.log(message);
            process.exit(1);
        });
    }

    _write(chunk, encoding, done) {
        try {
            validateChunk(chunk);
        } catch ({ message }) {
            this.emit('error', new Error(message));
        }
        this._data.push(chunk);
        done();
    }
}

module.exports = AccountManager;
