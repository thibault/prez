var App = App || {};

(function(App, Backbone) {
    "use strict";

    App.Models = {};

    App.Models.City = Backbone.Model.extend({
        idAttribute: '_id',
        parse: function(resp) {
            return resp;
        }
    });

    App.Models.CityCollection = Backbone.Collection.extend({
        model: App.Models.City,
        url: App.Config.API_ROOT,
    });

    App.Models.Hostel = Backbone.Model.extend({
        idAttribute: '_id',
    });

    App.Models.HostelCollection = Backbone.Collection.extend({
        model: App.Models.Hostel,
    });
})(App, Backbone);
