import * as utils from '../utils'

export default class Filterload {

    constructor(options) {
        this.filter = options.filter;
        this.nHashFuncs = options.nHashFuncs;
        this.nTweak = options.nTweak;
        this.nFlags = options.nFlags;
    }

    toObject() {
        return {
            filter : this.filter ,
            nHashFuncs : this.nHashFuncs ,
            nTweak : this.nTweak ,
            nFlags : this.nFlags
        };
    }

    toBuffer() {
        let filterLengthBuffer = utils.writeVarint(this.filter.length);
        let filterBuffer = new Buffer(this.filter.length);
        for (let i = 0; i < this.filter.length; i++) {
            filterBuffer[i] = parseInt(this.filter[i]);
        }

        let bufferLength = filterLengthBuffer.length + filterBuffer.length + 9;

        let tailBuffer = new Buffer(9);
        tailBuffer.writeUInt32LE(this.nHashFuncs,0);
        tailBuffer.writeUInt32LE(this.nTweak,4);
        tailBuffer.writeUInt8(this.nFlags,8);

        return Buffer.concat([filterLengthBuffer,filterBuffer,tailBuffer],bufferLength);
    }

    static fromBuffer(buffer) {
        let filterLength = utils.readVarint(buffer);
        let position = utils.varintLength(buffer);
        let payload = {filter:[]};

        if (buffer.length === (filterLength+position+9)) {
            for (let i = 0; i < filterLength;i++) {
                payload.filter.push(buffer.readUInt8(position));
                position++;
            }

            payload.nHashFuncs = buffer.readUInt32LE(position);
            position += 4;

            payload.nTweak = buffer.readUInt32LE(position);
            position += 4;

            payload.nFlags = buffer.readUInt8(position);
        }

        return new Filterload(payload);
    }

    static fromObject(payload) {
        let options = {
            filter : payload.filter || [] ,
            nHashFuncs : payload.nHashFuncs || 0 ,
            nTweak : payload.nTweak || 0 ,
            nFlags : payload.nFlags || 0
        };

        return new Filterload(options);
    }
}