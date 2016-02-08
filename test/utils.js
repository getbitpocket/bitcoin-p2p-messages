// 01 00 00 00 00 00 00 00

"use strict";

import chai from 'chai'
import * as utils from '../src/utils'
import BN from 'bn.js'

describe('Testing Utility Functions', function() {

    it('Reading UInt64 as BN', function() {
        let number1 = utils.readUInt64LE('0100000000000000');
        chai.expect(number1.toNumber()).to.equal(1);

        let date = new Date(utils.readUInt64LE('E615104D00000000').toNumber() * 1000);
        chai.expect(date.getTime()).to.equal((new Date('Mon Dec 20 21:50:14 EST 2010')).getTime());
    });

    it('Reading Varstring', function() {
        let userAgent = utils.readVarstring(new Buffer('0F2F5361746F7368693A302E372E322F','hex'));
        chai.expect(userAgent).to.equal("/Satoshi:0.7.2/");

        let emptyString = utils.readVarstring(new Buffer('00','hex'));
        chai.expect(emptyString).to.equal("");

        let userAgentExt = utils.readVarstring(new Buffer('0F2F5361746F7368693A302E372E322F9999999999999999999999','hex')); // random data at the end of the buffer
        chai.expect(userAgentExt).to.equal("/Satoshi:0.7.2/");
    });

    it('Reading Newtork Address', function() {
        let address = utils.readNetworkAddress(new Buffer('010000000000000000000000000000000000FFFF0A000001208D','hex'));
        address.services = address.services.toNumber();

        chai.expect(address).to.deep.equal({
            services : 1 ,
            ip : {
                v4 : '10.0.0.1' ,
                v6 : '0000:0000:0000:0000:0000:ffff:0a00:0001'
            } ,
            port : 8333
        });
    });

    it('Write Network Address', function() {
        let buffer = utils.writeNetworkAddress({
            services : new BN(1) ,
            ip : {
                v4 : '10.0.0.1' ,
                v6 : '0000:0000:0000:0000:0000:ffff:0a00:0001'
            } ,
            port : 8333
        });

        chai.expect(buffer.toString('hex')).to.equal('010000000000000000000000000000000000ffff0a000001208d');
    });

    it('write IP to Buffer', function() {
        let bufferV6 = utils.writeIP({
            v6 : '0000:0000:0000:0000:0000:ffff:0a00:0001'
        });
        chai.expect(bufferV6.toString('hex')).to.equal('00000000000000000000ffff0a000001');

        let bufferV4 = utils.writeIP({
            v4 : '10.0.0.1'
        });
        chai.expect(bufferV4.toString('hex')).to.equal('00000000000000000000ffff0a000001');
    });

    it('check BN inputs', function() {
        let i1 = utils.checkBigNumberInput(123);
        chai.expect(i1.toNumber()).to.equal(123);

        let i2 = utils.checkBigNumberInput(new BN('10',10));
        chai.expect(i2.toNumber()).to.equal(10);

        let i3 = utils.checkBigNumberInput(undefined,new BN(10));
        chai.expect(i3.toNumber()).to.equal(10);

        let i4 = utils.checkBigNumberInput(undefined,undefined);
        chai.expect(i4.toNumber()).to.equal(0);
    });

    it('check buffer inputs', function() {
        let i1 = utils.checkBufferInput('aabbcc');
        chai.expect(i1).to.deep.equal(new Buffer('aabbcc','hex'));

        let i2 = utils.checkBufferInput(new Buffer('aabbcc','hex'));
        chai.expect(i2).to.deep.equal(new Buffer('aabbcc','hex'));

        let i3 = utils.checkBufferInput(23423);
        chai.expect(i3).to.deep.equal(new Buffer(0));

        let i4 = utils.checkBufferInput(23423,new Buffer('1234','hex'));
        chai.expect(i4).to.deep.equal(new Buffer('1234','hex'));
    });

    it('check array inputs', function() {
        let i1 = utils.checkArrayInput([3,4]);
        chai.expect(i1).to.include.members([3,4]);

        let i2 = utils.checkArrayInput(234234,[3]);
        chai.expect(i2).to.include.members([3]);

        let i3 = utils.checkArrayInput(234234);
        chai.expect(i3).to.include.members([]);
    });

});

