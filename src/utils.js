"use strict";

import crypto from 'crypto'
import BN from 'bn.js'

export const VERSION = require('../package.json').version;

export const Network = {
    mainnet  : 0xD9B4BEF9 ,
    testnet  : 0xDAB5BFFA ,
    testnet3 : 0x0709110B
};

export const BLOCK_HEADER_LENGTH = 81;

export const PROTOCOL_HEADER_LENGTH = 24; // Bytes
export const PROTOCOL_INV_LENGTH = 36;
export const PROTOCOL_VERSION = 70001;
export const PROTOCOL_NODE_NETWORK = new Buffer('0100000000000000','hex');
export const PROTOCOL_USER_AGENT = '/BitPocket:'+VERSION+'/';
export const PROTOCOL_ADDR_LENGTH = 30; // including timestamp

export const PROTOCOL_REJECT_CCODE_MALFORMED = 0x01;
export const PROTOCOL_REJECT_CCODE_INVALID = 0x10;
export const PROTOCOL_REJECT_CCODE_OBSOLETE = 0x11;
export const PROTOCOL_REJECT_CCODE_DUPLICATE = 0x12;
export const PROTOCOL_REJECT_CCODE_NONSTANDARD = 0x40;
export const PROTOCOL_REJECT_CCODE_DUST = 0x41;
export const PROTOCOL_REJECT_CCODE_INSUFFICIENTEFEE = 0x42;
export const PROTOCOL_REJECT_CCODE_CHECKPOINT = 0x43;

export function sha256(input) {
    let hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest();
}

export function sha256x2(input) {
    return sha256(sha256(input));
}

export function generateRandomBuffer(size=8) {
    return crypto.randomBytes(size);
}

export function generateRandomBN() {
    return new BN(generateRandomBuffer(),'16','lt');
}

export function isNonce(buffer) {
    return Buffer.isBuffer(buffer) && buffer.length === 8;
}

