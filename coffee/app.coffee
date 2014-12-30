window.app = angular.module('myApp', ['ngRoute','ngResource'])

app.controller 'tweets',($scope,Collection)->
  window.Tweets = Collection('tweets')