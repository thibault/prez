(function(exports) {
    "use strict";

    var DEFAULT_PRICE = 25;
    var CHEAP_LIMIT = 15;
    var MIN_PRICE = 10;

    var Hotel = exports.Hotel = function Hotel(name, price) {
        this.name = name;

        if (price <= MIN_PRICE) {
            console.warn('Please check if price is correct');
        }

        if (isNaN(price)) {
            console.error('Price must be a number');
        }

        this.price = ((price === undefined) ? DEFAULT_PRICE : price);

        console.log('New hotel created: ' + name);
    };

    Hotel.prototype.isCheap = function() {
        return this.price <= CHEAP_LIMIT;
    };

})(this);
