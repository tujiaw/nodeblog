/**
 * Created by tujiaw on 2017/1/9.
 */

(function(global) {
  $(".tag.label").on("click", function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
  });

  $('.form.segment').bind('submit', function() {
    var showMessage = function(msg) {
      $('.warning.message').css('display', '');
      $('.warning.message').html(msg);
    };

    if ($('#title').val().length == 0) {
      showMessage('请输入文章标题！');
    } else if ($('#srcText').val().length == 0) {
      showMessage('请输入文章内容！');
    } else {
      var tags = [];
      $('.tag.label').each(function(key) {
        if ($(this).hasClass('active')) {
          tags.push($(this).text());
        }
      });
      if (tags.length > 0) {
        $('#inputTag').val(tags.join(';'));
        return true;
      }
      showMessage('请选择文章标签！');
    }
    return false;
  });
})(this);
