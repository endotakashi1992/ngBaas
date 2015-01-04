angular.module('myApp', ['ngBaas'])
.config (baasProvider)->
  baasProvider.collection('user')
.controller 'tweets',($scope,Users)->
  $scope.users = Users.find()
  window.Users = Users