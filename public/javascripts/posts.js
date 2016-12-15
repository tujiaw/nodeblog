$('a.remove').click(function() {
  var href = $(this).attr('href');
  $('.small.test.modal').modal({
    closable: false,
    onDeny: function() {
      return true;
    },
    onApprove: function() {
      window.location.href = href;
    }
  }).modal('show');
  return false;
})
