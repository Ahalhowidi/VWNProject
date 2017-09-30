const express = require('express');
const mysql = require('mysql');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routers');
const lodash = require('lodash');
const app = express();
// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);