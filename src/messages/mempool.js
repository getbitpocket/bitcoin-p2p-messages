export default class Mempool {

    constructor() {
    }

    toObject() {
        return {};
    }

    toBuffer() {
        return new Buffer();
    }

    static fromBuffer() {
        return new Mempool();
    }

    static fromObject() {
        return new Mempool();
    }
}