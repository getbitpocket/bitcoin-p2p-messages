import * as utils from '../utils'

export default class Reject {

    constructor(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
                // console.log(key + " " + options[key]);
            }
        }
    }

    toObject() {
        return {
            message : this.message ,
            ccode   : this.ccode ,
            reason  : this.reason ,
            data    : this.data
        };
    }

    toBuffer() {
        let buffers = [];
        let totalLength = 0;

        buffers[0] = utils.writeVarstring(this.message,'utf-8');
        totalLength += buffers[0].length;

        buffers[1] = new Buffer(1);
        buffers[1][0] = this.ccode;
        totalLength += buffers[1].length;

        buffers[2] = utils.writeVarstring(this.reason,'utf-8');
        totalLength += buffers[2].length;

        buffers[3] = this.data;
        totalLength += buffers[3].length;

        return Buffer.concat(buffers,totalLength);
    }

    static fromBuffer(buffer) {
        let message = utils.readVarstring(buffer,'utf-8');
        let position = utils.varstringLength(buffer);

        let ccode   = buffer.readUInt8(position);
        position += 1;

        let reason  = utils.readVarstring(buffer.slice(position),'utf-8');
        position += utils.varstringLength(buffer.slice(position));

        let data    = buffer.slice(position);

        return new Reject({
            message : message ,
            ccode   : ccode ,
            reason  : reason ,
            data    : data
        });
    }

    static fromObject(payload) {
        let input = {};
        input.message = (typeof payload.message === 'string') ? new Buffer(payload.message,'utf-8') : new Buffer(0);
        input.ccode   = parseInt(payload.ccode);
        input.reason  = (typeof payload.reason === 'string') ? new Buffer(payload.reason,'utf-8') : new Buffer(0);
        input.data    = Buffer.isBuffer(payload.data) ? payload.data : new Buffer(0);

        return new Reject(input);
    }
}