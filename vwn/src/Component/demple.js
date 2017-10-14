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
          <input type="checkbox" checked={checked} onChange={() => selectedFilters.set(this.props.id, !checked)} />
      </div>
      );
    }
  });
  
  var Filter = React.createClass({
    render: function() {
      let checkboxes = this.props.possibleFilters.map(tag => <Checkbox key={tag} id={tag} />)
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
    getInitialState: function() {
       return {ready: false}
    },
    
    fetchAllCompanies: function() {
      let results = [
        {company: 'abc', tags: {1:true,2:true,3:true}},
        {company: 'apple', tags: {2:true,3:true}},
        {company: 'hyfZZ', tags: {1:true,2:true}}
      ];
      let possibleFilters = [1,2,3];
      return Promise.resolve({ results, possibleFilters});
    },
    
    componentWillMount: function() {
        this.fetchAllCompanies().then(r => {
        console.log(r);
          this.setState({
            allCompanies: r.results,
            matchingCompanies: r.results,
            possibleFilters: r.possibleFilters,
            ready:true
          })
          
          selectedFilters.observe((k,v) => {
            let matchingCompanies = this.state.allCompanies.filter(e => {
              let tags = Object.keys(e.tags);
              for (let tag of tags) {
                if (selectedFilters.get(tag))
                  return true
              }
              return false
            })
            this.setState({
              matchingCompanies: matchingCompanies.length === 0 ? this.state.allCompanies : matchingCompanies
              
            })
          })
        })
        
    },
  
    render: function() {
      if (!this.state.ready) return <h1>loading...</h1>;
      
  
      let renderCompanies = this.state.matchingCompanies.map((e,i) => <Company company={e} key={i} />);
      
      return (
        <div className="container">
          {renderCompanies}
          
          <hr />
          
          <Filter possibleFilters={this.state.possibleFilters} />
        </div>
                              
      );
    }
    
  });
  
  ReactDOM.render(<App/>, document.getElementById('app'));