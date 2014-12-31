angular.module('myApp', ['ngRoute','ngResource','ngBaas'])

.config (baasProvider)->
  baasProvider.collection('user')
.controller 'tweets',($scope,Collection)->
  window.Tweets = Collection('tweets')
  window.Users = Collection('users')