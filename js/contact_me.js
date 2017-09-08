function getquotes(){
  $.ajax({
        url : 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
        dataType: 'jsonp',
        success: function (data) { 
            var quote = data.quoteText;
            if(data.quoteAuthor != ""){
              var author = data.quoteAuthor;
            }
            else{
              var author = "Unknown";
            }
            $('#quote_text').append("<p>"+ quote + "</p><p>&mdash; " + author + "</p>");
            
        },
        error: function (data) {
            quote = "A year spent in artificial intelligence is enough to make one believe in God.";
            author = "Alan Perlis";
            $('#quote_text').append("<p>"+ quote + "</p><p>&mdash; " + author + "</p>");
        }
    });
}

function getWeatherDetails(){
  var api = "https://fcc-weather-api.glitch.me/api/current?";
  var lat, lon;
  var tempUnit = 'C';
  var currentTempInCelsius;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });

  function getWeather(lat, lon) {
    var urlString = api + lat + "&" + lon;
    $.ajax({
      url: urlString, success: function (result) {
        $("#city").text(result.name + ", ");
        $("#country").text(result.sys.country);
        currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
        $("#tempunit").text(tempUnit + ", ");
        $("#desc").text(result.weather[0].main);
      }
    });
  }
}

$( document ).ready(function() {
    getquotes();
    getWeatherDetails();
});
