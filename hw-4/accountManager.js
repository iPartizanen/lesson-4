const { Writable } = require('stream');
const { validateChunk } = require('./chunk');

class AccountManager extends Writable {
    constructor(options = {}) {
        super(options);
        this._data = [];

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
        console.log('Payload received by AccountManager: ', chunk.payload);
        this._data.push(chunk);
        done();
    }
}

module.exports = AccountManager;
