angular.module('myApp', ['ngRoute','ngResource'])
.factory 'User', ($resource)->
  return $resource '/api/users/:id'
.controller 'tweets',($scope,User)->
  console.log User
  $scope.tweet = {}
  $scope.tweets = []
  $scope.tweet.text = "hai"
  $scope.add = ->
    $scope.tweets.push $scope.tweet