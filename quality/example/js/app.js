(function(exports) {
    "use strict";

    var allHotels = exports.allHotels = [];

    var form = document.getElementById('hotel-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var inputName = document.getElementById('hotel-name');
        var inputPrice = document.getElementById('hotel-price');

        var hotel = new Hotel(inputName.value, inputPrice.value);
        allHotels.push(hotel);
    });
})(this);
