"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PROTOCOL_REJECT_CCODE_CHECKPOINT = exports.PROTOCOL_REJECT_CCODE_INSUFFICIENTEFEE = exports.PROTOCOL_REJECT_CCODE_DUST = exports.PROTOCOL_REJECT_CCODE_NONSTANDARD = exports.PROTOCOL_REJECT_CCODE_DUPLICATE = exports.PROTOCOL_REJECT_CCODE_OBSOLETE = exports.PROTOCOL_REJECT_CCODE_INVALID = exports.PROTOCOL_REJECT_CCODE_MALFORMED = exports.PROTOCOL_ADDR_LENGTH = exports.PROTOCOL_USER_AGENT = exports.PROTOCOL_NODE_NETWORK = exports.PROTOCOL_VERSION = exports.PROTOCOL_INV_LENGTH = exports.PROTOCOL_HEADER_LENGTH = exports.BLOCK_HEADER_LENGTH = exports.Network = exports.VERSION = undefined;
exports.sha256 = sha256;
exports.sha256x2 = sha256x2;
exports.generateRandomBuffer = generateRandomBuffer;
exports.generateRandomBN = generateRandomBN;
exports.isNonce = isNonce;
exports.getNetwork = getNetwork;
exports.varintSize = varintSize;
exports.varintLength = varintLength;
exports.readVarint = readVarint;
exports.writeVarint = writeVarint;
exports.varstringLength = varstringLength;
exports.readVarstring = readVarstring;
exports.writeVarstring = writeVarstring;
exports.readUInt64LE = readUInt64LE;
exports.read64BitTimestamp = read64BitTimestamp;
exports.readIP = readIP;
exports.readNetworkAddress = readNetworkAddress;
exports.writeIP = writeIP;
exports.writeNetworkAddress = writeNetworkAddress;
exports.serializeInv = serializeInv;
exports.checkBigNumberInput = checkBigNumberInput;
exports.checkBufferInput = checkBufferInput;
exports.checkArrayInput = checkArrayInput;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bn = require('bn.js');

