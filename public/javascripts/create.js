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
      return false;
    }

    if ($('#srcText').val().length == 0) {
      showMessage('请输入文章内容！');
      return false;
    }

    var hasLabel = false;
    $('.tag.label').each(function(key, value) {
      if (!hasLabel && $(this).hasClass('active')) {
        hasLabel = true;
      }
    });
    if (!hasLabel) {
      showMessage('请选择文章标签！');
      return false;
    }

    return true;
  });
})(this);
