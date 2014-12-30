dump = (obj)->
  str = ""
  for key of obj
    str += "&"  unless str is ""
    str += key + "=" + obj[key]
  return str
app.factory 'Collection',($http)->
  (name)->
    {
      find:(query)->
        result = []
        query_str = dump query
        es = new EventSource("/api/#{name}?#{query_str}")
        es.addEventListener "message", (event) ->
          result.push JSON.parse(event.data)
        return result
      findOne:(_id)->
        result = {}
        $http.get("/api/#{name}/#{_id}").
        success (data)->
          angular.forEach data,(val,key)->
            result[key] = val
        return result
      insert:(data)->
        result = {}
        $http.post("/api/#{name}",data).
        success (data)->
          angular.forEach data,(val,key)->
            result[key] = val
        return result
    }