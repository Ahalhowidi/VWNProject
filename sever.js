const express = require('express')
const app = express()

app.get('/search', function (req, res) {

  res.send(JSON.stringify(req.query))
  console.log(req.query.tag[1]);
})

app.listen(3000)

