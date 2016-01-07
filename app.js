var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
require('./routes/routes')(app);

app.listen(3000);


/*

 ## =======================
 ## Create a Company
 ## =======================
 curl -X POST http://127.0.0.1:3000/api/company/create -H "Content-Type: application/json" -d '{"name":"innotech","street":"4 Yawkey Way","city":"Boston","state":"MA","zip":"02215","phone":"(503) 227 5501", "website":"www.innotech.com"}' | python -mjson.tool

 ## =======================
 ## Find a Company
 ## =======================
 curl -X GET http://127.0.0.1:3000/api/company/findOne/innotech | python -mjson.tool


 */