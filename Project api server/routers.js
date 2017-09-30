const mysql = require('mysql');
const _ = require('lodash');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config-secret.json"));
// DB Setup
// Create connection
const db = mysql.createConnection({
    host: config.host,
	user: config.user,
	password: config.password,
	port: config.port,
    database: config.database
})
// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});  
function promiseQuery(sql, arg) {
    return new Promise((resolve, reject) => {
        function doQuery(err, results, fields) {
            if (err) {
                reject({err});
            }
            else {
                resolve(results);
            }
        }
        db.query(sql, arg ? arg : doQuery, arg ? doQuery : null);
    })
}

module.exports = app => {

    // Select all posts
    app.get('/', (req, res) => {
        //let someRows, otherRows;
        promiseQuery('SELECT id,name  FROM tag')
        .then( (rows) => {
            res.send(JSON.stringify(rows));
        }).catch( err => {
            // handle the error
            res.status(500).send('<h1>Internal Server Error</h1>');
            console.log(err);
        })
    })
    // Select one or more post
    let allDb = {}, orgDb = {};
    app.get('/Search', (req, res) => {
        let inpIdTags =
        Array.isArray(req.query.tag) ? req.query.tag.map(tag => parseInt(tag)) : [parseInt(req.query.tag)];
        let parTags = inpIdTags.map(tag => '?').toString(); 
        //console.log(inpIdTags);
        let sql1 = `SELECT id As tagId, name As tagName
        FROM tag INNER JOIN org_has_tag ON tag.id = org_has_tag.tag_id
        WHERE tag.id IN (${parTags})`;
        let sql2 = `SELECT id As tagId, name As tagName FROM tag `;
        promiseQuery(req.query.tag == undefined ? sql2 : sql1, inpIdTags).then (rows => {
           return _.mapKeys(rows,'tagId');
            }).then ((rows) => {
                allDb=rows;
                }).then (() => {
                return promiseQuery(`SELECT * 
                FROM org INNER JOIN org_has_tag ON org.id = org_has_tag.org_id 
                where org.active = 1 AND org.approved = 1
                AND org_has_tag.tag_id IN(${Object.keys(allDb).map(Number).filter(Number)}) `)
            }).then (rows => {
                return _.mapKeys(rows,'org_id');
            }).then ((rows) => {
                orgDb=rows;
                allDb.orgs_cuont_Isideof_tag = Object.keys(rows).length;
            }).then (() => {
                return promiseQuery(`SELECT COUNT(*) AS count FROM org `)
            }).then ((rows) => {
                allDb.orgs_full_cuont = rows[0].count;
                allDb.results_Of_orgs = orgDb;
               // orgDb.tagooooooo_id==orgDb.tag_id;
            }).then (() => {
                return promiseQuery(`SELECT tag_id,org_id
                FROM org_has_tag INNER JOIN org ON org.id = org_has_tag.org_id`)
            }).then ((rows) => {
                for (let prop in orgDb) {
                     orgDb[prop].all_Tags=[]
                     orgDb[prop].matching_Tags = orgDb[prop].tag_id;
                    for (let i=0 ; i < rows.length ; i++) {

                        if (rows[i].org_id == orgDb[prop].org_id) {
                            orgDb[prop].all_Tags.push(rows[i].tag_id);
                        }
                    }
                };
            }).then (() => {
                return promiseQuery(` SELECT
                org_id, phone, email, web, latitude, longitude, post_code, city, hous_number,
                extra, id AS contact_id
            FROM
                contact
            WHERE
                org_id IN (${Object.keys(orgDb).map(Number).filter(Number)})
            ORDER BY
                org_id`)
            }).then ((rows) => {

                for (let prop in orgDb) {
                     orgDb[prop].contacts = [];
                    for (let i=0 ; i < rows.length ; i++) {

                        if (rows[i].org_id == orgDb[prop].org_id) {
                            orgDb[prop].contacts.push(rows[i]);
                        }
                    }
                }; 
                res.send(JSON.stringify(allDb));
               // res.send(allDb);
            }).catch( err => {
            // handle the error
                res.status(500).send('<h2>Internal Server Error</h2>');
                console.log(err);
        });
    });
}