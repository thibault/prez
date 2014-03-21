var App = App || {};

(function(App, Backbone) {
    "use strict";

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'cities/:city': 'city',
            'cities/:city/hotels/:hotel': 'hotel'
        },
        home: function() {
            var cities = new App.Models.CityCollection();
            var cityCollectionView = new App.Views.CityCollectionView({
                collection: cities
            });
        },
        city: function(city) {
        },
        hotel: function(city, hotel) {
        }
    });
})(App, Backbone);
