# This is Baas for only Angular!!
```
angular.module('myApp', ['ngBaas'])
.config(function(baasProvider) {
  baasProvider.collection('user');
})
.controller('tweets', function($scope, Users) {
  $scope.users = Users.find();
  //This is reactive change!!
  Users.insert({name:"takashi",favorite:"beauty boys"})
  //add all scope when connected
});
```
###First,
I must tell you that this repo is not official.  
###Second,
I can tell you that this repo is greatness than meanJS.  
###Third,
...thinking.  