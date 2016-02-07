import * as utils from '../utils'

export default class Headers {

    constructor(input) {
        if (typeof this.build === 'function' && Array.isArray(input)) {
            for (let i = 0; i < input.length; i++) {
                input[i] = this.build(input[i]);
            }
        }

        this.headers = input;
    }

    toObject() {
        return {
            count   : this.headers.length ,
            headers : this.headers
        };
    }

    toBuffer() {
        if (!Array.isArray(this.headers)) {
            return new Buffer(0);
        }

        let buffers = [];
        let totalLength = 0;
        buffers.push(utils.writeVarint(this.headers.length)); // count
        totalLength += buffers[0].length;

        for (let i = 0; i < this.headers.length; i++) {
            if (typeof this.serialize === 'function' && !Buffer.isBuffer(this.headers[i])) {
                buffers.push(this.serialize(this.headers[i]));
            }
            buffers.push(this.headers[i]);
            totalLength += buffers[buffers.length-1].length;
        }

        return Buffer.concat(buffers,totalLength);
    }

    static fromBuffer(buffer) {
        let count = utils.readVarint(buffer);
        let startHeaders = utils.varintSize(buffer);
        let headers = [];

        for (let i = 0; i < count; i++) {
            headers.push(buffer.slice(startHeaders,startHeaders+utils.BLOCK_HEADER_LENGTH));
            startHeaders += utils.BLOCK_HEADER_LENGTH;
        }

        return new Headers(headers);
    }

    static fromObject(message) {
        return new Headers(message.headers);
    }
}