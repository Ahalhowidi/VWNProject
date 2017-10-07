export default class Observable {
    constructor() {
        this.observers = [];
        this.data = {
            tags: {
                1: 'tag1',
                2: 'tag2',
                3: 'tag3',
                4: 'tag4',
                5: 'tag5'
            }
        };
    }

    subscribe(f) {
        this.observers.push(f);
    }

    unsubscribe(f) {
        this.observers = this.observers.filter(observer => observer !== f);
    }

    set(k, v) {
        this.data[k] = v;
        this.observers.forEach(observer => {
            observer(this.data);
        });
    }

    get(k) {
        return this.data[k];
    }
}