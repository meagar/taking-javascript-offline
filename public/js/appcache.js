(function () {
  var appcache = window.applicationCache;

  $(appcache).bind('obsolete', function () {
    window.location.href = '/cache_update'
  });

  $(appcache).bind('downloading', function () {
    window.location.href = "/cache_update";
  });
})();
