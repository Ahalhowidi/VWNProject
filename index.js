const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(require('./routes/search'));

const server = app.listen(8080, function() {
    console.log('Listening on port 8080');
});