'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Getblocks = function () {
    function Getblocks(payload) {
        _classCallCheck(this, Getblocks);

        this.version = payload.version || utils.PROTOCOL_VERSION;
        this.hashes = utils.checkArrayInput(payload.hashes);
        this.hashStop = utils.checkBufferInput(payload.hashStop, new Buffer(0));
    }

    _createClass(Getblocks, [{
        key: 'toObject',
        value: function toObject() {
            return {
                version: this.version,
                hashCount: this.hashes.length,
                hashes: this.hashes,
                hashStop: this.hashStop
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            var totalLength = 4,
                buffers = [];
            buffers[0] = new Buffer(4);
            buffers[0].writeInt32LE(this.version);

            buffers[1] = utils.writeVarint(this.hashes.length);
            totalLength += buffers[1].length;

            for (var i = 0; i < this.hashes.length; i++) {
                buffers.push(utils.checkBufferInput(this.hashes[i]));
                totalLength += buffers[buffers.length - 1].length;
            }

            buffers.push(this.hashStop);
            totalLength += this.hashStop.length;

            return Buffer.concat(buffers, totalLength);
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var version = buffer.readUInt32LE(0);
            var hashCount = utils.readVarint(buffer, 4);
            var hashStart = utils.varintSize(buffer, 4) + 4;

            var hashes = [];
            for (var i = 0; i < hashCount; i++) {
                hashes.push(buffer.slice(hashStart, hashStart + 32));
                hashStart += 32;
            }

            var hashStop = buffer.slice(hashStart);
            return new Getblocks({
                version: version,
                hashes: hashes,
                hashStop: hashStop
            });
        }
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            return new Getblocks(payload);
        }
    }]);

    return Getblocks;
}();

exports.default = Getblocks;