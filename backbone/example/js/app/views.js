(function(exports, Models) {
    "use strict";

    exports.Views = {};

    Views.CityView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            this.$el.html(this.model.get('name'));
        }
    });

    Models.SidebarView = Backbone.View.extend({
        el: '#sidebar',
        initialize: function() {
            this.listenTo(this.collection, "change", this.render);
        },
        render: function() {
            alert('changed');
        }
    });
})(this, Models);
