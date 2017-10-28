// let observable = function() { // create observable
//     this.data = {} // create data object
//     this.observers = [] //array of funtion 
//     this.observe = function(fn) {   
//       this.observers.push(fn)   // to push function in array function 
//     }                           
//     this.set = function(k,v) { //to add checkBoxs k= id of checkBox v=boolean of chekbox
//       this.data[k] = v; // add checkBox to data array 
//       for (let o of this.observers) { //loop of observers elements array
//         o(k,v) // call every function with id and boolean
//       }
//     }
//     this.values = function() { return Object.values(this.data); }
//     this.get = function(k) { return this.data[k]; }
//   }
  
//   let selectedFilters = new observable(); // creat copy of observer
  
  
//   export default selectedFilters;

  // AIzaSyBsCxb_NaT6Pkv7Xrf5CUk3RWdlDx3Ep3k

  class Observable {
    constructor() {
      this.filter=[];
      this.all = [];
      this.result =[];
      this.observers = [];
      this.ready= false;
      this.selectedListMarker = [];
    }
  
    subscribe(f) {
      this.observers.push(f);
    }
  
    unsubscribe(f) {
      this.observers = this.observers.filter(subscriber => subscriber !== f);
    }
  
    notify(...data) {
      this.observers.forEach(observer => observer(...data));
    }
  }
// console.log(this.observers);
  let Observ = new Observable();
  export default Observ;