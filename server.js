
var express = require('express'),
    jade = require('jade'),
    mongoose = require('mongoose'),
    fs = require('fs');


app = express();
app.configure(function () {
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  app.use(express.bodyParser());
  app.set('view engine', 'ejs');
})

mongoose.connect('mongodb://localhost/library_database');

// Simple page
app.get('/', function (req, res) { res.render('index.jade'); });
app.get('/upgrade', function (req, res) { res.render('upgrade.jade'); });

// Appcache Routes
app.get('/application.appcache', function (req, res) {
  res.set('Content-Type', 'text/cache-manifest');
  files = fs.readdirSync('public/js')
  res.locals.files = "blah"
  res.render('application.ejs', { files: 'what' })
});

// API

var Post = new mongoose.Schema({
  title: String,
  about: String,
  updated_at: String
});

var PostModel = mongoose.model('Post', Post);

app.get('/api/posts', function (req, res) {
  PostModel.find(function (err, posts) {
    if (err) throw err;
    res.send(posts)
  });
});

app.get('/api/posts/:id', function (req, res) {
  PostModel.findById(req.params.id, function (err, post) {
    if (err) throw err;
    res.send(post)
  });
});

app.post('/api/posts', function (req, res) {
  console.log(req)
  console.log(req.body)

  var post = new PostModel({
    title: req.body.title,
    about: req.body.about,
    updated_at: (new Date()).getTime()
  });
  post.save(function (err) {
    if (err) throw err;
    res.send(post);
  });
});

app.put('/api/posts/:id', function (req, res) {
  PostModel.findById(req.params.id, function (err, post) {
    if (err) throw err;
    post.title = req.body.title;
    post.about = req.body.about;
    post.save(function (err) {
      if (err) throw err;
      res.send(post)
    });
  });
});

app.delete('/api/posts/:id', function (req, res) {
  PostModel.findById(req.params.id, function (err, post) {
    if (err) throw err;
    post.remove(function (err) {
      if (err) throw err;
      res.send('');
    });
  });
});

//app.get('/:version/things.appcache', function (req, res) {
  //res.send('GOT IT');
//});

app.listen(4000)
