const express = require('express');
const app = express();

app.use(require('./routes/search'));

const server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});