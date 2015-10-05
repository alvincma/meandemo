/**
 * Final Assignment - NBA Divisions/Teams server with Node, Express, AngularJS and MongoDB
 *
 * Author: Chih-Liang Ma
 */

var express = require('express');
var dbhandler = require('./lib/dbhandlers');

mongodb = require('mongodb').MongoClient;
url = 'mongodb://localhost:27017/nba';

var app = express();

// Serve static files from public directory
app.use(express.static(__dirname + '/public'));

// Set up routing
app.get('/divisions', dbhandler.divisionListHandler);
app.get('/divisions/:divisionName', dbhandler.divisionTeamListHandler);

app.listen(3000);
console.log('Server listening on port 3000. Press Ctrl-C to terminate');