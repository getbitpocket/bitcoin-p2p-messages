"use strict";

import crypto from 'crypto'

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

export function sha256(input) {
    let hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest();
}

export function sha256x2(input) {
    return sha256(sha256(input));
}

export function generateNonce() {
    return crypto.randomBytes(8);
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

export function serializeInv(inv) {
    if (Buffer.isBuffer(inv.hash) && (typeof inv.type === 'number')) {
        let typeBuffer = new Buffer(4);
        typeBuffer.writeUInt32LE(inv.type,0);
        return Buffer.concat([typeBuffer,inv.hash],PROTOCOL_INV_LENGTH);
    }
    throw new Error('Incorrect inv inputs');
}
