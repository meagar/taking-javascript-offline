
function manifestPath() {
  return "/" + manifestVersion() + "/cache.appcache";
}

app.get('/', function (req, res) {
  console.log('GET /'.green);
  res.render('index.jade', { manifest: manifestPath() });
});

app.get('/upgrade', function (req, res) {
  console.log('GET /upgrade'.green);
  res.render('upgrade.jade', { manifest: manifestPath() });
});

app.get('/cache_update', function (req, res) {
  console.log('GET /cache_update'.green);
  res.render('cache_update.jade', { manifest: manifestPath() });
});



