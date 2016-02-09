'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Addr = function () {
    function Addr(addrs) {
        _classCallCheck(this, Addr);

        this.addrs = addrs;
        // console.log(this.addrs);
    }

    _createClass(Addr, [{
        key: 'toObject',
        value: function toObject() {
            return {
                count: this.addrs.length,
                addresses: this.addrs
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            if (!Array.isArray(this.addrs)) {
                return new Buffer(0);
            }

            var buffers = [];
            var totalLength = 0;
            buffers.push(utils.writeVarint(this.addrs.length)); // count
            totalLength += buffers[0].length;

            for (var i = 0; i < this.addrs.length; i++) {
                if (!this.addrs[i].timestamp) {
                    // if no timestamp set date 5 days ago
                    this.addrs[i].timestamp = new Date(new Date().setDate(new Date().getDate() - 5));
                }

                buffers.push(utils.writeNetworkAddress(this.addrs[i]));
                totalLength += utils.PROTOCOL_ADDR_LENGTH;
            }

            return Buffer.concat(buffers, totalLength);
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var count = utils.readVarint(buffer);
            var startAddrs = utils.varintLength(buffer);

            var addrs = [];

            // check if addrs length is correct: version < 209 of bitcoin core sends addr without timestamp
            // otherwise don't accept addrs
            if ((buffer.length - startAddrs) / utils.PROTOCOL_ADDR_LENGTH === count) {
                for (var i = 0; i < count; i++) {
                    addrs.push(utils.readNetworkAddress(buffer.slice(startAddrs, startAddrs + utils.PROTOCOL_ADDR_LENGTH)));
                    startAddrs += utils.PROTOCOL_ADDR_LENGTH;
                }
            }

            return new Addr(addrs);
        }
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            payload.address = utils.checkArrayInput(payload.address);
            return new Addr(payload.addresses);
        }
    }]);

    return Addr;
}();

exports.default = Addr;