(function() {
  var app, express, ngBaas;

  express = require("express");

  app = express();

  ngBaas = require("./restful");

  ngBaas(app);

  app.listen(8080);

}).call(this);
