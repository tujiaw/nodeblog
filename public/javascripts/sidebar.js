/**
 * Created by tujiaw on 2017/1/16.
 */

$('.ui.search')
  .search({
    apiSettings: {
      url: '/search?q={query}'
    },
    fields: {
      results : 'items',
      title   : 'name',
      url     : 'html_url'
    },
    minCharacters : 2
  });

var isMobile = {
  Android: function() {
    return /Android/i.test(navigator.userAgent);
  },
  BlackBerry: function() {
    return /BlackBerry/i.test(navigator.userAgent);
  },
  IOS: function() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },
  Windows: function() {
    return /IEMobile/i.test(navigator.userAgent);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
  }
};

if (isMobile.Android() || isMobile.IOS()) {
  $('.ui.search').hide();
}
