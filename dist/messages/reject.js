'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reject = function () {
    function Reject(options) {
        _classCallCheck(this, Reject);

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
                // console.log(key + " " + options[key]);
            }
        }
    }

    _createClass(Reject, [{
        key: 'toObject',
        value: function toObject() {
            return {
                message: this.message,
                ccode: this.ccode,
                reason: this.reason,
                data: this.data
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            var buffers = [];
            var totalLength = 0;

            buffers[0] = utils.writeVarstring(this.message, 'utf-8');
            totalLength += buffers[0].length;

            buffers[1] = new Buffer(1);
            buffers[1][0] = this.ccode;
            totalLength += buffers[1].length;

            buffers[2] = utils.writeVarstring(this.reason, 'utf-8');
            totalLength += buffers[2].length;

            buffers[3] = this.data;
            totalLength += buffers[3].length;

            return Buffer.concat(buffers, totalLength);
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var message = utils.readVarstring(buffer, 'utf-8');
            var position = utils.varstringLength(buffer);

            var ccode = buffer.readUInt8(position);
            position += 1;

            var reason = utils.readVarstring(buffer.slice(position), 'utf-8');
            position += utils.varstringLength(buffer.slice(position));

            var data = buffer.slice(position);

            return new Reject({
                message: message,
                ccode: ccode,
                reason: reason,
                data: data
            });
        }
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            var input = {};
            input.message = typeof payload.message === 'string' ? new Buffer(payload.message, 'utf-8') : new Buffer(0);
            input.ccode = parseInt(payload.ccode);
            input.reason = typeof payload.reason === 'string' ? new Buffer(payload.reason, 'utf-8') : new Buffer(0);
            input.data = Buffer.isBuffer(payload.data) ? payload.data : new Buffer(0);

            return new Reject(input);
        }
    }]);

    return Reject;
}();

exports.default = Reject;