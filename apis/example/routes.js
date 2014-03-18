var models = require('./models.js');


exports.methodNotAllowed = function(req, res) {
    res.send(405, 'Method not allowed');
};

exports.getAllCities = function(req, res) {
    models.City.find(function(err, cities) {
        res.json(cities);
    });
};

exports.getCity = function(req, res) {
    var slug = req.params.city;
    models.City.findById(slug, function(err, city) {
        if (city === null) {
            res.send(404, 'Not found');
        } else {
            res.send(200, city);
        }
    });
};

exports.setCity = function(req, res) {
    if (!req.body.hasOwnProperty('name')) {
        res.send(400, 'The "name" parameter is required');
    }

    var slug = req.params.city;
    models.City.findById(slug, function(err, city) {
        if (err) {
            res.send(500, err);
        }

        var statusCode;
        if(city === null) {
            statusCode = 201; // created
            city = new models.City(req.body);
            city._id = slug;
        } else {
            statusCode = 200; // OK
            city.name = req.body.name;
            city.description = req.body.description;
        }

        city.save(function(err) {
            if (err) {
                res.send(500, err);
            }
            else {
                res.send(statusCode, city);
            }
        });
    });
};

exports.deleteCity = function(req, res) {
    var slug = req.params.city;
    models.City.findById(slug, function(err, city) {
        if (city !== null) {
            city.remove();
            res.send(200);
        } else {
            res.send(404);
        }
    });
};

exports.getHotel = function(req, res) {
    var slug = req.params.city;
    var hotelSlug = req.params.hotel;

    models.City.findById(slug, function(err, city) {
        if (city === null) {
            res.send(404, 'City not found');
        }

        var hotel = city.hotels.id(hotelSlug);
        if (hotel === null) {
            res.send(404, 'Hotel not found');
        } else {
            res.send(200, hotel);
        }
    });
};

exports.setHotel = function(req, res) {
    var slug = req.params.city;
    var hotelSlug = req.params.hotel;

    models.City.findById(slug, function(err, city) {
        if (city === null) {
            res.send(404, 'Not found');
        } else {
            var hotel = city.hotels.id(hotelSlug);
            var statusCode;

            if (hotel === null) {
                hotel = new models.Hotel(req.body);
                hotel._id = hotelSlug;
                city.hotels.push(hotel);
                statusCode = 201;
            } else {
                hotel.name = req.body.name;
                hotel.description = req.body.description;
                statusCode = 200;
            }

            city.save();
            res.send(statusCode, hotel);
        }
    });
};
