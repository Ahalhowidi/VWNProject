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
                reject(error);
            }
            else {
                resolve(results);
            }
        }
        connection.query(queryBody, tagsArg ? tagsArg : handleQuery, tagsArg ? handleQuery : null);
    });
}
router.get('/search', (req, res) => {
    let i, j, k, orgIds;
    const queryResults = {};
    queryPromise('SELECT id, name FROM tag').then(results => {
        queryResults.tag_names = results.map(result => {
            return {
                id: result.id,
                name: result.name
            };
        });
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
        const orgsArray = [];
        if (results.length > 0) {
            for (i=0 ; i<results.length ; i++) {
                if (i > 0 && results[i].id === orgsArray[orgsArray.length - 1].id) {
                    orgsArray[orgsArray.length - 1].matching_tags.push(results[i].tag_id);
                }
                else {
                    orgsArray.push({
                        id: results[i].id,
                        name: results[i].name,
                        description_company: results[i].description_company,
                        description_person: results[i].description_person,
                        matching_tags: [results[i].tag_id],
                        all_tags: [],
                        contacts: []
                    });
                }
            }
        }
        queryResults.matching_orgs = orgsArray.length;
        queryResults.org_results = orgsArray;
        orgIds = orgsArray.map(org => org.id).toString();
        if (orgIds.length > 0) {
            return queryPromise(`
                SELECT
                    org_id, tag_id
                FROM
                    org_has_tag
                WHERE
                    org_id IN (${orgIds})
                ORDER BY
                    org_id
            `);
        }
    }).then(results => {
        if (results) {
            k = 0;
            for (i=0 ; i<results.length ; i++) {
                for (j=k ; j<queryResults.org_results.length ; j++) {
                    if (results[i].org_id === queryResults.org_results[j].id) {
                        queryResults.org_results[j].all_tags.push(results[i].tag_id);
                        k = j;
                        break;
                    }
                }
            }
            return queryPromise(`
                SELECT
                    org_id, phone, email, web, latitude, longitude, post_code, city, hous_number,
                    extra, id AS contact_id
                FROM
                    contact
                WHERE
                    org_id IN (${orgIds})
                ORDER BY
                    org_id
            `);
        }
    }).then(results => {
        if (results) {
            k = 0;
            for (i=0 ; i<results.length ; i++) {
                for (j=k ; j<queryResults.org_results.length ; j++) {
                    if (results[i].org_id === queryResults.org_results[j].id) {
                        queryResults.org_results[j].contacts.push({
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
                        k = j;
                        break;
                    }
                }
            }
        }
        res.json(queryResults);
    }).catch(error => {
        //console.log(error);
        //throw(error);
    });
});
module.exports = router;