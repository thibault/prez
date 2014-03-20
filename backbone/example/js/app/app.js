(function(exports, Models, Views) {
    "use strict";

    var cities = new Models.CityCollection();

    var cityCollectionView = new Views.CityCollectionView({
        collection: cities
    });
})(this, Models, Views);
