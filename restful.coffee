express = require("express")
app = express()
Datastore = require('nedb')
collections = {}
db = collections['takashi'] || collections['takashi'] = new Datastore()
db.insert({text:"hello"})
db.find {text:"hello"},(e,docs)->
  console.log docs,"ok"
  console.log collections['takashi']
# app.get "/:resource/:id", (req, res) ->
#   db
#   res.send "#{req.params.resource} Hello World #{req.params.id}"
# app.post "/:resource", (req, res) ->
#   res.send "#{req.params.resource}Desu"
# app.put "/:resource/:id",(req,res) ->
#   res.send "#{req.params.resource} update!!!!!"
# app.delete "/:resource/:id",(req,res) ->
#   res.send "#{req.params.resource} delete!!!!!"
# app.listen 3000