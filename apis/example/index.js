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
app.post('/:city', routes.methodNotAllowed);
app.delete('/:city', routes.deleteCity);

// Hotel ressource
app.get('/:city/:hotel', routes.getHotel);
app.put('/:city/:hotel', routes.setHotel);
app.post('/:city/:hotel', routes.methodNotAllowed);
app.delete('/:city/:hotel', routes.methodNotAllowed);

app.listen(3000);
console.log('Listening on port 3000');
