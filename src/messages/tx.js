import * as utils from '../utils'

export default class Tx {

    constructor(input) {
        if (typeof this.build === 'function' && Buffer.isBuffer(input)) {
            this.tx = this.build(input);
        } else {
            this.tx = input;
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

    static fromObject(message) {
        return new Tx(message.tx);
    }
}