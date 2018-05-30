$(document).ready(function () {
  var lat = null;
  var long = null;

  //get latitude and longitude
  navigator.geolocation.getCurrentPosition(success, error);

  function success(data) {
    var lat = data.coords.latitude;
    var long = data.coords.longitude;
    var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=81d1643f7575fbcf970e1437c1fbed80";

    $.ajax({
      type: 'GET',
      url: url,
      dataType: "json",
      success: function (data) { weatherDisplay(data) },
      error: function (ts) { console.log(ts.status) }
    });


  }

  function error(err) {
    console.log(err);
  }

  var weatherDisplay = function (data) {
    $("body").delay(1000).animate({ opacity: 1 }, 700);
    var windDirection = degToCard(data.wind.deg)
    var descriptionIndex = getWeatherDescriptionIndex(data.weather[0].main);

    //Weather information
    $('#geo-status').prepend('<p>' + data.name + ' , ' + data.sys.country + '</p>');
    $('#weather-status').prepend('<p>' + data.weather[0].description + '</p>');
    $('#wind-status').prepend('<p>' + windDirection + ' ' + data.wind.speed + ' Knots</p>');
    $("body").css('background-image', 'url("' + weatherImages[descriptionIndex] + '")');
    $('#temp-display').prepend('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">');
    getTemperature(data.main.temp);
  }


});

var getTemperature = function (kelvinTemp) {
  var celciusTemp = Math.round(kelvinTemp - 273) + "&deg;C";
  var fahrenheitTemp = Math.round(1.8 * (kelvinTemp - 273) + 32) + "&deg;F";

  $("h2").prepend(celciusTemp);

  $('.btn').click(function () {
    if ($(this).text() === "Fahrenheit") {
      $("button").removeClass("btn-primary").addClass("btn-danger");
      $("button").html("Celcius");
      $("h2").html(fahrenheitTemp);
    } else {
      $("button").removeClass("btn-danger").addClass("btn-primary");
      $("button").html("Fahrenheit");
      $("h2").html(celciusTemp);
    }
  });
}

var degToCard = function (deg) {
  if (deg > 11.25 && deg < 33.75) {
    return "NNE";
  } else if (deg > 33.75 && deg < 56.25) {
    return "ENE";
  } else if (deg > 56.25 && deg < 78.75) {
    return "E";
  } else if (deg > 78.75 && deg < 101.25) {
    return "ESE";
  } else if (deg > 101.25 && deg < 123.75) {
    return "ESE";
  } else if (deg > 123.75 && deg < 146.25) {
    return "SE";
  } else if (deg > 146.25 && deg < 168.75) {
    return "SSE";
  } else if (deg > 168.75 && deg < 191.25) {
    return "S";
  } else if (deg > 191.25 && deg < 213.75) {
    return "SSW";
  } else if (deg > 213.75 && deg < 236.25) {
    return "SW";
  } else if (deg > 236.25 && deg < 258.75) {
    return "WSW";
  } else if (deg > 258.75 && deg < 281.25) {
    return "W";
  } else if (deg > 281.25 && deg < 303.75) {
    return "WNW";
  } else if (deg > 303.75 && deg < 326.25) {
    return "NW";
  } else if (deg > 326.25 && deg < 348.75) {
    return "NNW";
  } else {
    return "N";
  }
}

var weatherDescriptions = [
  "Atmosphere", "Clear", "Clouds", "Drizzle", "Rain", "Snow", "Thunderstorm"
]

var weatherImages = [
  "http://www.earthtimes.org/newsimage/klamath191217.jpg",
  "https://www.romania-insider.com/wp-content/uploads/2013/05/sunny-sxc.jpg",
  "http://wvue.images.worldnow.com/images/16501125_G.jpg?auto=webp&disable=upscale&width=800&lastEditedDate=20180409201710",
  "http://www.jacksonvilleallergycenter.com/wp-content/uploads/2018/04/Rainy-Weather.jpg",
  "https://hips.hearstapps.com/countryliving.cdnds.net/17/37/2048x1365/gallery-1505207215-heavy-rain-on-wheat-field.jpg?resize=768:*",
  "https://bobcat.grahamdigital.com/image/upload/view?width=640&height=360&method=crop&url=https://sharedmedia.grahamdigital.com/photo/2017/12/21/Snow%20Covered%20Trees%20and%20Road.jpg_11335847_ver1.0_640_360.jpg",
  "https://www.reviewjournal.com/wp-content/uploads/2017/09/9228109_web1_weather_09132017_rb_005.jpg"
]

var getWeatherDescriptionIndex = function (weatherDescription) {
  if (weatherDescription === "Mist") return 0;
  return weatherDescriptions.indexOf(weatherDescription);
}