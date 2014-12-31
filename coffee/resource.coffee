Set = (array)->
  result = array || []
  result.add = (value)->
    angular.forEach result,(val,key)->
      if val._id == value._id
        result.pop(key)
    result.push value
  return result

dump = (obj)->
  if !obj
    return ""
  str = "?"
  for key of obj
    str += "&"  unless str is ""
    str += key + "=" + obj[key]
  return str
app = angular.module 'ngBaas',[]
.provider 'baas',($compileProvider,$provide)->
  {
    $get:->
      null
    collection:(name)->
      sing = inflection.singularize name
      sing_cap = inflection.capitalize sing
      plur = inflection.pluralize name
      plur_cap = inflection.capitalize plur
      $compileProvider.directive name,($http)->
        restrict: "A"
        link:(scope,elem,attrs)->
          _id = attrs[name]
          $http.get("/api/#{plur}/#{_id}").
          success (data)->
            angular.forEach data,(val,key)->
              scope[key] = val
      $provide.factory plur_cap,($http,$rootScope)->
        {
          find:(query)->
            result = Set()
            query_str = dump query
            es = new EventSource("/api/#{plur}#{query_str}")
            es.addEventListener "message", (event) ->
              $rootScope.$apply ->
                result.add JSON.parse(event.data)
            return result
          findOne:(_id)->
            result = {}
            $http.get("/api/#{plur}/#{_id}").
            success (data)->
              angular.forEach data,(val,key)->
                result[key] = val
            return result
          insert:(data)->
            result = {}
            $http.post("/api/#{plur}",data).
            success (data)->
              angular.forEach data,(val,key)->
                result[key] = val
            return result
        }
  }