let results = [
    {company: 'abc', tags: {1:true,2:true,3:true}},
    {company: 'apple', tags: {2:true,3:true}},
    {company: 'hyf', tags: {1:true,2:true}}
];
let possibleFilters = [1,2,3];
let observable = function() {
    this.data = {}
    this.observers = []
    this.observe = function(fn) {
      this.observers.push(fn)
    }
    this.set = function(k,v) {
      this.data[k] = v;
      for (let o of this.observers) {
        o(k,v)
      }
    }
    this.values = function() { return Object.values(this.data); }
    this.get = function(k) { return this.data[k]; }
}
  
let selectedFilters = new observable();

var Checkbox = React.createClass({
    render: function() {
      let checked = selectedFilters.get(this.props.id)
      return (
      <div>
          {this.props.id} - {checked ? 'checked' : ''}
          <input type="checkbox" checked={checked} onChange={() => {
            console.log(selectedFilters.observers);
              selectedFilters.set(this.props.id, !checked);
            }} />
      </div>
      );
    }
});
  
var Filter = React.createClass({
    render: function() {
      let checkboxes = possibleFilters.map(tag => <Checkbox key={tag} id={tag} />)
      return (<div>{checkboxes}</div>);
    }
});
  
var Company = React.createClass({
    render: function() {
      return (
      <div>
        <pre>
          {JSON.stringify(this.props, null, 2)}
          </pre>
      </div>
      );
    }
});
  
var App = React.createClass({
    componentDidMount: function() {
        selectedFilters.observe((k,v) => {
            // k,v do not matter, we just care about the new selection anyway, 
            // which is recomputed on render(),
            // so just force render
            this.forceUpdate();
        })
    },
  
    render: function() {
      let matchingCompanies = results;
      if (selectedFilters.values().filter(Boolean).length !== 0) {
          matchingCompanies = results.filter(e => {
            let tags = Object.keys(e.tags);
            for (let tag of tags) {
              if (selectedFilters.get(tag))
                return true
            }
            return false
          })
      }
      let renderCompanies = matchingCompanies.map((e,i) => <Company company={e} key={i} />);
      
      return (
        <div className="container">
          {renderCompanies}
          <br />
          <hr />
          <br />
          <Filter />
        </div>
                              
      );
    }
    
  });
  
  ReactDOM.render(<App/>, document.getElementById('app'));