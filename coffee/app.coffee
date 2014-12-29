window.app = angular.module('myApp', ['ngRoute','ngResource'])

app.controller 'tweets',($scope,$resource,Collection)->
  Tweets = Collection('tweets')
  window.tweets = Tweets.find()
