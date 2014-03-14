mongoose = require('mongoose');

// API
mongoose.connect('mongodb://localhost/library_database');

var Post = new mongoose.Schema({
  title: String,
  about: String,
  updated_at: String
});

var PostModel = mongoose.model('Post', Post);

app.get('/api/posts', function (req, res) {
  console.log('GET /api/posts'.magenta)
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
  console.log('POST /api/posts'.magenta)
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
  console.log(('PUT /api/posts/' + req.params.id).magenta)
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
  console.log(('DELETE /api/posts/' + req.params.id).magenta)
  PostModel.findById(req.params.id, function (err, post) {
    if (err) throw err;
    post.remove(function (err) {
      if (err) throw err;
      res.send('');
    });
  });
});


