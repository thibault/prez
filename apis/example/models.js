var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb.testing.miximum.fr/api');

// Define cities

var CitySchema = new mongoose.Schema({
    slug: { type: String, index: true },
    name: String,
    description: String
});
exports.City = mongoose.model('City', CitySchema);


// Define hotels

var HotelSchema = new mongoose.Schema({
    slug: { type: String, index: true },
    name: String,
    description: String
});
exports.Hotel = mongoose.model('Hotel', HotelSchema);
