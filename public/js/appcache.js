(function () {
  var $appcache = $(window.applicationCache);

  var current = 0;
  var total = 13; // Hack :(

  $appcache.bind('downloading', function () {
    $('.updating').show()
  });

  // Fires as we advance through our downloads
  $appcache.bind('progress', function () {
    current += 1;
    $('.progress-bar').width(current / total * 100 + "%")
  });

  // Fires the first time we cache a manifest
  $appcache.bind('cached', function () { window.location.reload(); });

  // Fires when we're done
  $appcache.bind('updateready', function () { window.location.reload(); });


})();
