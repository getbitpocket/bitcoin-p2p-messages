export default class Sendheaders {

    constructor() {
    }

    toObject() {
        return {};
    }

    toBuffer() {
        return new Buffer(0);
    }

    static fromBuffer() {
        return new Sendheaders();
    }

    static fromObject() {
        return new Sendheaders();
    }
}