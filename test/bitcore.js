"use strict";

import data from './data/messages'
import chai from 'chai'
import Message from '../src/message'
import * as bitcore from 'bitcore-lib'

describe('Testing Messages against Bitcore', function() {

    before(function() {
/*
        Message.setMessageBuilder('tx',function(buffer) {
            return new bitcore.Transaction(buffer);
        });

        Message.setMessageBuilder('headers',function(buffer) {
            return new bitcore.BlockHeader(buffer);
        });
*/
    });

    xit('Testing selected messages', function() {
        data.forEach(function(item) {
            let message = Message.fromString(item.message);

            if (message.command === 'tx') {
                // TODO: is there anything more one could check?
                chai.expect(message.payload.tx).to.be.an.instanceof(bitcore.Transaction);
                chai.expect(message.payload.tx.verify()).to.be.true;
            } else if (message.command === 'headers') {
                chai.expect(message.payload.headers).to.be.an.instanceof(Array);
                for (let i = 0; i < message.payload.headers.length; i++) {
                    chai.expect(message.payload.headers[i]).to.be.an.instanceof(bitcore.BlockHeader);
                }
            }

        });
    });

});

