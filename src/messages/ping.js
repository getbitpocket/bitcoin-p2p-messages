import * as utils from '../utils'

export default class Ping {

    constructor(nonce) {
        if (utils.isNonce(nonce)) {
            this.nonce = nonce;
        } else {
            throw new Error('Ping: No Nonce given');
        }
    }

    toObject() {
        return {
            nonce : this.nonce
        };
    }

    toBuffer() {
        return this.nonce;
    }

    static fromBuffer(buffer) {
        return new Ping(buffer);
    }

    static fromObject(body) {
        body.nonce = body.nonce || utils.generateNonce();
        return new Ping(body.nonce);
    }
}