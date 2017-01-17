/**
 * Created by tujiaw on 2017/1/16.
 */
$('.ui.search')
  .search({
    type          : 'category',
    minCharacters : 3,
    apiSettings   : {
      onResponse: function(githubResponse) {
        var
          response = {
            results : {}
          }
        ;
        // translate GitHub API response to work with search
        $.each(githubResponse.items, function(index, item) {
          var
            language   = item.language || 'Unknown',
            maxResults = 8
          ;
          if(index >= maxResults) {
            return false;
          }
          // create new language category
          if(response.results[language] === undefined) {
            response.results[language] = {
              name    : language,
              results : []
            };
          }
          // add result to category
          response.results[language].results.push({
            title       : item.name,
            description : item.description,
            url         : item.html_url
          });
        });
        return response;
      },
      url: '/search?q={query}'
    }
  })
;