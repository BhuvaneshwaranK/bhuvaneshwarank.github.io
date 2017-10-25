var index = 0;
var captionLength = 0;
var captionOptions = ["Data Scientist","Python Enthusiast","Social Activist"]

// this will make the cursor blink at 400ms per cycle
function cursorAnimation() {
  $('#cursor').animate({
      opacity: 0
  }, 400).animate({
      opacity: 1
  }, 400);
}

// this types the caption
function type() {
    $caption.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 70);
    }
}

// this erases the caption
function erase() {
    $caption.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
        setTimeout('erase()', 50);
    }
}

// this instigates the cycle of typing the captions
function showCaptions() {
  caption = captionOptions[index];
  type();
  if (index < (captionOptions.length - 1)) {
    index++
    setTimeout('erase()', 4000);
    setTimeout('showCaptions()', 6000)
  } else {
      setTimeout('erase()', 4000);
      index = 0;
      setTimeout('showCaptions()', 6000)
  }
}

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
        $("#tempunit").text(tempUnit);
        $("#desc").text(result.weather[0].main);
        $('#desc_icon').attr('src',result.weather[0].icon);
      }
    });
  }
}

$( document ).ready(function() {
      // use setInterval so that it will repeat itself
    setInterval('cursorAnimation()', 600);
    $caption = $('#caption');
    
    // use setTimeout so that it only gets called once
    setTimeout('showCaptions()', 1000);
    getquotes();
    getWeatherDetails();
    $('.blog').slick({
        prevArrow: true,
        nextArrow: true,
        adaptiveHeight: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});
