app.factory 'Collection',->
  return (name)->
    return {
      find:->
        result = []
        es = new EventSource("/api/#{name}")
        es.addEventListener "message", (event) ->
          result.push JSON.parse(event.data)
        return result
    }
