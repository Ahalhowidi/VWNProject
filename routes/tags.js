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
router.get('/search/tags', (req, res) => {
    const tags = {};
    new Promise((resolve, reject) => {
        connection.query(`
            SELECT
                id, name
            FROM
                tag
        `, (error, results, fields) => {
            if (error) {
                reject({error});
            }
            else {
                resolve(results);
            }
        });
    }).then(results => {
        res.json(results.map(result => ({
            id: result.id,
            name: result.name
        })));
    }).catch(error => {
        res.status(500).send();
    });
});
module.exports = router;