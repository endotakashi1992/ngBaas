express = require("express")
app = express()
app.get "/:resource/:id", (req, res) ->
  res.send "#{req.params.resource} Hello World #{req.params.id}"
app.post "/:resource", (req, res) ->
  res.send "#{req.params.resource}Desu"
app.put "/:resource/:id",(req,res) ->
  res.send "#{req.params.resource} update!!!!!"
app.delete "/:resource/:id",(req,res) ->
  res.send "#{req.params.resource} delete!!!!!"
app.listen 3000