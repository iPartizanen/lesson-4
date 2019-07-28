const EventEmitter = require('events');
const { validateChunk } = require('./chunk');

class Db extends EventEmitter {
    constructor() {
        super();
        this.logs = [];

        this.on('log', chunk => {
            this._log(chunk);
        });

        this.on('print', () => {
            this._print();
        });

        this.on('error', ({ name, message }) => {
            console.log(`${name} occured: ${message}`);
            process.exit(1);
        });
    }

    _log(chunk) {
        try {
            validateChunk(chunk);
        } catch ({ message }) {
            this.emit('error', new Error(message));
        }

        const { meta, payload } = chunk;

        this.logs.push({
            source: meta.source,
            payload,
            created: new Date(),
        });
    }

    _print() {
        this.logs.forEach(data => {
            console.log(JSON.stringify(data));
        });
    }
}

module.exports = Db;
