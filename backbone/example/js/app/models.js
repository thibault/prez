(function(exports, CONFIG, Backbone) {
    "use strict";

    exports.Models = {};

    Models.City = Backbone.Model.extend({
        idAttribute: '_id'
    });

    Models.CityCollection = Backbone.Collection.extend({
        model: Models.City,
        url: CONFIG.API_ROOT,
    });
})(this, CONFIG, Backbone);
