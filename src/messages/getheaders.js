import * as utils from '../utils'

export default class Getheaders {

    constructor(payload) {
        this.version   = payload.version || utils.PROTOCOL_VERSION;
        this.hashCount = payload.hashCount || 0;
        this.hashes    = payload.hashes || [];
        this.hashStop  = payload.hashStop || 0;
    }

    toObject() {
        return {
            version   : this.version ,
            hashCount : this.hashCount ,
            hashes    : this.hashes ,
            hashStop  : this.hashStop
        };
    }

    toBuffer() {
        return new Buffer();
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

        let hashStop = buffer.slice(hashStart,32);

        return new Getheaders({
            version   : version ,
            hashCount : hashCount ,
            hashes    : hashes ,
            hashStop  : hashStop
        });
    }

    static fromObject(payload) {
        return new Getheaders(payload);
    }
}