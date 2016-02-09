'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _message = require('message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageBuilder = function MessageBuilder() {
    _classCallCheck(this, MessageBuilder);

    this.message = new _message2.default();
};

exports.default = MessageBuilder;