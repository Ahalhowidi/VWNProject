const fs = require('fs');
const mysql = require('mysql');
const express = require('express');

const router = express.Router();
const config = JSON.parse(fs.readFileSync('config-secret.json'))
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});
connection.connect();
function queryPromise(queryBody, tagsArg) {
    return new Promise((resolve, reject) => {
        function handleQuery(error, results, fields) {
            if (error) {
                reject({error});
            }
            else {
                resolve(results);
            }
        }
        connection.query(queryBody, tagsArg ? tagsArg : handleQuery, tagsArg ? handleQuery : null);
    });
}
router.get('/tags', (req, res) => {
    queryPromise('SELECT id, name FROM tag').then(results => {
        const tag_names = {};
        for (i=0 ; i<results.length ; i++) {
            tag_names[results[i].id] = results[i].name;
        }
        res.json({tag_names });
    }).catch(error => {
        res.status(500).send(`
            <h1>Internal Server Error</h1>
            <p>
                The server encountered an internal error
                or misconfiguration and was unable to complete your request.
            </p>
            <p>
                Please contact the server administrator at
                <a href="mailto:admin@example.com">admin@example.com</a>
                to inform them of the time this error occured,
                and the actions you performed just before this error.
            </p>
        `);
        error = error.error;
        console.log('\nError!');
        console.error(error.sqlMessage);
        console.log('\nTrying to save the error details in the error log.....');
        return queryPromise(`
            INSERT INTO
                error (y_code, y_number, message, state, y_sql)
            VALUES
                (?, ?, ?, ?, ?)
        `, [error.code, error.errno, error.sqlMessage, error.sqlState, error.sql]);
    }).then(results => {
        console.log('\nThe error details were saved successfully:');
        console.log(results);
    }).catch(error => {
        console.log('\nError! The error details were not saved.');
        console.error(error.error.sqlMessage);
    });
});
module.exports = router;