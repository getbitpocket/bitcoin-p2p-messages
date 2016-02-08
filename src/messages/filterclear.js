export default class Filterclear {

    constructor() {
    }

    toObject() {
        return {};
    }

    toBuffer() {
        return new Buffer(0);
    }

    static fromBuffer() {
        return new Filterclear();
    }

    static fromObject() {
        return new Filterclear();
    }
}