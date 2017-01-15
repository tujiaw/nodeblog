/**
 * Created by tujiaw on 2017/1/15.
 */

function hasParameter(name){
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

$('.pagination.menu a').click(function() {
  var newPage = parseInt($(this).text());
  var firstLast = parseInt($(this).attr('value'));
  if (isNaN(newPage) && !isNaN(firstLast)) {
    newPage = firstLast;
  }
  var author = hasParameter('author');
  if (author) {
    window.location.href = `/posts?author=${author}&page=${newPage}`;
  } else {
    window.location.href = `/posts?page=${newPage}`;
  }
});
