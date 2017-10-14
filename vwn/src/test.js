let results = [
    {company: 'abc', tags: {1:true,2:true,3:true}},
    {company: 'apple', tags: {2:true,3:true}},
    {company: 'hyf', tags: {1:true,2:true}}
  ];
  
  var Checkbox = React.createClass({
    render: function() {
      let checked = this.props.checked
      return (
      <div>
          {this.props.id} - {checked ? 'checked' : ''}
          <input type="checkbox" checked={checked} onChange={() => this.props.onChange(this.props.id)} />
      </div>
      );
    }
  });
  
  var Filter = React.createClass({
     
    render: function() {
      let checkboxes = Object.keys(this.props.selectedFilters)
                         .map(tag => {
                            return <Checkbox key={tag} onChange={this.props.onChange} checked={this.props.selectedFilters[tag]} id={tag} />
                        })
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
     return {
      selectedFilters: {
        1: false,
        2: false,
        3: false
      }
     }
    },
    render: function() {
      let matchingCompanies = results;
     
      if (Object.values(this.state.selectedFilters).filter(Boolean).length !== 0) {
          matchingCompanies = results.filter(e => {
            let tags = Object.keys(e.tags);
            for (let tag of tags) {
              if (this.state.selectedFilters[tag])
               
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
          <Filter selectedFilters={this.state.selectedFilters} 
                  onChange={(id) => {
                    let f = Object.assign({},this.state.selectedFilters)
                    f[id] = !f[id];
                    this.setState({selectedFilters: f})
            }}/>
        </div>
                              
      );
    }
    
  });
  
  ReactDOM.render(<App/>, document.getElementById('app'));