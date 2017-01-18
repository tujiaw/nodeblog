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
    minCharacters : 3
  })
;
