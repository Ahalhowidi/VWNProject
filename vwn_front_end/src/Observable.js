class Observable {
    constructor() {
        this.observers = [];
        this.data = {};
    }

    subscribe(f) {
        this.observers.push(f);
    }

    unsubscribe(f) {
        this.observers = this.observers.filter(observer => observer !== f);
    }

    set(dataType, key, value) {
        if (!this.data[dataType]) {
            this.data[dataType] = {};
        }
        this.data[dataType][key] = value;
    }

    setDataType(dataType, value) {
        this.data[dataType] = value;
    }

    get(dataType, key) {
        if (!this.data[dataType]) {
            return false;
        }
        else if (!this.data[dataType][key]) {
            return false;
        }
        else {
            return this.data[dataType][key];
        }
    }

    getDataType(dataType) {
        if (!this.data[dataType]) {
            return false;
        }
        else {
            return this.data[dataType];
        }
    }

    notify(action, value) {
        const allowedactions = [
            'tagsSelection',
            'showOnMap'
        ];
        if (allowedactions.indexOf(action) > -1) {
            this.observers.forEach(observer => {
                observer(action, value ? value : this.data);
            });
        }
        else {

        }
    }
}

export default new Observable();