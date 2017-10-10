import React from "react";

const Company = (props) => {
    
    return (
      <div>
        <pre>
          {JSON.stringify(props, null, 2)}
          </pre>
      </div>
      );
};
export default Company;