"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filterclear = function () {
    function Filterclear() {
        _classCallCheck(this, Filterclear);
    }

    _createClass(Filterclear, [{
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
            return new Filterclear();
        }
    }, {
        key: "fromObject",
        value: function fromObject() {
            return new Filterclear();
        }
    }]);

    return Filterclear;
}();

exports.default = Filterclear;