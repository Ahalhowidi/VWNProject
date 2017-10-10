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
const queryPromise = (queryBody) => {
    return new Promise((resolve, reject) => {
        connection.query(queryBody, (error, results, fields) => {
            if (error) {
                reject({error});
            }
            else {
                resolve(results);
            }
        });
    });
}
router.get('/search', (req, res) => {
    const tags = {};
    const orgs = {};
    queryPromise(`
        SELECT
            id, name
        FROM
            tag
    `).then(results => {
        results.forEach(function(result) {
            tags[result.id] = result.name;
        });
        return queryPromise(`
            SELECT
                id, name, description_company, description_person
            FROM
                org
            WHERE
                    active = 1
                AND
                    approved = 1
        `);
    }).then(results => {
        results.forEach(function(result) {
            orgs[result.id] = {
                name: result.name,
                description_company: result.description_company,
                description_person: result.description_person,
                tags: [],
                contacts: []
            };
        });
        return queryPromise(`
            SELECT
                org_id, tag_id
            FROM
                    org_has_tag
                INNER JOIN
                    org
            ON
                org_id = id
            WHERE
                    approved = 1
                AND
                    active = 1
        `);
    }).then(results => {
        results.forEach(function(result) {
            orgs[result.org_id].tags.push(result.tag_id);
        });
        return queryPromise(`
            SELECT
                org_id, phone, email, web, latitude, longitude, post_code, city, house_number,
                extension, contact.id AS contact_id
            FROM
                    contact
                INNER JOIN
                    org
            ON
                org_id = org.id
            WHERE
                    approved = 1
                AND
                    active = 1
        `);
    }).then(results => {
        results.forEach(function(result) {
            orgs[result.org_id].contacts.push({
                id: result.contact_id,
                phone: result.phone,
                email: result.email,
                web: result.web,
                latitude: result.latitude,
                longitude: result.longitude,
                post_code: result.post_code,
                city: result.city,
                house_number: result.house_number,
                extension: result.extension
            });
        });
        res.json({tags, orgs});
    }).catch(error => {
        res.status(500).send();
    });
});
module.exports = router;