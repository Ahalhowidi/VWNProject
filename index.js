const mysql = require('mysql');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
const router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "George",
  password: "test",
  database:"vwn"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get('/', (req, res)=>{
  con.query('select id,name from tag', (err,row) =>{
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
  new Promise((resolve, reject)=>{
     con.query(` SELECT
                org.id, org.name, org.description_company, org.description_person,
                org_has_tag.tag_id
              FROM
                org
              INNER JOIN
                org_has_tag
              ON
                org.id = org_has_tag.org_id
              WHERE
                    org.active = 1
                AND
                    org.approved = 1
                AND
                    org_has_tag.tag_id IN (${'?,'.repeat(que.length-1)+'?'})
              ORDER BY
                org.name     
              `,que,(err, row) => {
    if (err) {
        reject(err);     
      }else{    
        resolve(row);
      }       
    });
  }).then((row)=>{  
    res.send(row);
  }).catch((err)=>{
    res.send(err)
  })
});

app.use('/', router);
app.listen(8080, () => 
  console.log('App is listening to port 8080')
);

 
  
