var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb.testing.miximum.fr:80/api');


var HostelSchema = new mongoose.Schema({
    _id: { type: String, index: true },
    name: { type: String, required: true },
    description: String,
    comments: [{ body: String, date: { type: Date, default: Date.now }}],
});
exports.Hostel = mongoose.model('Hostel', HostelSchema);


var CitySchema = new mongoose.Schema({
    _id: { type: String, index: true },
    name: { type: String, required: true },
    description: String,
    hostels: [HostelSchema]
});
exports.City = mongoose.model('City', CitySchema);


