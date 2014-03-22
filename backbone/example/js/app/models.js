var App = App || {};

(function(App, Backbone) {
    "use strict";

    App.Models = {};

    App.Models.City = Backbone.Model.extend({
        idAttribute: '_id',
    });

    App.Models.CityCollection = Backbone.Collection.extend({
        model: App.Models.City,
        url: App.Config.API_ROOT,
        comparator: 'name',
    });

    App.Models.Hostel = Backbone.Model.extend({
        idAttribute: '_id',
    });

    App.Models.HostelCollection = Backbone.Collection.extend({
        model: App.Models.Hostel,
    });
})(App, Backbone);
