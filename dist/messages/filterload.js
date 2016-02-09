'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filterload = function () {
    function Filterload(options) {
        _classCallCheck(this, Filterload);

        this.filter = options.filter;
        this.nHashFuncs = options.nHashFuncs;
        this.nTweak = options.nTweak;
        this.nFlags = options.nFlags;
    }

    _createClass(Filterload, [{
        key: 'toObject',
        value: function toObject() {
            return {
                filter: this.filter,
                nHashFuncs: this.nHashFuncs,
                nTweak: this.nTweak,
                nFlags: this.nFlags
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            var filterLengthBuffer = utils.writeVarint(this.filter.length);
            var filterBuffer = new Buffer(this.filter.length);
            for (var i = 0; i < this.filter.length; i++) {
                filterBuffer[i] = parseInt(this.filter[i]);
            }

            var bufferLength = filterLengthBuffer.length + filterBuffer.length + 9;

            var tailBuffer = new Buffer(9);
            tailBuffer.writeUInt32LE(this.nHashFuncs, 0);
            tailBuffer.writeUInt32LE(this.nTweak, 4);
            tailBuffer.writeUInt8(this.nFlags, 8);

            return Buffer.concat([filterLengthBuffer, filterBuffer, tailBuffer], bufferLength);
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var filterLength = utils.readVarint(buffer);
            var position = utils.varintLength(buffer);
            var payload = { filter: [] };

            if (buffer.length === filterLength + position + 9) {
                for (var i = 0; i < filterLength; i++) {
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
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            var options = {
                filter: utils.checkArrayInput(payload.filter),
                nHashFuncs: payload.nHashFuncs || 0,
                nTweak: payload.nTweak || 0,
                nFlags: payload.nFlags || 0
            };

            return new Filterload(options);
        }
    }]);

    return Filterload;
}();

exports.default = Filterload;