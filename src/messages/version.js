import BigInteger from 'bigi'
import * as utils from '../utils'

export default class Version {

    constructor(options) {

    }

    toObject() {
        return {
            nonce : this.nonce
        };
    }

    toBuffer() {
        // return new Buffer(this.nonce.toHex(),'hex');
    }

    static fromBuffer(buffer) {
        return new Version(buffer);
    }

    static fromObject(payload) {

        let options = {
            version     : payload.version     || utils.PROTOCOL_VERSION ,
            services    : payload.services    || utils.PROTOCOL_NODE_NETWORK ,
            nonce       : payload.nonce       || utils.generateNonce() ,
            timestamp   : payload.timestamp   || new Date() ,
            userAgent   : payload.userAgent   || utils.PROTOCOL_USER_AGENT ,
            startHeight : payload.startHeight || 0 ,
            relay       : payload.relay !== false ? true : false
        };

        return new Version(options);
    }
}