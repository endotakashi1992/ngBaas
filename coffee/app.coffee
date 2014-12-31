angular.module('myApp', ['ngRoute','ngResource','ngBaas'])

.config (baasProvider)->
  baasProvider.collection('user')
.controller 'tweets',($scope,Users)->
  window.users = Users.find({text:"hello"})
  # window.Tweets = Collection('tweets')
  # window.Users = Collection('users')