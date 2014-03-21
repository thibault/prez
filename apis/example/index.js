var express = require('express');
var models = require('./models.js');
var routes = require('./routes.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);

// List of cities ressource
app.get('/', routes.getAllCities);
app.put('/', routes.methodNotAllowed);
app.post('/', routes.methodNotAllowed);
app.delete('/', routes.methodNotAllowed);

// City ressource
app.get('/:city', routes.getCity);
app.put('/:city', routes.setCity);
app.post('/:city', routes.methodNotAllowed);
app.delete('/:city', routes.deleteCity);

// Hostel ressource
app.get('/:city/:hostel', routes.getHostel);
app.put('/:city/:hostel', routes.setHostel);
app.post('/:city/:hostel', routes.createComment);
app.delete('/:city/:hostel', routes.deleteHostel);

app.listen(3000);
console.log('Listening on port 3000');
