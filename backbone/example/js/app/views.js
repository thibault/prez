(function(exports, Models) {
    "use strict";

    exports.Views = {};

    Views.CityView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            this.$el.html(this.model.get('name'));
            return this;
        }
    });

    Views.CityCollectionView = Backbone.View.extend({
        el: '#sidebar-menu',
        initialize: function() {
            this.collection.on('reset', this.render);

            this.collection.fetch({
                reset: true,
                error: function(col, res, options) {
                    console.log(col);
                },
            });
        },
        render: function() {
            alert('render');
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(city) {
            var cityView = new Views.CityView({ model: data });
            this.$el.append(cityView.render().el);

        }
    });
})(this, Models);
