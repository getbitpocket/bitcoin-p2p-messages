"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Getaddr = function () {
    function Getaddr() {
        _classCallCheck(this, Getaddr);
    }

    _createClass(Getaddr, [{
        key: "toObject",
        value: function toObject() {
            return {};
        }
    }, {
        key: "toBuffer",
        value: function toBuffer() {
            return new Buffer(0);
        }
    }], [{
        key: "fromBuffer",
        value: function fromBuffer() {
            return new Getaddr();
        }
    }, {
        key: "fromObject",
        value: function fromObject() {
            return new Getaddr();
        }
    }]);

    return Getaddr;
}();

exports.default = Getaddr;