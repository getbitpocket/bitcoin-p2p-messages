'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Headers = function () {
    function Headers(input) {
        _classCallCheck(this, Headers);

        if (typeof this.build === 'function' && Array.isArray(input)) {
            for (var i = 0; i < input.length; i++) {
                input[i] = this.build(input[i]);
            }
        }

        this.headers = input;
    }

    _createClass(Headers, [{
        key: 'toObject',
        value: function toObject() {
            return {
                count: this.headers.length,
                headers: this.headers
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            if (!Array.isArray(this.headers)) {
                return new Buffer(0);
            }

            var buffers = [];
            var totalLength = 0;
            buffers.push(utils.writeVarint(this.headers.length)); // count
            totalLength += buffers[0].length;

            for (var i = 0; i < this.headers.length; i++) {
                if (typeof this.serialize === 'function' && !Buffer.isBuffer(this.headers[i])) {
                    buffers.push(this.serialize(this.headers[i]));
                }
                buffers.push(utils.checkBufferInput(this.headers[i]));
                totalLength += buffers[buffers.length - 1].length;
            }

            return Buffer.concat(buffers, totalLength);
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var count = utils.readVarint(buffer);
            var startHeaders = utils.varintSize(buffer);
            var headers = [];

            for (var i = 0; i < count; i++) {
                headers.push(buffer.slice(startHeaders, startHeaders + utils.BLOCK_HEADER_LENGTH));
                startHeaders += utils.BLOCK_HEADER_LENGTH;
            }

            return new Headers(headers);
        }
    }, {
        key: 'fromObject',
        value: function fromObject(message) {
            message.headers = utils.checkArrayInput(message.headers);
            return new Headers(message.headers);
        }
    }]);

    return Headers;
}();

exports.default = Headers;