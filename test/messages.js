"use strict";

import data from './data/messages'
import chai from 'chai'
import Message from '../src/message'

describe('Testing Message Transformations', function() {

    before(function() {
        Message.setMessageBuilder('tx',undefined);
        Message.setMessageBuilder('headers',undefined);
    });

    it('Message Transformation: hex -> json', function() {
        data.forEach(function(item) {
            let message = Message.fromString(item.message);
            chai.expect(message.toObject()).to.deep.equal(item.json);
        });
    });

    it('Message Transformation: json -> hex', function() {
        data.forEach(function(item) {
            let message = Message.fromObject(item.json);
            chai.expect(message.toString()).to.equal(item.message);
        });
    });

});

