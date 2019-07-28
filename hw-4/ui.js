const { Readable } = require('stream');
const { validateChunk } = require('./chunk');

class Ui extends Readable {
    constructor(data = [], options = {}) {
        super(options);
        this._data = data;

        this.on('error', ({ message }) => {
            console.log(message);
            process.exit(1);
        });
    }

    _read() {
        let data = this._data.shift();
        if (!data) {
            this.push(null);
        } else {
            try {
                validateChunk(data);
            } catch ({ message }) {
                this.emit('error', new Error(message));
            }
            this.push(data);
        }
    }
}

module.exports = Ui;