export function getNetwork(magic) {
    let network = '';

    for (let key in Network) {
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
export function varintSize(buffer,start=0) {
    switch (buffer.readUInt8(start)) {
        case 0xFD: // UInt8 UInt16LE
            return 3;
        case 0xFE: // UInt8 UInt32LE
            return 5;
        case 0xFF:// UInt8 UInt64LE
            return 9;
        default:
            return 1;
    }
}

export function varintLength(buffer,start=0) {
    switch (buffer.readUInt8(start)) {
        case 0xFD: // UInt8 UInt16LE
            return 3;
        case 0xFE: // UInt8 UInt32LE
            return 5;
        case 0xFF:// UInt8 UInt64LE
            return 9;
        default:
            return 1;
    }
}

export function readVarint(buffer,start=0) {
    var precede = buffer.readUInt8(start);
    switch (precede) {
        case 0xFD:
            return buffer.readUInt16LE(start+1);
        case 0xFE:
            return buffer.readUInt32LE(start+1);
        case 0xFF:
            let second = buffer.readUInt32LE(start+1);
            let first  = buffer.readUInt32LE(start+5);
            let combined = (first * 0x100000000) + second;

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

export function writeVarint(n) {
    let buf = undefined;
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

export function varstringLength(input) {
    let stringStart  = varintLength(input);
    let stringLength = readVarint(input);
    return stringStart + stringLength;
}

export function readVarstring(input,encoding='ascii') {
    let stringStart  = varintLength(input);
    let stringLength = readVarint(input);
    return input.slice(stringStart,stringLength+stringStart).toString(encoding);
}

export function writeVarstring(input,encoding='ascii') {
    let varIntBuffer = writeVarint(input.length);
    let varIntLength = varintLength(varIntBuffer);
    return Buffer.concat([varIntBuffer,new Buffer(input,encoding)],varIntLength+input.length);
}

export function readUInt64LE(input) {
    if (Buffer.isBuffer(input)) {
        input = input.slice(0,8).toString('hex');
    }
    if (typeof input === 'string' && input.length === 16) {
        return new BN(input,16,'le');
    }
    throw new Error('Incorrect input for reading 64Bit Integer');
}

export function read64BitTimestamp(input) {
    return new Date(readUInt64LE(input).toNumber() * 1000);
}

export function readIP(input) {
    let ipv6 = [];
    let ipv4 = [];
    for (let a = 0; a < 16; a+=2) {
        var twoBytes = input.slice(a,a+2);
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

export function readNetworkAddress(input) {
    let start = 0, address = {};
    if (input.length === PROTOCOL_ADDR_LENGTH)  { // timestamp included
        address.timestamp = new Date(input.readUInt32LE(0) * 1000);
        start = 4;
    }
    address.services = readUInt64LE(input.slice(start,start+8));
    address.ip = readIP(input.slice(start+8,start+24));
    address.port = input.readUInt16BE(start+24);

    return address;
}

export function writeIP(ip) {
    if (typeof ip.v6 === 'string' && ip.v6.length === 39) { // TODO: maybe support all possible ipv6 variants
        return new Buffer(ip.v6.replace(/:/g,''),'hex');
    } else if (typeof ip.v4 === 'string' && (ip.v4.split('.').length === 4)) {
        let buffer = new Buffer(16);

        // see dual-stack: https://en.wikipedia.org/wiki/IPv6#IPv4-mapped_IPv6_addresses
        buffer[10] = 255;
        buffer[11] = 255;
        ip.v4.split('.').forEach(function(byte,index) {
            buffer[index+12] = parseInt(byte);
        });
        return buffer;
    }
}

export function writeNetworkAddress(address) {
    let totalLength = PROTOCOL_ADDR_LENGTH - 4;
    let buffers = [];

    if (address.timestamp && (address.timestamp instanceof Date)) {
        buffers.push(new Buffer(4));
        buffers[buffers.length-1].writeUInt32LE(Math.round(address.timestamp.getTime() / 1000));
        totalLength = PROTOCOL_ADDR_LENGTH;
    }

    buffers.push(address.services.toArrayLike(Buffer,'le',8)); // BN dependency
    buffers.push(writeIP(address.ip));

    let buffer = Buffer.concat(buffers,totalLength);
    buffer.writeUInt16BE(address.port,totalLength-2);
    return buffer;
}

export function serializeInv(inv) {
    if (Buffer.isBuffer(inv.hash) && (typeof inv.type === 'number')) {
        let typeBuffer = new Buffer(4);
        typeBuffer.writeUInt32LE(inv.type,0);
        return Buffer.concat([typeBuffer,inv.hash],PROTOCOL_INV_LENGTH);
    }
    throw new Error('Incorrect inv inputs');
}

export function checkNetworkAddressInput(input,defaultValue) {
    input = input || {};
    input.services = checkBigNumberInput(input.services,new BN(1));
    input.ip = checkIpInput(input.ip);
    input.port = input.port || 8333;
    return input;
}

export function checkIpInput(input,defaultValue) {
    defaultValue = defaultValue || {
        v4 : '127.0.0.1' ,
        v6 : '0000:0000:0000:0000:0000:ffff:7f00:0001'
    };

    if (input && (input.v4 || input.v6)) {
        return input;
    }

    return defaultValue;
}

export function checkBigNumberInput(input,defaultValue) {
    if (input instanceof BN) {
        return input;
    } else if (typeof input === 'number') {
        return new BN(input);
    }
    return defaultValue || new BN(0);
}

export function checkBufferInput(input,defaultValue) {
    if (typeof input === 'string') {
        return new Buffer(input,'hex');
    } else if (Buffer.isBuffer(input)) {
        return input;
    }
    return Buffer.isBuffer(defaultValue) ? defaultValue : new Buffer(0);
}

export function checkArrayInput(input,defaultValue) {
    if (!Array.isArray(input)) {
        return defaultValue || [];
    }
    return input;
}
