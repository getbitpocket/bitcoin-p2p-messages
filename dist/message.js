'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
    function Message(input) {
        _classCallCheck(this, Message);

        if (Buffer.isBuffer(input)) {
            this.buffer = input;
            this.buildHeader(this.buffer.slice(0, utils.PROTOCOL_HEADER_LENGTH));
            this.buildPayload(this.buffer.slice(utils.PROTOCOL_HEADER_LENGTH));
        } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
            var payloadBuffer = this.serializePayload(input);
            var headerBuffer = this.serializeHeader(input, payloadBuffer);
            this.buffer = Buffer.concat([headerBuffer, payloadBuffer], utils.PROTOCOL_HEADER_LENGTH + this.length);
        } else {
            throw new Exception('Wrong constructor argument: type Buffer is expected.');
        }
    }

    _createClass(Message, [{
        key: 'serializePayload',
        value: function serializePayload(input) {
            var messageBuffer = _messages2.default[input.command].fromObject(input.payload).toBuffer();

            this.payload = input.payload;
            this.length = messageBuffer.length;
            this.checksum = utils.sha256x2(messageBuffer).readUInt32LE(0);
            return messageBuffer;
        }
    }, {
        key: 'serializeHeader',
        value: function serializeHeader(input) {
            var headerBuffer = new Buffer(utils.PROTOCOL_HEADER_LENGTH);

            this.network = input.network || 'mainnet';
            this.magic = utils.Network[this.network];
            this.command = input.command;

            headerBuffer.writeUInt32LE(this.magic, 0);
            headerBuffer.write(this.command, 4, 16);
            headerBuffer.writeUInt32LE(this.length, 16);
            headerBuffer.writeUInt32LE(this.checksum, 20);
            return headerBuffer;
        }
    }, {
        key: 'buildHeader',
        value: function buildHeader(buffer) {
            this.magic = buffer.readUInt32LE(0);
            this.network = utils.getNetwork(this.magic);
            this.command = buffer.slice(4, 16).toString('ascii').replace(/\0+$/, '');
            this.length = buffer.readUInt32LE(16);
            this.checksum = buffer.readUInt32LE(20);

            if (this.buffer.length !== this.length + utils.PROTOCOL_HEADER_LENGTH) {
                throw new Error('Incorrect payload length');
            }
        }
    }, {
        key: 'buildPayload',
        value: function buildPayload(buffer) {
            if (utils.sha256x2(buffer).readUInt32LE(0) !== this.checksum) {
                throw new Error('Incorrect checksum');
            }

            this.payload = _messages2.default[this.command].fromBuffer(buffer).toObject();
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            return this.buffer;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.toBuffer().toString('hex');
        }
    }, {
        key: 'toObject',
        value: function toObject() {
            return {
                network: this.network,
                command: this.command,
                payload: this.payload
            };
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            return new Message(buffer);
        }
    }, {
        key: 'fromString',
        value: function fromString(string) {
            var encoding = arguments.length <= 1 || arguments[1] === undefined ? 'hex' : arguments[1];

            return new Message(new Buffer(string, encoding));
        }
    }, {
        key: 'fromObject',
        value: function fromObject(message) {
            return new Message(message);
        }
    }, {
        key: 'setMessageBuilder',
        value: function setMessageBuilder(command, builder) {
            _messages2.default[command].prototype.build = builder;
        }
    }, {
        key: 'setMessageSerializer',
        value: function setMessageSerializer(command, serializer) {
            _messages2.default[command].prototype.serialize = serializer;
        }
    }]);

    return Message;
}();

exports.default = Message;