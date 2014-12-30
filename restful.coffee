express = require("express")
app = express()
bodyParser = require("body-parser")
app = express()
app.use bodyParser.urlencoded(extended: false)
app.use bodyParser.json()

Datastore = require('nedb')
collections = {}
createDB = (name)->
  return collections[name] || collections[name] = new Datastore({filename:".tmp/data/#{name}.json",autoload:true})

EventEmitter = require('events').EventEmitter
ev = new EventEmitter

app.get "/api/:resource", (req, res) ->
  console.log req.query
  res.writeHead 200,
    "Content-Type": "text/event-stream"
    "Cache-Control": "no-cache"
    Connection: "keep-alive"
  res.write "\n"
  resource = req.params.resource
  db = createDB(resource)
  query = req.query || {}
  db.find query,(e,docs)->
    docs.forEach (doc)->
      res.write('data: ' + JSON.stringify(doc) + ' \n\n')
  ev.on "#{resource}:create",(data)->
    query._id = data._id
    db.findOne query,(e,doc)->
      res.write('data: ' + JSON.stringify(doc) + ' \n\n')
app.get "/api/:resource/:_id", (req, res) ->
  _id = req.params._id
  resource = req.params.resource
  db = createDB(resource)
  db.findOne {_id:_id},(e,doc)->
    res.send doc
app.post "/api/:resource", (req, res)->
  resource = req.params.resource
  db = createDB(resource)
  db.insert req.body,(e,doc)->
    ev.emit "#{resource}:create",(doc)
    res.send doc
app.put "/api/:resource/:_id",(req,res) ->
  resource = req.params.resource
  _id = req.params._id
  db = createDB(resource)
  db.update {_id:_id},req.body,(e,d)->
    res.send d
app.delete "/api/:resource",(req,res) ->
  _id = req.params._id
  resource = req.params.resource
  db = createDB(resource)
  db.remove req.body,(e,d)->
    res.send d
app.get "/stream",(req,res)->
  res.writeHead 200,
    "Content-Type": "text/event-stream"
    "Cache-Control": "no-cache"
    Connection: "keep-alive"
  res.write "\n"
  setInterval ->
    res.write('data: ' + "HEI!!!!" + ' \n\n')
  , 1000
app.use(express.static(__dirname + '/public'))
app.listen 3000