'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inv = function () {
    function Inv(invs) {
        _classCallCheck(this, Inv);

        this.invs = utils.checkArrayInput(invs);
    }

    _createClass(Inv, [{
        key: 'toObject',
        value: function toObject() {
            return {
                count: this.invs.length,
                inventory: this.invs
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            if (!Array.isArray(this.invs)) {
                return new Buffer(0);
            }

            var buffers = [];
            var totalLength = 0;
            buffers.push(utils.writeVarint(this.invs.length)); // count
            totalLength += buffers[0].length;

            for (var i = 0; i < this.invs.length; i++) {
                buffers.push(utils.serializeInv(this.invs[i]));
                totalLength += buffers[buffers.length - 1].length;
            }

            return Buffer.concat(buffers, totalLength);
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            var count = utils.readVarint(buffer);
            var startInvs = utils.varintSize(buffer);

            var invs = [];
            for (var i = 0; i < count; i++) {
                invs.push({
                    type: buffer.readUInt32LE(startInvs),
                    hash: buffer.slice(startInvs + 4, startInvs + 36)
                });
                startInvs += 36;
            }

            return new Inv(invs);
        }
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            return new Inv(payload.inventory);
        }
    }]);

    return Inv;
}();

exports.default = Inv;