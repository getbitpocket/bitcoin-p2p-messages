[![Build Status](https://travis-ci.org/getbitpocket/bitcoin-p2p-messages.svg?branch=master)](https://travis-ci.org/getbitpocket/bitcoin-p2p-messages)

# bitcoin-p2p-protocol

 - ES6 implementation of the [Bitcoin p2p protocol](https://en.bitcoin.it/wiki/Protocol_documentation)
 - messages should be created from javascript objects or buffers (hex strings) 
 - Static Methods: Message.fromObject, Message.fromBuffer, Message.fromString
 - Instance Methods: message.toObject, message.toBuffer, message.toString
 - Reduce dependencies to a bare minimum: (buffer,crypto, biginteger)
 - Compatibility with other javascript bitcoin libraries: (bitcore, bitcoinjs, cryptocoinjs)

# Convention

 - Build: From Buffer/Hex To Json/Object
 - Serialize: From Json/Object To Buffer/Hex
 - fromObject datatypes:
    - Hash: string or buffer
    - BigNumber: BN or number
    - timestamp: date object

# Implementation status

|Message|fromBuffer|toBuffer|fromObject|toObject|
|---|---|---|---|---|
|version|:+1:|:+1:|:+1:|:+1:|
|verack|:+1:|:+1:|:+1:|:+1:|
|addr|:+1:|:+1:|:+1:|:+1:|
|inv|:+1:|:+1:|:+1:|:+1:|
|getdata|:+1:|:+1:|:+1:|:+1:|
|notfound|:+1:|:+1:|:+1:|:+1:|
|getblocks|:+1:|:+1:|:+1:|:+1:|
|getheaders|:+1:|:+1:|:+1:|:+1:|
|tx|:+1:|:+1:|:+1:|:+1:|
|block|:+1:|:+1:|:+1:|:+1:|
|headers|:+1:|:+1:|:+1:|:+1:|
|getaddr|:+1:|:+1:|:+1:|:+1:|
|mempool|:+1:|:+1:|:+1:|:+1:|
|ping|:+1:|:+1:|:+1:|:+1:|
|pong|:+1:|:+1:|:+1:|:+1:|
|filterload|:+1:|:+1:|:+1:|:+1:|
|filteradd|:+1:|:+1:|:+1:|:+1:|
|filterclear|:+1:|:+1:|:+1:|:+1:|
|merkleblock|:+1:|:+1:|:+1:|:+1:|
|reject|:+1:|:+1:|:+1:|:+1:|
|sendheaders|:+1:|:+1:|:+1:|:+1:|
|alert|:-1:|:-1:|:-1:|:-1:|

# Run Tests

 - npm install
 - npm test

# Contribute

Contributions are always welcome. Open issues are avaialbe: [Issues](https://github.com/getbitpocket/bitcoin-p2p-messages/issues)
