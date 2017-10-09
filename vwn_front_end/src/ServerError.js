import React from 'react';

const ServerError = ({adminEmail}) => {
    return <div>
        <h1>Internal Server Error</h1>
        <p>
            The server encountered an internal error
            or misconfiguration and was unable to complete your request.
        </p>
        <p>
            Please contact the server administrator at
            : <a href = {`mailto:${adminEmail}`}>{adminEmail}</a> ,
            to inform them of the time this error occured,
            and the actions you performed just before this error.
        </p>
    </div>;
};

export default ServerError;