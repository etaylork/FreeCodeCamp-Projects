
$(document).ready(function () {
  var author = "";
  function getQuote() {
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function (response) {

        // random quote
        $(".randquote").html('"' + response.quoteText + '"');

        // author 
        author = response.quoteAuthor;
        if (author == "") $(".author").html("~ no author available");
        else $(".author").html("~ " + author);

        return;
      }
    });
  }

  $("#getQuotes").on("click", function () {
    getQuote();
  });
  
});