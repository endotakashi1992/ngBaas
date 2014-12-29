app.factory 'Collection',->
  return (name)->
    return {
      find:(query)->
        result = []
        es = new EventSource("/api/#{name}")
        es.addEventListener "message", (event) ->
          result.push JSON.parse(event.data)
        return result
    }