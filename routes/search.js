const fs = require('fs');
const mysql = require('mysql');
const express = require('express');

let i, j, isNotExist, newContact;
const router = express.Router();
const config = JSON.parse(fs.readFileSync("config-secret.json"))
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});
connection.connect();
function tagsNamesQuery(res, orgsArray) {
    connection.query("select id, name from tag", function (error, results, fields) {
        if (error) {
            console.error(error);
        }
        else {
            let tagsArray = [];
            if (results.length > 0) {
                tagsArray = results.map(function(result) {
                    return {
                        id: result.id,
                        name: result.name
                    };
                });
            }
            res.json({
                tags: tagsArray,
                results: {
                    orgs_quantity: orgsArray.length,
                    orgs: orgsArray
                }
            });
        }
    });
}
router.get('/search', function(req, res) {
    if (!req.query.tag) {
        tagsNamesQuery(res, []);
    }
    else {
        let searchTags = req.query.tag;
        if (typeof(searchTags) === 'string') {
            searchTags = [searchTags];
        }
        let queryTags = '';
        for (i=0 ; i<searchTags.length ; i++) {
            queryTags += 'org_has_tag.tag_id = ?';
            if (i < searchTags.length - 1) {
                queryTags += ' or ';
            }
        }
        connection.query(`
            select
                org.id, org.name, org.description_company, org.description_person,
                contact.id as contact_id, contact.post_code, contact.city,
                contact.hous_number, contact.extra, contact.latitude,
                contact.longitude, contact.phone, contact.email, contact.web,
                org_has_tag.tag_id
            from
                org
            inner join
                contact
            on
                org.id = contact.org_id
            inner join
                org_has_tag
            on
                org.id = org_has_tag.org_id
            where
                org.active = 1
            and
                org.approved = 1
            and
                ( ${queryTags} )
            order by
                org.id
        `, searchTags, function(error, results, fields) {
            if (error) {
                console.error(error);
            }
            else {
                const orgsArray = [];
                if (results.length > 0) {
                    for (i=0 ; i<results.length ; i++)  {
                        newContact = {
                            id: results[i].contact_id,
                            post_code: results[i].post_code,
                            city: results[i].city,
                            hous_number: results[i].hous_number,
                            extension: results[i].extra,
                            latitude: results[i].latitude,
                            longitude: results[i].longitude,
                            phone: results[i].phone,
                            email: results[i].email,
                            web: results[i].web
                        };
                        if (i > 0 && results[i].id === orgsArray[orgsArray.length - 1].id) {
                            isNotExist = true;
                            for (j=0 ; j<orgsArray[orgsArray.length - 1].tag.length ; j++) {
                                if (results[i].tag_id === orgsArray[orgsArray.length - 1].tag[j]) {
                                    isNotExist = false;
                                    break;
                                }
                            }
                            if (isNotExist) {
                                orgsArray[orgsArray.length - 1].tag.push(results[i].tag_id);
                            }
                            isNotExist = true;
                            for (j=0 ; j<orgsArray[orgsArray.length - 1].contact.length ; j++) {
                                if (results[i].contact_id ===
                                    orgsArray[orgsArray.length - 1].contact[j].id) {
                                        isNotExist = false;
                                        break;
                                }
                            }
                            if (isNotExist) {
                                orgsArray[orgsArray.length - 1].contact.push(newContact);
                            }
                        }
                        else {
                            orgsArray.push({
                                id: results[i].id,
                                name: results[i].name,
                                description_company: results[i].description_company,
                                description_person: results[i].description_person,
                                contact: [newContact],
                                tag: [results[i].tag_id]
                            });
                        }

                    }
                }
                tagsNamesQuery(res, orgsArray);
            }
        });
    }
});

module.exports = router;