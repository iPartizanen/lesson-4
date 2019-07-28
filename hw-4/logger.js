const { Transform } = require('stream');
const { validateChunk } = require('./chunk');

class Logger extends Transform {
    constructor(db, options = {}) {
        super(options);
        this._db = db;

        this.on('error', ({ message }) => {
            console.log(message);
            process.exit(1);
        });
    }

    print() {
        this._db.emit('print');
    }

    _transform(chunk, encoding, done) {
        try {
            validateChunk(chunk);
        } catch ({ message }) {
            this.emit('error', new Error(message));
        }

        this._db.emit('log', chunk);

        this.push(chunk);
        done();
    }
}

module.exports = Logger;
