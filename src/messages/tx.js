import * as utils from '../utils'

export default class Tx {

    constructor(input) {
        if (typeof this.build === 'function' && Buffer.isBuffer(input)) {
            this.tx = this.build(input);
        } else if (Buffer.isBuffer(input)) {
            this.tx = input;
        } else {
            throw new Error('Incorrect Transaction Data');
        }
    }

    toObject() {
        return {
            tx : this.tx
        };
    }

    toBuffer() {
        if (typeof this.serialize === 'function' && !Buffer.isBuffer(this.tx)) {
            return this.serialize(this.tx);
        }
        return this.tx;
    }

    static fromBuffer(buffer) {
        return new Tx(buffer);
    }

    static fromObject(payload) {
        return new Tx(payload.tx);
    }
}