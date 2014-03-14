var express = require('express'),
    colors = require('colors'),
    fs = require('fs'),
    exec = require('exec-sync');

SLOW_ASSETS = true;
SLOW_CACHE = true;

manifestVersion = function () { return exec('git rev-parse head'); };

app = express();
app.configure(function () {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  app.use(express.bodyParser());
  app.set('view engine', 'ejs');
})

// Appcache Routes
app.get('/cache.appcache', function (req, res) {
  console.log(("GET /cache.appcache").yellow)

  // Requeset for current cache version
  res.set('Content-Type', 'text/cache-manifest');
  res.render('cache.ejs');
});

require('./app_routes');
require('./api_routes');
require('./asset_routes');

app.listen(4000)