var _bn2 = _interopRequireDefault(_bn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = exports.VERSION = require('../package.json').version;

var Network = exports.Network = {
    mainnet: 0xD9B4BEF9,
    testnet: 0xDAB5BFFA,
    testnet3: 0x0709110B
};

var BLOCK_HEADER_LENGTH = exports.BLOCK_HEADER_LENGTH = 81;

var PROTOCOL_HEADER_LENGTH = exports.PROTOCOL_HEADER_LENGTH = 24; // Bytes
var PROTOCOL_INV_LENGTH = exports.PROTOCOL_INV_LENGTH = 36;
var PROTOCOL_VERSION = exports.PROTOCOL_VERSION = 70001;
var PROTOCOL_NODE_NETWORK = exports.PROTOCOL_NODE_NETWORK = new Buffer('0100000000000000', 'hex');
var PROTOCOL_USER_AGENT = exports.PROTOCOL_USER_AGENT = '/BitPocket:' + VERSION + '/';
var PROTOCOL_ADDR_LENGTH = exports.PROTOCOL_ADDR_LENGTH = 30; // including timestamp

var PROTOCOL_REJECT_CCODE_MALFORMED = exports.PROTOCOL_REJECT_CCODE_MALFORMED = 0x01;
var PROTOCOL_REJECT_CCODE_INVALID = exports.PROTOCOL_REJECT_CCODE_INVALID = 0x10;
var PROTOCOL_REJECT_CCODE_OBSOLETE = exports.PROTOCOL_REJECT_CCODE_OBSOLETE = 0x11;
var PROTOCOL_REJECT_CCODE_DUPLICATE = exports.PROTOCOL_REJECT_CCODE_DUPLICATE = 0x12;
var PROTOCOL_REJECT_CCODE_NONSTANDARD = exports.PROTOCOL_REJECT_CCODE_NONSTANDARD = 0x40;
var PROTOCOL_REJECT_CCODE_DUST = exports.PROTOCOL_REJECT_CCODE_DUST = 0x41;
var PROTOCOL_REJECT_CCODE_INSUFFICIENTEFEE = exports.PROTOCOL_REJECT_CCODE_INSUFFICIENTEFEE = 0x42;
var PROTOCOL_REJECT_CCODE_CHECKPOINT = exports.PROTOCOL_REJECT_CCODE_CHECKPOINT = 0x43;

function sha256(input) {
    var hash = _crypto2.default.createHash('sha256');
    hash.update(input);
    return hash.digest();
}

function sha256x2(input) {
    return sha256(sha256(input));
}

function generateRandomBuffer() {
    var size = arguments.length <= 0 || arguments[0] === undefined ? 8 : arguments[0];

    return _crypto2.default.randomBytes(size);
}

function generateRandomBN() {
    return new _bn2.default(generateRandomBuffer(), '16', 'lt');
}

function isNonce(buffer) {
    return Buffer.isBuffer(buffer) && buffer.length === 8;
}

function getNetwork(magic) {
    var network = '';

    for (var key in Network) {
        if (Network[key] === magic) {
            network = key;
            break;
        }
    }

    if (network.length > 0) {
        return network;
    }

    throw new Error('Incorrect magic number / network');
}

// TODO: reomve instead of varintLength
function varintSize(buffer) {
    var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    switch (buffer.readUInt8(start)) {
        case 0xFD:
            // UInt8 UInt16LE
            return 3;
        case 0xFE:
            // UInt8 UInt32LE
            return 5;
        case 0xFF:
            // UInt8 UInt64LE
            return 9;
        default:
            return 1;
    }
}

function varintLength(buffer) {
    var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    switch (buffer.readUInt8(start)) {
        case 0xFD:
            // UInt8 UInt16LE
            return 3;
        case 0xFE:
            // UInt8 UInt32LE
            return 5;
        case 0xFF:
            // UInt8 UInt64LE
            return 9;
        default:
            return 1;
    }
}

function readVarint(buffer) {
    var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    var precede = buffer.readUInt8(start);
    switch (precede) {
        case 0xFD:
            return buffer.readUInt16LE(start + 1);
        case 0xFE:
            return buffer.readUInt32LE(start + 1);
        case 0xFF:
            var second = buffer.readUInt32LE(start + 1);
            var first = buffer.readUInt32LE(start + 5);
            var combined = first * 0x100000000 + second;

            if (combined <= 0x1fffffffffffff) {
                return combined;
            } else {
                throw new Error('TODO: BigInteger needs to be parsed');
            }
            break;
        default:
            return precede;
    }
}

function writeVarint(n) {
    var buf = undefined;
    if (n < 253) {
        buf = new Buffer(1);
        buf.writeUInt8(n, 0);
    } else if (n < 0x10000) {
        buf = new Buffer(1 + 2);
        buf.writeUInt8(253, 0);
        buf.writeUInt16LE(n, 1);
    } else if (n < 0x100000000) {
        buf = new Buffer(1 + 4);
        buf.writeUInt8(254, 0);
        buf.writeUInt32LE(n, 1);
    } else {
        buf = new Buffer(1 + 8);
        buf.writeUInt8(255, 0);
        buf.writeInt32LE(n & -1, 1);
        buf.writeUInt32LE(Math.floor(n / 0x100000000), 5);
    }
    return buf;
}

function varstringLength(input) {
    var stringStart = varintLength(input);
    var stringLength = readVarint(input);
    return stringStart + stringLength;
}

function readVarstring(input) {
    var encoding = arguments.length <= 1 || arguments[1] === undefined ? 'ascii' : arguments[1];

    var stringStart = varintLength(input);
    var stringLength = readVarint(input);
    return input.slice(stringStart, stringLength + stringStart).toString(encoding);
}

function writeVarstring(input) {
    var encoding = arguments.length <= 1 || arguments[1] === undefined ? 'ascii' : arguments[1];

    var varIntBuffer = writeVarint(input.length);
    var varIntLength = varintLength(varIntBuffer);
    return Buffer.concat([varIntBuffer, new Buffer(input, encoding)], varIntLength + input.length);
}

function readUInt64LE(input) {
    if (Buffer.isBuffer(input)) {
        input = input.slice(0, 8).toString('hex');
    }
    if (typeof input === 'string' && input.length === 16) {
        return new _bn2.default(input, 16, 'le');
    }
    throw new Error('Incorrect input for reading 64Bit Integer');
}

function read64BitTimestamp(input) {
    return new Date(readUInt64LE(input).toNumber() * 1000);
}

function readIP(input) {
    var ipv6 = [];
    var ipv4 = [];
    for (var a = 0; a < 16; a += 2) {
        var twoBytes = input.slice(a, a + 2);
        ipv6.push(twoBytes.toString('hex'));
        if (a >= 12) {
            ipv4.push(twoBytes[0]);
            ipv4.push(twoBytes[1]);
        }
    }
    ipv6 = ipv6.join(':');
    ipv4 = ipv4.join('.');
    return {
        v6: ipv6,
        v4: ipv4
    };
}

function readNetworkAddress(input) {
    var start = 0,
        address = {};
    if (input.length === PROTOCOL_ADDR_LENGTH) {
        // timestamp included
        address.timestamp = new Date(input.readUInt32LE(0) * 1000);
        start = 4;
    }
    address.services = readUInt64LE(input.slice(start, start + 8));
    address.ip = readIP(input.slice(start + 8, start + 24));
    address.port = input.readUInt16BE(start + 24);

    return address;
}

function writeIP(ip) {
    if (typeof ip.v6 === 'string' && ip.v6.length === 39) {
        // TODO: maybe support all possible ipv6 variants
        return new Buffer(ip.v6.replace(/:/g, ''), 'hex');
    } else if (typeof ip.v4 === 'string' && ip.v4.split('.').length === 4) {
        var _ret = function () {
            var buffer = new Buffer(16);

            // see dual-stack: https://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses
            buffer[10] = 255;
            buffer[11] = 255;
            ip.v4.split('.').forEach(function (byte, index) {
                buffer[index + 12] = parseInt(byte);
            });
            return {
                v: buffer
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
}

function writeNetworkAddress(address) {
    var totalLength = PROTOCOL_ADDR_LENGTH - 4;
    var buffers = [];

    if (address.timestamp && address.timestamp instanceof Date) {
        buffers.push(new Buffer(4));
        buffers[buffers.length - 1].writeUInt32LE(Math.round(address.timestamp.getTime() / 1000));
        totalLength = PROTOCOL_ADDR_LENGTH;
    }

    buffers.push(address.services.toArrayLike(Buffer, 'le', 8)); // BN dependency
    buffers.push(writeIP(address.ip));

    var buffer = Buffer.concat(buffers, totalLength);
    buffer.writeUInt16BE(address.port, totalLength - 2);
    return buffer;
}

function serializeInv(inv) {
    if (Buffer.isBuffer(inv.hash) && typeof inv.type === 'number') {
        var typeBuffer = new Buffer(4);
        typeBuffer.writeUInt32LE(inv.type, 0);
        return Buffer.concat([typeBuffer, inv.hash], PROTOCOL_INV_LENGTH);
    }
    throw new Error('Incorrect inv inputs');
}

function checkBigNumberInput(input, defaultValue) {
    if (input instanceof _bn2.default) {
        return input;
    } else if (typeof input === 'number') {
        return new _bn2.default(input);
    }
    return defaultValue || new _bn2.default(0);
}

function checkBufferInput(input, defaultValue) {
    if (typeof input === 'string') {
        return new Buffer(input, 'hex');
    } else if (Buffer.isBuffer(input)) {
        return input;
    }
    return Buffer.isBuffer(defaultValue) ? defaultValue : new Buffer(0);
}

function checkArrayInput(input, defaultValue) {
    if (!Array.isArray(input)) {
        return defaultValue || [];
    }
    return input;
}