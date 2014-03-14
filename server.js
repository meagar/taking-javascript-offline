var express = require('express'),
    colors = require('colors'),
    fs = require('fs'),
    exec = require('exec-sync');

SLOW_ASSETS = false;
SLOW_CACHE = false;

app = express();
app.configure(function () {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  app.use(express.bodyParser());
  app.set('view engine', 'ejs');
})

require('./app_routes');
require('./api_routes');
require('./asset_routes');

app.listen(4000)
