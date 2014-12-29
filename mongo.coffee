mongojs = require 'mongojs'
console.log mongojs

db = mongojs('e1xy8rf20j.cloudapp.net:27017/mydb')
coll = db.collection('coll')

coll.insert({text:"hello"})
cursor = coll.find()
console.log cursor