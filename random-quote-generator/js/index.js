
$(document).ready(function(){
   
  function getQuote(){
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function( response ) {
        $(".randquote").html('"' + response.quoteText + '"');
        $(".author").html("~"+response.quoteAuthor);
      }
    });
  }
  
  $("#getQuotes").on("click",function(){
    getQuote();
  });
});