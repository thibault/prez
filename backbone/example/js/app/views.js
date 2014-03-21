var App = App || {};

(function(App, Backbone) {
    "use strict";

    App.Views = {};

    App.Views.CityView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            this.$el.html(this.model.get('name'));
            return this;
        }
    });

    App.Views.CityCollectionView = Backbone.View.extend({
        el: '#sidebar-menu',
        initialize: function() {
            this.collection.on('reset', this.render, this);
            this.collection.fetch({ reset: true });
        },
        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(city) {
            var cityView = new App.Views.CityView({ model: city });
            this.$el.append(cityView.render().el);

        }
    });
})(App, Backbone);
