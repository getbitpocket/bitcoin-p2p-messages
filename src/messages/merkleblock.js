import * as utils from '../utils'

export default class Merkleblock {

    constructor(input) {
        if (typeof this.build === 'function' && Buffer.isBuffer(input)) {
            this.merkleblock = this.build(input);
        } else if (Buffer.isBuffer(input)) {
            this.merkleblock = input;
        } else {
            throw new Error('Incorrect Merkleblock Data');
        }
    }

    toObject() {
        return {
            merkleblock : this.merkleblock
        };
    }

    toBuffer() {
        if (typeof this.serialize === 'function' && !Buffer.isBuffer(this.merkleblock)) {
            return this.serialize(this.merkleblock);
        }
        return this.merkleblock;
    }

    static fromBuffer(buffer) {
        return new Merkleblock(buffer);
    }

    static fromObject(payload) {
        return new Merkleblock(payload.merkleblock);
    }
}