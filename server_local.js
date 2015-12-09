var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
console.log("requireMongoose: " + mongoose);
mongoose.connect('mongodb://localhost/cs5610Project');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var ipaddress 	= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port 		= process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/project/server/app.js")(app,db,mongoose);
//require("./public/assignment/server/services/user.service.js")(app);
//require("./public/assignment/server/services/form.service.js")(app);
//require("./public/assignment/server/services/field.service.js")(app);

app.listen(port, ipaddress);