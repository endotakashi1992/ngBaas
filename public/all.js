(function() {
  angular.module('myApp', ['ngRoute', 'ngResource']).factory('Collection', function($resource) {
    var _Collection;
    _Collection = function(name) {
      return $resource("/api/" + name + "/:_id");
    };
    return _Collection;
  }).controller('tweets', function($scope, $resource, Collection) {
    var Tweets, tweet;
    Tweets = Collection('tweets');
    tweet = Tweets.get({
      _id: "9DiPZJKDQzVWwd9p"
    });
    console.log(tweet);
    $scope.tweet = new Tweets();
    $scope.tweets = Tweets.query();
    $scope.tweet.text = "";
    return $scope.add = function() {
      $scope.tweet.$save();
      return $scope.tweet = new Tweets();
    };
  });

}).call(this);
