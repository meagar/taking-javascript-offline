$(function () {
  var appcache = window.applicationCache;

  var current = 0;
  var total = 14;

  $(appcache).bind('downloading', function () {
    $('.checking').slideUp('fast', function () {
      $('.updating').slideDown('fast');
    });
  });

  // Fires when we've advanced through our downloads
  $(appcache).bind('progress', function () {
    current += 1;
    $('.progress-bar').width(current / total * 100 + "%")
  });

  // Fires when there is no update for us to download
  $(appcache).bind('noupdate', function () {
    window.location.href = "/";
  });

  // Fires the first time we cache a manifest
  $(appcache).bind('cached', function () {
    window.location.href = "/";
  });

  // Fires when we're done
  $(appcache).bind('updateready', function () {
    window.location.href = "/";
  });
});
