const mysql = require('mysql');
const express = require('express');

const app = express();
const router = express.Router();

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

router.get('/', (req, res)=>{
  con.query('select name from tag', (err,row) =>{
    res.send(row)
  })
})

router.get('/search', function (req, res) {
  var que;
  
  if (req.query.tag.length > 0){
    que = req.query.tag;
  }else{
    que = req.query.tag.map(x => x).join(',');
  }
  con.query(`SELECT ?? FROM org`,[que],(err, row) => {
    if (err) {
      throw err
      }else{  
        console.log(row);
        res.send(row);
      }  
      // con.end();
    });
});
app.use('/', router);

app.listen(3000, () =>
  console.log('App is listening to port 3000')
);

 
  
