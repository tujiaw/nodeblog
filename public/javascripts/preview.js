
(function(global) {
  var oldContent = "";
  var currentContent = "";
  var updateContent = debounce(function() {
    $("#previewText").html(marked(currentContent));
  }, 1000);

  function isPreviewVisible() {
    return $("#previewText").css("display") !== "none";
  }

  $("#srcText").on("change keyup paste", function() {
    currentContent = $(this).val();
    if (currentContent == oldContent || !isPreviewVisible()) {
      return;
    }
    oldContent = currentContent;
    updateContent();
  });

  $("#previewBtn").on("click", function() {
    $("#previewText").css("display", isPreviewVisible() ? "none" : "");
    currentContent = $("#srcText").val();
    updateContent();
    return false;
  });
})(this);
