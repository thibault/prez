(function(exports, Models, Views) {
    "use strict";

    var cities = new Models.CityCollection();

    var cityListView = new Views.CityListView({
        collection: cities
    });

    cities.fetch();
    cityListView.render();
})(this, Models, Views);
