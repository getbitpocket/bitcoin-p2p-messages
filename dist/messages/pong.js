'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pong = function () {
    function Pong(nonce) {
        _classCallCheck(this, Pong);

        if (utils.isNonce(nonce)) {
            this.nonce = nonce;
        } else {
            throw new Error('Pong: No Nonce given');
        }
    }

    _createClass(Pong, [{
        key: 'toObject',
        value: function toObject() {
            return {
                nonce: this.nonce
            };
        }
    }, {
        key: 'toBuffer',
        value: function toBuffer() {
            return this.nonce;
        }
    }], [{
        key: 'fromBuffer',
        value: function fromBuffer(buffer) {
            return new Pong(buffer);
        }
    }, {
        key: 'fromObject',
        value: function fromObject(payload) {
            return new Pong(payload.nonce);
        }
    }]);

    return Pong;
}();

exports.default = Pong;