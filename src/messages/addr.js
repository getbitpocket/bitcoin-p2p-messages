import * as utils from '../utils'

export default class Addr {

    constructor(addrs) {
        this.addrs = addrs;
        // console.log(this.addrs);
    }

    toObject() {
        return {
            count : this.addrs.length ,
            addresses : this.addrs
        };
    }

    toBuffer() {
        if (!Array.isArray(this.addrs)) {
            return new Buffer(0);
        }

        let buffers = [];
        let totalLength = 0;
        buffers.push(utils.writeVarint(this.addrs.length)); // count
        totalLength += buffers[0].length;

        for (let i = 0; i < this.addrs.length; i++) {
            if (!this.addrs[i].timestamp) {
                // if no timestamp set date 5 days ago
                this.addrs[i].timestamp = new Date(new Date().setDate(new Date().getDate()-5))
            }

            buffers.push(utils.writeNetworkAddress(this.addrs[i]));
            totalLength += utils.PROTOCOL_ADDR_LENGTH;
        }

        return Buffer.concat(buffers,totalLength);
    }

    static fromBuffer(buffer) {
        let count = utils.readVarint(buffer);
        let startAddrs = utils.varintLength(buffer);

        let addrs = [];

        // check if addrs length is correct: version < 209 of bitcoin core sends addr without timestamp
        // otherwise don't accept addrs
        if ((buffer.length - startAddrs) / utils.PROTOCOL_ADDR_LENGTH === count) {
            for (let i = 0; i < count; i++) {
                addrs.push(utils.readNetworkAddress(buffer.slice(startAddrs,startAddrs+utils.PROTOCOL_ADDR_LENGTH)));
                startAddrs += utils.PROTOCOL_ADDR_LENGTH;
            }
        }

        return new Addr(addrs);
    }

    static fromObject(payload) {
        if (!Array.isArray(payload.addresses)) {
            payload.addresses = [];
        }

        return new Addr(payload.addresses);
    }
}