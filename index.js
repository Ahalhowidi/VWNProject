var mysql = require('mysql');
var express = require('express');

var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "George",
  password: "test",
  database:"mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/search', function (req, res) {
  var que;
  console.log(req.query.tag);
  if (req.query.tag.length > 0){
    que = req.query.tag;
  }else{
    que = req.query.tag.map(x => x).join(',');
  }
  con.query(`SELECT ${que} FROM org;`, (err, res) => {
    if (err) {
      throw err
      }else{  
        console.log(res);
      }  
      // con.end();
    });
  res.send(JSON.stringify(req.query));
});
app.listen(3000);

 
  
