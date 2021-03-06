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
            'cities/:city/hostels/:hostel': 'hotel'
        },
        home: function() {
            var cityCollectionView = new App.Views.CityCollectionView({
                collection: this.cities
            });
        },
        city: function(citySlug) {
            var city = this.cities.get(citySlug);
            var cityView = new App.Views.CityDetailView({ model: city });

            var renderCity = _.bind(cityView.render, cityView);
            city.fetch({ complete: renderCity });
        },
        hotel: function(citySlug, hostelSlug) {
            var hostel = new App.Models.Hostel({ _id: hostelSlug });
            hostel.urlRoot = App.Config.API_ROOT + citySlug + '/';

            var hostelView = new App.Views.HostelDetailView({ model: hostel });

            var renderHostel = _.bind(hostelView.render, hostelView);
            hostel.fetch({ complete: renderHostel });
        }
    });
})(App, Backbone);
