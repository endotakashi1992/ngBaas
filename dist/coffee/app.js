(function() {
  angular.module('myApp', ['ngRoute', 'ngResource', 'ngBaas']).config(function(baasProvider) {
    return baasProvider.collection('user');
  }).controller('tweets', function($scope, Users) {
    $scope.users = Users.find();
    return window.Users = Users;
  });

}).call(this);
