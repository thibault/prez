var App = App || {};

(function(App, Backbone) {
    "use strict";

    App.Router = Backbone.Router.extend({
        initialize: function() {
            this.cities = new App.Models.CityCollection();
        },
        routes: {
            '': 'home',
            'cities/:city': 'city',
            'cities/:city/hotels/:hotel': 'hotel'
        },
        home: function() {
            var cityCollectionView = new App.Views.CityCollectionView({
                collection: this.cities
            });
        },
        city: function(citySlug) {
            var city = this.cities.get(citySlug);
            city.fetch();

            var cityView = new App.Views.CityDetailView({ model: city });
            cityView.render();
        },
        hotel: function(citySlug, hotelSlug) {
        }
    });
})(App, Backbone);
