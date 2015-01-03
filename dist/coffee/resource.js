(function() {
  var Set, app, dump;

  Set = function(array) {
    var result;
    result = array || [];
    result.add = function(value) {
      angular.forEach(result, function(val, key) {
        if (val._id === value._id) {
          return result.pop(key);
        }
      });
      return result.push(value);
    };
    return result;
  };

  dump = function(obj) {
    var key, str;
    if (!obj) {
      return "";
    }
    str = "?";
    for (key in obj) {
      if (str !== "") {
        str += "&";
      }
      str += key + "=" + obj[key];
    }
    return str;
  };

  app = angular.module('ngBaas', []).provider('baas', function($compileProvider, $provide) {
    return {
      $get: function() {
        return null;
      },
      collection: function(name) {
        var plur, plur_cap, sing, sing_cap;
        sing = inflection.singularize(name);
        sing_cap = inflection.capitalize(sing);
        plur = inflection.pluralize(name);
        plur_cap = inflection.capitalize(plur);
        $compileProvider.directive(name, function($http) {
          return {
            restrict: "A",
            link: function(scope, elem, attrs) {
              var _id;
              _id = attrs[name];
              return $http.get("/api/" + plur + "/" + _id).success(function(data) {
                return angular.forEach(data, function(val, key) {
                  return scope[key] = val;
                });
              });
            }
          };
        });
        return $provide.factory(plur_cap, function($http, $rootScope) {
          return {
            find: function(query) {
              var es, query_str, result;
              result = Set();
              query_str = dump(query);
              es = new EventSource("/api/" + plur + query_str);
              es.addEventListener("message", function(event) {
                return $rootScope.$apply(function() {
                  return result.add(JSON.parse(event.data));
                });
              });
              return result;
            },
            findOne: function(_id) {
              var result;
              result = {};
              $http.get("/api/" + plur + "/" + _id).success(function(data) {
                return angular.forEach(data, function(val, key) {
                  return result[key] = val;
                });
              });
              return result;
            },
            insert: function(data) {
              var result;
              result = {};
              $http.post("/api/" + plur, data).success(function(data) {
                return angular.forEach(data, function(val, key) {
                  return result[key] = val;
                });
              });
              return result;
            }
          };
        });
      }
    };
  });

}).call(this);
