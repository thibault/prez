var App = App || {};

(function(App, Backbone) {
    "use strict";

    App.Views = {};

    App.Views.CityView = Backbone.View.extend({
        template: _.template($("#tpl-city-item").html()),
        events: {
            'click a': 'onClick'
        },
        render: function() {
            var dict = this.model.toJSON();
            var html = this.template(dict);
            this.$el.html(html);
            return this;
        },
        onClick: function(event) {
            event.preventDefault();
            var url = event.target.pathname;
            Backbone.history.navigate(url);
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
