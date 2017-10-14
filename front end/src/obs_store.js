var observable = function() {
    this.data = {}
    
    this.subscribers = [];
    
    this.subscribe = (fn) => {
        this.subscribers.push(fn);
    }
    
    this.put = (k,v) => {
        this.data[k] = v;
        for (let subscriber of this.subscribers) {
            subscriber(k,v);
        }
    }
    this.get = (k) => {
        return this.data[k]
    }
    this.values = function() { return Object.values(this.data); }
}

let selectedFilters = new observable();
let selectedOrg = new observable();
let selectedcoords = new observable();

export {
    observable,selectedFilters,selectedOrg,selectedcoords
    
}