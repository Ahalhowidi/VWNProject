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
  con.query(`SELECT ${que} FROM org;`, (err, row) => {
    if (err) {
      throw err
      }else{  
        console.log(row);
        res.send(row);
      }  
      // con.end();
    });
});
app.listen(3000, () =>
  console.log('App is listening to port 3000')
);

 
  
