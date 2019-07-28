const { validateCustomer } = require('./customer');

const chunkAttributes = ['meta', 'payload'];

const validateChunk = data => {
    const { meta, payload } = data;

    if (typeof meta !== 'object' || !meta) {
        throw new TypeError('Meta property must be non-empty object!');
    }

    if (typeof payload !== 'object' || !payload) {
        throw new TypeError('Payload property must be non-empty object!');
    }

    for (key in data) {
        if (!chunkAttributes.includes(key)) {
            throw new Error(`Chunk contains non-allowed property '${key}'!`);
        }
    }

    const { algorithm } = meta;

    if (
        typeof algorithm !== 'string' ||
        (algorithm !== 'hex' && algorithm !== 'base64')
    ) {
        throw new TypeError('Meta.algorithm must be string "hex" or "base64"!');
    }

    for (key in meta) {
        if (key !== 'algorithm') {
            throw new Error(`Meta contains non-allowed property '${key}'!`);
        }
    }

    validateCustomer(payload);

    return 0;
};

module.exports = { validateChunk };
