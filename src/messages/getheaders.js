import * as utils from '../utils'

export default class Getheaders {

    constructor(payload) {
        this.version   = payload.version || utils.PROTOCOL_VERSION;
        this.hashes    = utils.checkArrayInput(payload.hashes);
        this.hashStop  = utils.checkBufferInput(payload.hashStop,new Buffer(0));
    }

    toObject() {
        return {
            version   : this.version ,
            hashCount : this.hashes.length ,
            hashes    : this.hashes ,
            hashStop  : this.hashStop
        };
    }

    toBuffer() {
        let totalLength = 4, buffers = [];
        buffers[0] = new Buffer(4);
        buffers[0].writeInt32LE(this.version);

        buffers[1] = utils.writeVarint(this.hashes.length);
        totalLength += buffers[1].length;

        for (let i = 0; i < this.hashes.length; i++) {
            buffers.push(utils.checkBufferInput(this.hashes[i]));
            totalLength += buffers[buffers.length-1].length;
        }

        buffers.push(this.hashStop);
        totalLength += this.hashStop.length;

        return Buffer.concat(buffers,totalLength);
    }

    static fromBuffer(buffer) {
        let version = buffer.readUInt32LE(0);
        let hashCount = utils.readVarint(buffer,4);
        let hashStart = utils.varintSize(buffer,4) + 4;

        let hashes = [];
        for (let i = 0; i < hashCount; i++) {
            hashes.push(buffer.slice(hashStart,hashStart+32));
            hashStart += 32;
        }

        let hashStop = buffer.slice(hashStart);
        return new Getheaders({
            version   : version ,
            hashes    : hashes ,
            hashStop  : hashStop
        });
    }

    static fromObject(payload) {
        return new Getheaders(payload);
    }
}