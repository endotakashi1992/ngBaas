angular.module('myApp', ['ngRoute','ngResource','ngBaas'])

.config (baasProvider)->
  baasProvider.collection('user')
.controller 'tweets',($scope,Users)->
  $scope.users = Users.find()
  window.Users = Users