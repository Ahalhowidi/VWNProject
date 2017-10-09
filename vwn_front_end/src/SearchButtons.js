import React from 'react';

import {Link} from 'react-router-dom';

const SearchButtons = ({tags}) => {
    return <div>
        <Link to={`/results`}><button>Newcomers</button></Link>
    </div>;
};

export default SearchButtons;