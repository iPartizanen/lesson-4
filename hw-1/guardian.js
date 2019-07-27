const { Transform } = require('stream');
const { validateChunk } = require('./chunk');

class Guardian extends Transform {
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
                email: Buffer.from(email).toString('hex'),
                password: Buffer.from(password).toString('hex'),
            },
        });
        done();
    }
}

module.exports = Guardian;
