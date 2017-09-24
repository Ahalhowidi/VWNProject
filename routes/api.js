var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var config = JSON.parse(fs.readFileSync('config-secret.json'));
//const connection =  mysql.connect('mssql://hameed:BerlinSkater20@localhost/hameed')
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database
});

router.get('/getByTags/:tags', function(request, response) {
    const tagsId = (request.params.tags).split(',')
    const tags = tagsId.shift()
    const tagId = tagsId.filter(Boolean)
    connection.query(
        `select org.name , org.description_company, contact.web , contact.email, contact.city, contact.post_code from org_has_tag 
	INNER join org on  org_has_tag.org_id = org.id
	INNER join tag on  org_has_tag.tag_id = tag.id
	INNER join contact on  contact.org_id = org.id
WHERE org_has_tag.tag_id IN (${tagId})
group by org.id`,
         function (error, results, fields) {
    return response.status(200).json(results)
    });


});

router.get('/getPrByTags/:tags', function(request, response) {
    const tagsId = (request.params.tags).split(',')
    const tags = tagsId.shift()
    const tagId = tagsId.filter(Boolean)

    connection.query(
        `select org.name , org.description_person, contact.web , contact.email, contact.post_code , contact.city from org_has_tag 
	INNER join org on  org_has_tag.org_id = org.id
	INNER join tag on  org_has_tag.tag_id = tag.id
	INNER join contact on  contact.org_id = org.id
WHERE org_has_tag.tag_id IN (${tagId})
group by org.id`,
        function (error, results, fields) {
            return response.status(200).json(results)
        });


});
router.get('/allTags', function(request, response) {

    connection.query(
        `select * from tag`,
         function (error, results, fields) {
    return response.status(200).json(results)
    });
});


module.exports = router;
