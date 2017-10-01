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
router.get('/search', (req, res) => {
    let i;
    const queryResults = {};
    queryPromise('SELECT id, name FROM tag').then(results => {
        queryResults.tag_names = {};
        for (i=0 ; i<results.length ; i++) {
            queryResults.tag_names[results[i].id] = results[i].name;
        }
        return queryPromise('SELECT COUNT(*) AS count FROM org');
    }).then(results => {
        queryResults.all_orgs = results[0].count;
        const tagsArg = !req.query.tag ? queryResults.tag_names.map(tag_name => tag_name.id) :
            (typeof(req.query.tag) === 'string' ? [parseInt(req.query.tag)] :
            req.query.tag.map(tag => parseInt(tag)));
        return queryPromise(`
            SELECT
                org.id, org.name, org.description_company, org.description_person,
                org_has_tag.tag_id
            FROM
                org
            INNER JOIN
                org_has_tag
            ON
                org.id = org_has_tag.org_id
            WHERE
                    org.active = 1
                AND
                    org.approved = 1
                AND
                    org_has_tag.tag_id IN (${'?, '.repeat(tagsArg.length - 1) + '?'})
            ORDER BY
                org.id
        `, tagsArg);
    }).then(results => {
        queryResults.org_results = {};
        if (results.length > 0) {
            for (i=0 ; i<results.length ; i++) {
                queryResults.org_results[results[i].id] = queryResults.org_results[results[i].id] || {
                    name: results[i].name,
                    description_company: results[i].description_company,
                    description_person: results[i].description_person,
                    matching_tags: [],
                    all_tags: [],
                    contacts: []
                };
                queryResults.org_results[results[i].id].matching_tags.push(results[i].tag_id);
            }
        }
        queryResults.matching_orgs = Object.keys(queryResults.org_results).length;
        if (Object.keys(queryResults.org_results).length > 0) {
            return queryPromise(`
                SELECT
                    org_id, tag_id
                FROM
                    org_has_tag
                WHERE
                    org_id IN (${Object.keys(queryResults.org_results).toString()})
                ORDER BY
                    org_id
            `);
        }
    }).then(results => {
        if (results) {
            for (i=0 ; i<results.length ; i++) {
                queryResults.org_results[results[i].org_id].all_tags.push(results[i].tag_id);
            }
            return queryPromise(`
                SELECT
                    org_id, phone, email, web, latitude, longitude, post_code, city, hous_number,
                    extra, id AS contact_id
                FROM
                    contact
                WHERE
                    org_id IN (${Object.keys(queryResults.org_results).toString()})
                ORDER BY
                    org_id
            `);
        }
    }).then(results => {
        if (results) {
            for (i=0 ; i<results.length ; i++) {
                queryResults.org_results[results[i].org_id].contacts.push({
                    id: results[i].contact_id,
                    phone: results[i].phone,
                    email: results[i].email,
                    web: results[i].web,
                    latitude: results[i].latitude,
                    longitude: results[i].longitude,
                    post_code: results[i].post_code,
                    city: results[i].city,
                    hous_number: results[i].hous_number,
                    extension: results[i].extra
                });
            }
        }
        res.json(queryResults);
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