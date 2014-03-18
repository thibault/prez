var express = require('express');
var models = require('./models.js');
var routes = require('./routes.js');

var app = express();
app.use(express.bodyParser());

// List of cities ressource
app.get('/', routes.getAllCities);
app.put('/', routes.methodNotAllowed);
app.post('/', routes.methodNotAllowed);
app.delete('/', routes.methodNotAllowed);

// City ressource
app.get('/:city', routes.getCity);
app.put('/:city', routes.setCity);
app.delete('/:city', routes.deleteCity);
app.post('/:city', routes.methodNotAllowed);

// Hotel ressource
app.get('/:city/:hotel', routes.getHotel);

app.listen(3000);
console.log('Listening on port 3000');
