$(document).ready(function(){
   var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=bee&limit=1&format=json";
   var term = "";
    $(".search").click(function(){
          $("h").remove();
          $("span").remove();
          $("body").prepend("<div class='form-group search-bar'><input type='text' class='sign-up' id='search-term'><span class='fa fa-times time' id='times'></span></div>");
         $("#times").click(function(){
             $(".sign-up").val("");
                   
  });
     $(".sign-up").keyup(function(event){
       if(event.keyCode == 13){
           term = $(".sign-up").val();
           $(".search-bar").css("margin","15px 0px 0px 0px");
           console.log(term);
        
        console.log(term);
        var searchTerm = $(".sign-up").val();
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchTerm+"&format=json&callback=?";
        $.ajax({
        url:url,
        type: 'GET',
        dataType: 'json',
        data: {param1: 'value1'},
        success: function(data,status,jqXHR){
          console.log(data);
            $("#results").html("");
          for(var i = 0; i < data[1].length;i++){
            $("#results").prepend("<div class='entries'><h2><a href="+data[3][i]+">"+data[1][i]+"</a></h2> <p>"+data[2][i]+"</p></div>");
          }
         }
      })
      .done(function(){
       console.log("success");
      })
      .fail(function(){
       console.log("error");
      });
      
    }
   });
      
    
    });
  
  
  
 
});