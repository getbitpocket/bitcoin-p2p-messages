'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Version = function () {
    function Version(options) {
        _classCallCheck(this, Version);

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }

    _createClass(Version, [{
        key: 'toObject',
        value: function toObject() {
            return {
                version: this.version,
                services: this.services,
                timestamp: this.timestamp,
                receiveAddress: this.receiveAddress,
                fromAddress: this.fromAddress,
                nonce: this.nonce,
                userAgent: this.userAgent,
                startHeight: this.startHeight,
                relay: this.relay
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            var versionBuffer = new Buffer(4);
            var recvAddrBuffer = utils.writeNetworkAddress(this.receiveAddress);
            var fromAddrBuffer = utils.writeNetworkAddress(this.fromAddress);
            var userAgentBuffer = utils.writeVarstring(this.userAgent);

            versionBuffer.writeUInt32LE(this.version, 0);
            // this.services.toArrayLike(Buffer,'le',8);
            // buffer.write(this.services.toString('hex'),4,8,'hex');

            var timestampBuffer = new Buffer(8);
            timestampBuffer.writeUInt32LE(Math.round(this.timestamp.getTime() / 1000));

            var finalBuffer = Buffer.concat([versionBuffer, this.services.toArrayLike(Buffer, 'le', 8), timestampBuffer, recvAddrBuffer, fromAddrBuffer, this.nonce.toArrayLike(Buffer, 'le', 8), userAgentBuffer], 85 + userAgentBuffer.length);
            finalBuffer.writeUInt32LE(this.startHeight, 80 + userAgentBuffer.length);
            finalBuffer.writeUInt8(this.relay, 84 + userAgentBuffer.length);

            return finalBuffer;
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var version = buffer.readUInt32LE(0);
            var services = utils.readUInt64LE(buffer.slice(4, 12));
            var timestamp = utils.read64BitTimestamp(buffer.slice(12, 20));
            var receiveAddress = utils.readNetworkAddress(buffer.slice(20, 46));
            var fromAddress = utils.readNetworkAddress(buffer.slice(46, 72));
            var nonce = utils.readUInt64LE(buffer.slice(72, 80));
            var userAgent = utils.readVarstring(buffer.slice(80));
            var userAgentLength = utils.varstringLength(buffer.slice(80));
            var startHeight = buffer.readUInt32LE(80 + userAgentLength);
            var relay = true;
            if (buffer.length > 80 + userAgentLength + 4) {
                relay = !!buffer.readInt8(80 + userAgentLength + 4);
            }

            return new Version({
                version: version,
                services: services,
                timestamp: timestamp,
                receiveAddress: receiveAddress,
                fromAddress: fromAddress,
                nonce: nonce,
                userAgent: userAgent,
                startHeight: startHeight,
                relay: relay
            });
        }
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            var options = {
                version: payload.version || utils.PROTOCOL_VERSION,
                services: payload.services || utils.PROTOCOL_NODE_NETWORK,
                nonce: payload.nonce || utils.generateRandomBuffer(),
                timestamp: payload.timestamp || new Date(),
                receiveAddress: utils.checkNetworkAddressInput(payload.receiveAddress),
                fromAddress: utils.checkNetworkAddressInput(payload.fromAddress),
                userAgent: payload.userAgent || utils.PROTOCOL_USER_AGENT,
                startHeight: payload.startHeight || 0,
                relay: payload.relay === false ? false : true
            };

            return new Version(options);
        }
    }]);

    return Version;
}();

exports.default = Version;