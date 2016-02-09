'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tx = function () {
    function Tx(input) {
        _classCallCheck(this, Tx);

        if (typeof this.build === 'function' && Buffer.isBuffer(input)) {
            this.tx = this.build(input);
        } else if (Buffer.isBuffer(input)) {
            this.tx = input;
        } else {
            throw new Error('Incorrect Transaction Data');
        }
    }

    _createClass(Tx, [{
        key: 'toObject',
        value: function toObject() {
            return {
                tx: this.tx
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            if (typeof this.serialize === 'function' && !Buffer.isBuffer(this.tx)) {
                return this.serialize(this.tx);
            }
            return this.tx;
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            return new Tx(buffer);
        }
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            payload.tx = utils.checkBufferInput(payload.tx);
            return new Tx(payload.tx);
        }
    }]);

    return Tx;
}();

exports.default = Tx;