import * as utils from '../utils'

export default class Pong {

    constructor(nonce) {
        if (utils.isNonce(nonce)) {
            this.nonce = nonce;
        } else {
            throw new Error('Pong: No Nonce given');
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
        return new Pong(buffer);
    }

    static fromObject(payload) {
        return new Pong(payload.nonce);
    }
}