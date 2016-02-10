import * as utils from '../utils'

export default class Version {

    constructor(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }

    toObject() {
        return {
            version : this.version ,
            services : this.services ,
            timestamp : this.timestamp ,
            receiveAddress : this.receiveAddress ,
            fromAddress : this.fromAddress ,
            nonce : this.nonce ,
            userAgent : this.userAgent ,
            startHeight : this.startHeight ,
            relay : this.relay
        };
    }

    toBuffer() {
        let versionBuffer = new Buffer(4);
        let recvAddrBuffer = utils.writeNetworkAddress(this.receiveAddress);
        let fromAddrBuffer = utils.writeNetworkAddress(this.fromAddress);
        let userAgentBuffer = utils.writeVarstring(this.userAgent);

        versionBuffer.writeUInt32LE(this.version,0);
        // this.services.toArrayLike(Buffer,'le',8);
        // buffer.write(this.services.toString('hex'),4,8,'hex');

        let timestampBuffer = new Buffer(8);
        timestampBuffer.writeUInt32LE(Math.round(this.timestamp.getTime() / 1000));

        let finalBuffer = Buffer.concat([versionBuffer,this.services.toArrayLike(Buffer,'le',8),timestampBuffer,recvAddrBuffer,fromAddrBuffer,this.nonce.toArrayLike(Buffer,'le',8),userAgentBuffer],85+userAgentBuffer.length);
        finalBuffer.writeUInt32LE(this.startHeight,80+userAgentBuffer.length);
        finalBuffer.writeUInt8(this.relay,84+userAgentBuffer.length);

        return finalBuffer;
    }

    static fromBuffer(buffer) {
        let version   = buffer.readUInt32LE(0);
        let services  = utils.readUInt64LE(buffer.slice(4,12));
        let timestamp = utils.read64BitTimestamp(buffer.slice(12,20));
        let receiveAddress = utils.readNetworkAddress(buffer.slice(20,46));
        let fromAddress = utils.readNetworkAddress(buffer.slice(46,72));
        let nonce = utils.readUInt64LE(buffer.slice(72,80));
        let userAgent = utils.readVarstring(buffer.slice(80));
        let userAgentLength = utils.varstringLength(buffer.slice(80));
        let startHeight = buffer.readUInt32LE(80+userAgentLength);
        let relay = true;
        if (buffer.length > 80+userAgentLength+4) {
            relay = !!buffer.readInt8(80+userAgentLength+4)
        }

        return new Version({
            version : version ,
            services : services ,
            timestamp : timestamp ,
            receiveAddress : receiveAddress ,
            fromAddress : fromAddress ,
            nonce : nonce ,
            userAgent : userAgent ,
            startHeight : startHeight ,
            relay : relay
        });
    }

    static fromObject(payload) {
        let options = {
            version        : payload.version || utils.PROTOCOL_VERSION ,
            services       : payload.services || utils.PROTOCOL_NODE_NETWORK ,
            nonce          : payload.nonce || utils.generateRandomBuffer() ,
            timestamp      : payload.timestamp || new Date() ,
            receiveAddress : utils.checkNetworkAddressInput(payload.receiveAddress) ,
            fromAddress    : utils.checkNetworkAddressInput(payload.fromAddress) ,
            userAgent      : payload.userAgent   || utils.PROTOCOL_USER_AGENT ,
            startHeight    : payload.startHeight || 0 ,
            relay          : payload.relay === false ? false : true
        };

        return new Version(options);
    }
}