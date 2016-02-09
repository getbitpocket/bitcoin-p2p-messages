"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filteradd = function () {
    function Filteradd(options) {
        _classCallCheck(this, Filteradd);

        this.data = options.data;
    }

    _createClass(Filteradd, [{
        key: "toObject",
        value: function toObject() {
            return {
                data: this.data
            };
        }
    }, {
        key: "toBuffer",
        value: function toBuffer() {
            return this.data;
        }
    }], [{
        key: "fromBuffer",
        value: function fromBuffer(buffer) {
            return new Filteradd({
                data: buffer
            });
        }
    }, {
        key: "fromObject",
        value: function fromObject(payload) {
            var options = {
                data: payload.data || new Buffer(0)
            };

            return new Filteradd(options);
        }
    }]);

    return Filteradd;
}();

exports.default = Filteradd;