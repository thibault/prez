var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb.testing.miximum.fr/api');


var HotelSchema = new mongoose.Schema({
    _id: { type: String, index: true },
    name: { type: String, required: true },
    description: String,
    comments: [{ body: String, date: { type: Date, default: Date.now }}],
});
exports.Hotel = mongoose.model('Hotel', HotelSchema);


var CitySchema = new mongoose.Schema({
    _id: { type: String, index: true },
    name: { type: String, required: true },
    description: String,
    hotels: [HotelSchema]
});
exports.City = mongoose.model('City', CitySchema);


