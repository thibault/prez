var models = require('./models.js');


exports.methodNotAllowed = function(req, res) {
    res.send(405, 'Method not allowed');
};

exports.getAllCities = function(req, res) {
    console.log('GET received on /');
    models.City.find(function(err, cities) {
        console.log(cities);
        res.json(cities);
    });
};

exports.getCity = function(req, res) {
    var slug = req.params.city;
    models.City.findOne({'slug': slug}, function(err, city) {
        if (err !== null || city === null) {
            res.send(404, 'Not found');
        } else {
            res.json(city);
        }
    });
};

exports.setCity = function(req, res) {
    var slug = req.params.city;
    models.City.findOne({'slug': slug}, function(err, city) {
        if (err) {
            res.send(500, 'Server error');
        }

        if(city === null) {
            // Creating the document
            city = new models.City(req.body);
            city.slug = slug;
            city.save();
            res.send(201, city);
        } else {
            city.name = req.body.name;
            city.description = req.body.description;
            city.save();
            res.send(200, city);
        }
    });
};

exports.deleteCity = function(req, res) {
    var slug = req.params.city;
    models.City.findOne({'slug': slug}, function(err, city) {
        if (city !== null) {
            city.remove();
            res.send(200);
        } else {
            res.send(404);
        }
    });
};

exports.getHotel = function(req, res) {
};
