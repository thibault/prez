var App = App || {};

(function(App) {
    "use strict";

    var cities = new App.Models.CityCollection();
    var cityCollectionView = new App.Views.CityCollectionView({
        collection: cities
    });
})(App);
