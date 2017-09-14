$(document).ready(function(){


$.getJSON('https://cors-anywhere.herokuapp.com/https://ipinfo.io', function(data){
  var temp = true;
  var d = data.loc.split(",");
  console.log(data);
  var urlC = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+d[0]+"&lon="+d[1]+"&units=metric&APPID=9cdcbb352dbc164f2ece3917d95399aa";
  var urlF = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+d[0]+"&lon="+d[1]+"&units=imperial&APPID=9cdcbb352dbc164f2ece3917d95399aa";
  
  getWeather(urlC);

 // toggles between Celsius and Fehrenheit 
 $("button").click(function(){
   if(temp == true){
     $(this).text("Change to Fehrenheit");
     $.getJSON(urlC,function(data){
        $(".weather-icon").html('<img width = 70px src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png" alt="weathericon" /img>' + data.main.temp + " C");
     });
     temp = false;
     console.log(temp);
   }else if(temp == false) {
    console.log("byu");
    $(this).text("Change to Celsius");
    $.getJSON(urlF,function(data){
        $(".weather-icon").html('<img width = 70px src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png" alt="weathericon" /img>' + data.main.temp + " F");
     });
    
    temp = true;
    console.log(temp);
  }
  
 })
  
});                           

// Use Json to get updated weather results of current location 
function getWeather(x){
  var y = x,
      weatherCon = ["Thunderstorm",//1
                   "Drizzle",//3
                   "Rain",//3
                   "Snow",//4
                   "Atmosphere",//2
                   "Clear",//0
                   "Extreme"//6
                   ],
      Backgrounds = [
        'http://lite987.com/files/2017/02/RS10009_461886983.jpg',
        'http://www.bahrainweather.gov.bh/documents/10716/11884/Fog.PNG/de9a3d1e-5e4f-4b5d-aee6-07e8fcca47f2?t=1407341540000',
        'https://s-media-cache-ak0.pinimg.com/originals/65/34/ce/6534cea4ab8e884ec50677531a63e9b5.jpg',
        'https://i.ytimg.com/vi/2Pv7aHUYE-I/maxresdefault.jpg',
        'https://www.obergurgl.com/urlaub/images/OG/WI/skigebiet_landschaft/hochgurgl_wurmkogl_skigebiet,method=crop,prop=data,id=1636-900.jpg',
        'http://xohojatri.com/wp-content/uploads/2016/03/xohojatri-cumulus-cloudscape-weather-in-NEIndia.jpg',
        'http://www.ie-wallpapers.com/data/out/225/37577773-tornado-wallpaper.jpg'
                   ];
  
  $.getJSON(y,function(data){
    console.log(data);
    console.log(weatherDescription(data.weather[0].description));
    $(".background").css("background-image","url("+weatherDescription(data.weather[0].description)+")");
    $("#location").html(data.name);
    $("#des").html(data.weather[0].description);
    $("#wind").html(data.wind.speed+" knots");
    $(".weather-icon").html('<img width = 70px src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png" alt="weathericon" /img>' + data.main.temp + " C");
    
    //changes the image depending on the tempeture 
    console.log(x);
    
    
    
    
  })
  function weatherDescription(icon){
    switch(icon){
      case "clear sky":
        return Backgrounds[0];
        break;
      case "few clouds":
        return Backgrounds[5];
        break;
      case "scattered clouds":
        return Backgrounds[5];
        break;
      case "broken clouds":
        return Backgrounds[5];
        break;
      case "shower rain":
        return Backgrounds[1];
        break;
      case "shower rain":
        return Backgrounds[2];
        break;
      case "rain":
        return Backgrounds[3];
        break;
      case "thunderstorm":
        return Backgrounds[1];
        break;
      case "snow":
        return Backgrounds[4];
        break;
      case "mist":
        return Backgrounds[3];
        break
      default:
        return Backgrounds[0];  
               }
  }
}
  
});