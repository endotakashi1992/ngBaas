mongojs = require 'mongojs'
console.log mongojs

db = mongojs('e1xy8rf20j.cloudapp.net:27017/mydb')
coll = db.collection('coll')

EventEmitter = require('events').EventEmitter

coll.insert {_id:"2",text:"ok"}
coll.findOne {_id:"2",text:"ok"},(e,doc)->
  console.log e,doc

# cursor = coll.find()
# ev = new EventEmitter
# ev.on 'tweet:create',(data)->
# 	console.log data

# setTimeout ->
#   ev.emit 'tweet:create',{text:"ano"}
# ,2000