/**
 * Created by tujiaw on 2017/1/15.
 */
$('.ui.tag.button').on('click', function() {
  var tagName = encodeURIComponent($(this).text());
  window.location.href = `/tags/${tagName}`;
});
