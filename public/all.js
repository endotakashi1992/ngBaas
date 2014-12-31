(function() {
  angular.module('myApp', ['ngRoute', 'ngResource', 'ngBaas']).controller('tweets', function($scope, Collection) {
    window.Tweets = Collection('tweets');
    return window.Users = Collection('users');
  });

}).call(this);

(function() {
  var app, dump;

  dump = function(obj) {
    var key, str;
    str = "";
    for (key in obj) {
      if (str !== "") {
        str += "&";
      }
      str += key + "=" + obj[key];
    }
    return str;
  };

  app = angular.module('ngBaas', []);

  window.createDirective = function(name) {
    return app.directive(name, function($http) {
      return {
        restrict: "A",
        link: function(scope, elem, attrs) {
          var plur, _id;
          _id = attrs[name];
          plur = inflection.pluralize(name);
          return $http.get("/api/" + plur + "/" + _id).success(function(data) {
            return angular.forEach(data, function(val, key) {
              return scope[key] = val;
            });
          });
        }
      };
    });
  };

  app.factory;

  createDirective('user');

  app.factory('Collection', function($http) {
    return function(name) {
      var sig;
      createDirective('user');
      sig = inflection.singularize(name);
      createDirective(sig);
      return {
        find: function(query) {
          var es, query_str, result;
          result = [];
          query_str = dump(query);
          es = new EventSource("/api/" + name + "?" + query_str);
          es.addEventListener("message", function(event) {
            return result.push(JSON.parse(event.data));
          });
          return result;
        },
        findOne: function(_id) {
          var result;
          result = {};
          $http.get("/api/" + name + "/" + _id).success(function(data) {
            return angular.forEach(data, function(val, key) {
              return result[key] = val;
            });
          });
          return result;
        },
        insert: function(data) {
          var result;
          result = {};
          $http.post("/api/" + name, data).success(function(data) {
            return angular.forEach(data, function(val, key) {
              return result[key] = val;
            });
          });
          return result;
        }
      };
    };
  });

}).call(this);
