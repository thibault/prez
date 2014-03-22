var App = App || {};

(function(App, Backbone) {
    "use strict";

    App.Views = {};

    App.Views.CityItemView = Backbone.View.extend({
        tagName: 'li',
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
            Backbone.history.navigate(url, { trigger: true });
        }
    });

    App.Views.CityCollectionView = Backbone.View.extend({
        el: '#sidebar-menu',
        initialize: function() {
            this.listenTo(this.collection, 'reset', this.render);
            this.collection.fetch({ reset: true });
        },
        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(city) {
            var cityView = new App.Views.CityItemView({ model: city });
            this.$el.append(cityView.render().el);

        }
    });

    App.Views.CityDetailView = Backbone.View.extend({
        el: '#content',
        template: _.template($("#tpl-city-detail").html()),
        events: {
            'click ul.hostels li a': 'onHostelClick',
            'submit form': 'onFormSubmit'
        },
        render: function() {
            var dict = this.model.toJSON();
            var html = this.template(dict);
            this.$el.html(html);
            return this;
        },
        onHostelClick: function(event) {
            event.preventDefault();
            var url = event.target.pathname;
            Backbone.history.navigate(url, { trigger: true });
        },
        onFormSubmit: function(event) {
            event.preventDefault();
            var name = $('#form-name').val();
            var desc = $('#form-desc').val();
            var slug = App.Utils.slugify(name);
            var data = {
                _id: slug,
                name: name,
                description: desc
            };

            var hostel = new App.Models.Hostel(data);
            hostel.urlRoot = this.model.url();

            var successHandler = _.bind(function(options, model, response) {
                if (response.xhr.status === 201) {
                    var hostels = this.model.get('hostels');
                    hostels.push(hostel.toJSON());
                    this.model.set('hostels', hostels);
                    this.render();
                }
            }, this);
            hostel.save({}, { success: successHandler });
        }
    });

    App.Views.HostelDetailView = Backbone.View.extend({
        el: '#content',
        template: _.template($("#tpl-hostel-detail").html()),
        render: function() {
            var dict = this.model.toJSON();
            var html = this.template(dict);
            this.$el.html(html);
            return this;
        }
    });
})(App, Backbone);
