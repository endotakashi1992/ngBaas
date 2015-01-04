(function() {
  module.exports = function(app) {
    var Datastore, EventEmitter, bodyParser, collections, createDB, ev, express, port;
    express = require("express");
    bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(bodyParser.json());
    port = process.env.PORT || 3000;
    Datastore = require('nedb');
    collections = {};
    createDB = function(name) {
      return collections[name] || (collections[name] = new Datastore({
        filename: ".tmp/data/" + name + ".json",
        autoload: true
      }));
    };
    EventEmitter = require('events').EventEmitter;
    ev = new EventEmitter;
    app.get("/api/:resource", function(req, res) {
      var db, query, resource;
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      });
      res.write("\n");
      resource = req.params.resource;
      db = createDB(resource);
      query = req.query || {};
      db.find(query, function(e, docs) {
        return docs.forEach(function(doc) {
          return res.write('data: ' + JSON.stringify(doc) + ' \n\n');
        });
      });
      return ev.on("" + resource + ":create", function(data) {
        query._id = data._id;
        return db.findOne(query, function(e, doc) {
          return res.write('data: ' + JSON.stringify(doc) + ' \n\n');
        });
      });
    });
    app.get("/api/:resource/:_id", function(req, res) {
      var db, resource, _id;
      _id = req.params._id;
      resource = req.params.resource;
      db = createDB(resource);
      return db.findOne({
        _id: _id
      }, function(e, doc) {
        return res.send(doc);
      });
    });
    app.post("/api/:resource", function(req, res) {
      var db, resource;
      resource = req.params.resource;
      db = createDB(resource);
      return db.insert(req.body, function(e, doc) {
        ev.emit("" + resource + ":create", doc);
        return res.send(doc);
      });
    });
    app.put("/api/:resource/:_id", function(req, res) {
      var db, resource, _id;
      resource = req.params.resource;
      _id = req.params._id;
      db = createDB(resource);
      return db.update({
        _id: _id
      }, req.body, function(e, d) {
        return res.send(d);
      });
    });
    app["delete"]("/api/:resource", function(req, res) {
      var db, resource, _id;
      _id = req.params._id;
      resource = req.params.resource;
      db = createDB(resource);
      return db.remove(req.body, function(e, d) {
        return res.send(d);
      });
    });
    app.get("/stream", function(req, res) {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      });
      res.write("\n");
      return setInterval(function() {
        return res.write('data: ' + "HEI!!!!" + ' \n\n');
      }, 1000);
    });
    return app.use(express["static"](__dirname + '/public'));
  };

}).call(this);
