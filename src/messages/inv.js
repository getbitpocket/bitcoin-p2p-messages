import * as utils from '../utils'

export default class Inv {

    constructor(invs) {
        this.invs = utils.checkArrayInput(invs);
    }

    toObject() {
        return {
            count : this.invs.length ,
            inventory  : this.invs
        };
    }

    toBuffer() {
        if (!Array.isArray(this.invs)) {
            return new Buffer(0);
        }

        let buffers = [];
        let totalLength = 0;
        buffers.push(utils.writeVarint(this.invs.length)); // count
        totalLength += buffers[0].length;

        for (let i = 0; i < this.invs.length; i++) {
            buffers.push(utils.serializeInv(this.invs[i]));
            totalLength += buffers[buffers.length-1].length;
        }

        return Buffer.concat(buffers,totalLength);
    }

    static fromBuffer(buffer) {
        let count = utils.readVarint(buffer);
        let startInvs = utils.varintSize(buffer);

        let invs = [];
        for (let i = 0; i < count; i++) {
            invs.push({
                type : buffer.readUInt32LE(startInvs) ,
                hash : buffer.slice(startInvs+4,startInvs+36)
            });
            startInvs += 36;
        }

        return new Inv(invs);
    }

    static fromObject(payload) {
        return new Inv(payload.inventory);
    }
}