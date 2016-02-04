import * as utils from './utils'
import messages from './messages'

export default class Message {

    constructor(input) {
        if (Buffer.isBuffer(input)) {
            this.buffer = input;
            this.buildHeader(this.buffer.slice(0,utils.PROTOCOL_HEADER_LENGTH));
            this.buildPayload(this.buffer.slice(utils.PROTOCOL_HEADER_LENGTH));
        } else if (typeof input === 'object') {
            let payloadBuffer = this.serializePayload(input);
            let headerBuffer  = this.serializeHeader(input,payloadBuffer);
            this.buffer = Buffer.concat([headerBuffer,payloadBuffer],utils.PROTOCOL_HEADER_LENGTH+this.length);
        } else {
            throw new Exception('Wrong constructor argument: type Buffer is expected.');
        }
    }

    serializePayload(input) {
        let messageBuffer = messages[input.command].fromObject(input.payload).toBuffer();

        this.payload  = input.payload;
        this.length   = messageBuffer.length;
        this.checksum = utils.sha256x2(messageBuffer).readUInt32LE(0);
        return messageBuffer;
    }

    serializeHeader(input) {
        let headerBuffer = new Buffer(utils.PROTOCOL_HEADER_LENGTH);

        this.network  = input.network || 'mainnet';
        this.magic    = utils.Network[this.network];
        this.command  = input.command;

        headerBuffer.writeUInt32LE(this.magic,0);
        headerBuffer.write(this.command,4,16);
        headerBuffer.writeUInt32LE(this.length,16);
        headerBuffer.writeUInt32LE(this.checksum,20);
        return headerBuffer;
    }

    buildHeader(buffer) {
        this.magic    = buffer.readUInt32LE(0);
        this.network  = utils.getNetwork(this.magic);
        this.command  = buffer.slice(4,16).toString('ascii').replace(/\0+$/, '');
        this.length   = buffer.readUInt32LE(16);
        this.checksum = buffer.readUInt32LE(20);

        if (this.buffer.length !== (this.length + utils.PROTOCOL_HEADER_LENGTH)) {
            throw new Error('Incorrect payload length');
        }
    }

    buildPayload(buffer) {
        if (utils.sha256x2(buffer).readUInt32LE(0) !== this.checksum) {
            throw new Error('Incorrect checksum');
        }

        this.payload =  messages[this.command].fromBuffer(buffer).toObject();
    }

    toBuffer() {
        return this.buffer;
    }

    toString() {
        return this.toBuffer().toString('hex');
    }

    toObject() {
        return {
            network : this.network ,
            command : this.command ,
            payload : this.payload
        };
    }

    static fromBuffer(buffer) {
        return new Message(buffer);
    }

    static fromString(string,encoding='hex') {
        return new Message(new Buffer(string,encoding));
    }

    static fromObject(message) {
        return new Message(message);
    }

    static setMessageBuilder(command,builder) {
        messages[command].prototype.build = builder;
    }

    static setMessageSerializer(command,serializer) {
        messages[command].prototype.serialize = serializer;
    }



}