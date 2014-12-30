(function() {
  window.app = angular.module('myApp', ['ngRoute', 'ngResource']);

  app.controller('tweets', function($scope, Collection) {
    return window.Tweets = Collection('tweets');
  });

}).call(this);

(function() {


}).call(this);

(function() {
  var dump;

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

  app.factory('Collection', function($http) {
    return function(name) {
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
