export default class Verack {

    constructor() {
    }

    toObject() {
        return {};
    }

    toBuffer() {
        return new Buffer(0);
    }

    static fromBuffer() {
        return new Verack();
    }

    static fromObject() {
        return new Verack();
    }
}