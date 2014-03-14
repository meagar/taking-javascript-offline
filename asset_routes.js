var fs = require('fs');

function send(path, type, res) {
  setTimeout(function () {
    res.setHeader('Content-Type', type);
    res.write(fs.readFileSync(path), {encoding: 'utf8'});
    res.end();
  }, global.SLOW_ASSETS ? 5000 : 1);
}

// Serve static assets with a bit of a delay
app.get('/js/:file.js', function (req, res) {
  console.log(("GET " + req.path).blue);
  send('./public/js/' + req.params.file + '.js', 'application/javascript', res);
});

// Serve static assets with a bit of a delay
app.get('/css/:file.css', function (req, res) {
  console.log(("GET " + req.path).blue);
  send('./public/css/' + req.params.file + '.css', 'text/css', res);
});

app.get('/img/bosscamp-logo.png', function(req, res) {
  var img = fs.readFileSync('./public/img/bosscamp-logo.png');
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
});


