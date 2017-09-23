
//Creat a port for server to listen on
var port = 8080;
//Load in router
var router = require ('./routes/api');
//Load in node modules
var express = require('express');
var bodyParser = require('body-parser');
//Creat an express app
var app = express();

var http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));
app.use('/api', router);
app.get("*", function(request,response){
    var x = router.get('/allTodos')
    response.sendFile(__dirname + '/public/index.html');
});


// Satrt up a server
app.listen(port, function(){
    console.log('listening on ' + port);
});
