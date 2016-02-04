import * as utils from '../utils'

export default class Inv {

    constructor(invs) {
        this.invs  = invs || [];
        this.count = invs.length;
    }

    toObject() {
        return {
            count : this.count ,
            invs  : this.invs
        };
    }

    toBuffer() {
        return new Buffer();
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

    static fromObject() {
        return new Inv();
    }
}