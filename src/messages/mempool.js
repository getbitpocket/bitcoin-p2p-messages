export default class Mempool {

    constructor() {
    }

    toObject() {
        return {};
    }

    toBuffer() {
        return new Buffer(0);
    }

    static fromBuffer() {
        return new Mempool();
    }

    static fromObject() {
        return new Mempool();
    }
}