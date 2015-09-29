// Generated by CoffeeScript 1.9.3
(function() {
  var ARTSY_URL, Backbone, _,
    slice = [].slice;

  _ = require('underscore');

  Backbone = require('backbone');

  ARTSY_URL = '';

  module.exports = function(a) {
    ARTSY_URL = a;
    return module.exports.methods;
  };

  module.exports.methods = {
    unlinkAccount: function(provider, options) {
      var m;
      m = new Backbone.Model({
        id: 1
      });
      m.url = ARTSY_URL + "/api/v1/me/authentications/" + provider;
      m.destroy(options);
      return m.once('sync', (function(_this) {
        return function() {
          if (!_this.get('authentications')) {
            return;
          }
          return _this.set({
            authentications: _.reject(_this.get('authentications'), function(auth) {
              return auth.provider === provider;
            })
          });
        };
      })(this));
    },
    sync: function(method, model, options) {
      var ref;
      if (options == null) {
        options = {};
      }
      if (method === 'create' || method === 'update' || method === 'patch') {
        options.attrs = _.omit(this.toJSON(), 'accessToken');
      } else {
        _.defaults(options, {
          data: {
            access_token: this.get('accessToken')
          }
        });
      }
      return (ref = Backbone.Model.prototype.sync).call.apply(ref, [this].concat(slice.call(arguments)));
    }
  };

}).call(this);