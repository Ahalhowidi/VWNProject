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
  res.send(JSON.stringify(req.query)) 
  var que = req.query.tag.map(t => t).join(',')
  sendQuery(que);
})
app.listen(3000)

function sendQuery(que){
  con.query(`SELECT ${que} FROM org;`, (err, res) => {
      if (err) throw err
      // console.log(res[1].name);
      // console.log(res[1].description_company);    
      console.log(res);  
      con.end();  
  })
}

 
  
