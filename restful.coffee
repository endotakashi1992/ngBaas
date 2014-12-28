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

app.get "/api/:resource", (req, res) ->
  resource = req.params.resource
  db = createDB(resource)
  db.find {},(e,docs)->
    res.send docs
app.get "/api/:resource/:_id", (req, res) ->
  _id = req.params._id
  resource = req.params.resource
  db = createDB(resource)
  db.findOne {_id:_id},(e,doc)->
    res.send doc
app.post "/api/:resource", (req, res) ->
  resource = req.params.resource
  db = createDB(resource)
  db.insert req.body,(e,d)->
    res.send d
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
app.use(express.static(__dirname + '/public'))
app.listen 3000