export default class Observable {
    constructor() {
        this.observers = [];
        this.data = {};
    }

    subscribe(f) {
        this.observers.push(f);
    }

    set(k, v) {
        this.data[k] = v;
        this.observers.forEach(observer => {
            observer(k, v);
        });
    }

    get(k) {
        return this.data[k];
    }
}

//let observable = function() {
//    this.values = function() { return Object.values(this.data); }
//}