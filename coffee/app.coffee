angular.module('myApp', ['ngRoute','ngResource','ngBaas'])
.controller 'tweets',($scope,Collection)->
  window.Tweets = Collection('tweets')