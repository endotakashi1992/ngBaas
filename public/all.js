(function() {
  angular.module('myApp', ['ngRoute', 'ngResource']).factory('User', function($resource) {
    return $resource('/api/users/:id');
  }).controller('tweets', function($scope, User) {
    console.log(User);
    $scope.tweet = {};
    $scope.tweets = [];
    $scope.tweet.text = "hai";
    return $scope.add = function() {
      return $scope.tweets.push($scope.tweet);
    };
  });

}).call(this);
