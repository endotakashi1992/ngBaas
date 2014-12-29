(function() {
  window.app = angular.module('myApp', ['ngRoute', 'ngResource']);

  app.controller('tweets', function($scope, $resource, Collection) {
    var Tweets;
    Tweets = Collection('tweets');
    return window.tweets = Tweets.find();
  });

}).call(this);

(function() {
  app.factory('Collection', function() {
    return function(name) {
      return {
        find: function() {
          var es, result;
          result = [];
          es = new EventSource("/api/" + name);
          es.addEventListener("message", function(event) {
            return result.push(JSON.parse(event.data));
          });
          return result;
        }
      };
    };
  });

}).call(this);
