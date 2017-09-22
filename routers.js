const mysql = require('mysql');
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
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

module.exports = function(app) {

    // Select all posts
    app.get('/', (req, res) => {
        let sql = `SELECT tag.name  FROM tag;`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
    });
    
    // Select one or more post
    app.get('/Search?', (req, res) => {
        let names = req.query.name;
    if (Array.isArray(names)) {
         var tags = names.map(e => e);
         var parTags = tags.map(e => '?').toString();
    } else {
         tags = [names];
         parTags = '?';
         console.log(tags);
         console.log(parTags);
    }
        let sql = `SELECT *
        FROM tag INNER JOIN ((org INNER JOIN contact ON org.id = contact.org_id) INNER JOIN org_has_tag ON org.id = org_has_tag.org_id) ON tag.id = org_has_tag.tag_id
        WHERE tag.name IN (${parTags});`;
        let query = db.query(sql,tags, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
    });
}