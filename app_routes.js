
app.get('/', function (req, res) {
  console.log('GET /'.green);
  res.render('index.jade');
});

app.get('/upgrade', function (req, res) {
  console.log('GET /upgrade'.green);
  res.render('upgrade.jade');
});

app.get('/checkout', function (req, res) {
  console.log('GET /checkout'.green);
  res.render('checkout.jade');
});

app.get('/cache_update', function (req, res) {
  console.log('GET /cache_update'.green);
  res.render('cache_update.jade');
});



