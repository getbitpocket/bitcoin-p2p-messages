export default class Getaddr {

    constructor() {
    }

    toObject() {
        return {};
    }

    toBuffer() {
        return new Buffer(0);
    }

    static fromBuffer() {
        return new Getaddr();
    }

    static fromObject() {
        return new Getaddr();
    }
}