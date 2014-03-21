var App = App || {};

(function(App) {
    "use strict";

    App.Utils = {};

    App.Utils.slugify = function(str) {
         return str.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };
})(App);

