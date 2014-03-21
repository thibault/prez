var models = require('./models.js');


exports.methodNotAllowed = function(req, res) {
    res.send(405, 'Method not allowed');
};

exports.getAllCities = function(req, res) {
    models.City.find(null, 'name description', function(err, cities) {
        cities = cities.map(function(city) {
            city = city.toJSON();
            city.url = '/' + city._id;
            return city;
        });
        res.send(cities);
    });
};

exports.getCity = function(req, res) {
    var slug = req.params.city;
    models.City.findById(slug, 'name description hostels', function(err, city) {
        if (city === null) {
            res.send(404, 'Not found');
        } else {
            city = city.toJSON();
            city.url = '/' + city._id;
            city.hostels = city.hostels.map(function(hostel) {
                hostel.url = city.url + '/' + hostel._id;
                return hostel;
            });
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

exports.getHostel = function(req, res) {
    var slug = req.params.city;
    var hostelSlug = req.params.hostel;

    models.City.findById(slug, function(err, city) {
        if (city === null) {
            res.send(404, 'City not found');
        }

        var hostel = city.hostels.id(hostelSlug);
        if (hostel === null) {
            res.send(404, 'Hostel not found');
        } else {
            res.send(200, hostel);
        }
    });
};

exports.setHostel = function(req, res) {
    var slug = req.params.city;
    var hostelSlug = req.params.hostel;

    models.City.findById(slug, function(err, city) {
        if (city === null) {
            res.send(404, 'Not found');
        } else {
            var hostel = city.hostels.id(hostelSlug);
            var statusCode;

            if (hostel === null) {
                hostel = new models.Hostel(req.body);
                hostel._id = hostelSlug;
                city.hostels.push(hostel);
                statusCode = 201;
            } else {
                hostel.name = req.body.name;
                hostel.description = req.body.description;
                statusCode = 200;
            }

            city.save();
            res.send(statusCode, hostel);
        }
    });
};

exports.deleteHostel = function(req, res) {
    var slug = req.params.city;
    var hostelSlug = req.params.hostel;

    models.City.findById(slug, function(err, city) {
        if (city === null) {
            res.send(404, 'City not found');
        } else {
            var hostel = city.hostels.id(hostelSlug);

            if (hostel === null) {
                res.send(404, 'Hostel not found');
            } else {
                hostel.remove();
                city.save();
                res.send(200);
            }
        }
    });
};

exports.createComment = function(req, res) {
    var slug = req.params.city;
    var hostelSlug = req.params.hostel;

    if (!req.body.hasOwnProperty('body')) {
        res.send(400, 'The "body" parameter is required');
    }

    models.City.findById(slug, function(err, city) {
        if (city === null) {
            res.send(404, 'City not found');
        } else {
            var hostel = city.hostels.id(hostelSlug);
            if (hostel === null) {
                res.send(404, 'Hostel not found');
            } else {
                var comment = { body: req.body.body };
                hostel.comments.push(comment);
                city.save();

                res.send(201, comment);
            }
        }
    });
};
