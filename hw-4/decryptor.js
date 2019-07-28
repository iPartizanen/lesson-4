const { Transform } = require('stream');
const { validateChunk } = require('./chunk');

class Decryptor extends Transform {
    constructor(options = {}) {
        super(options);

        this.on('error', ({ message }) => {
            console.log(message);
            process.exit(1);
        });
    }

    _transform(chunk, encoding, done) {
        try {
            validateChunk(chunk);
        } catch ({ message }) {
            this.emit('error', new Error(message));
        }

        const { meta, payload } = chunk;
        const { name, email, password } = payload;

        this.push({
            meta,
            payload: {
                name,
                email: Buffer.from(email, meta.algorithm).toString(),
                password: Buffer.from(password, meta.algorithm).toString(),
            },
        });
        done();
    }
}

module.exports = Decryptor;
