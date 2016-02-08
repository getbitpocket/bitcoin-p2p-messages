import * as utils from '../utils'

export default class Block {

    constructor(input) {
        if (typeof this.build === 'function' && Buffer.isBuffer(input)) {
            this.block = this.build(input);
        } else if (Buffer.isBuffer(input)) {
            this.block = input;
        } else {
            throw new Error('Incorrect Block Data');
        }
    }

    toObject() {
        return {
            block : this.block
        };
    }

    toBuffer() {
        if (typeof this.serialize === 'function' && !Buffer.isBuffer(this.block)) {
            return this.serialize(this.block);
        }
        return this.block;
    }

    static fromBuffer(buffer) {
        return new Block(buffer);
    }

    static fromObject(payload) {
        payload.block = utils.checkBufferInput(payload.block);
        return new Block(payload.block);
    }
}