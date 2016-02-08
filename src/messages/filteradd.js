export default class Filteradd {

    constructor(options) {
        this.data = options.data;
    }

    toObject() {
        return {
            data : this.data
        };
    }

    toBuffer() {
        return this.data;
    }

    static fromBuffer(buffer) {
        return new Filteradd({
            data : buffer
        });
    }

    static fromObject(payload) {
        let options = {
            data : payload.data || new Buffer(0)
        };

        return new Filteradd(options);
    }
}