var final_transcript = '';
var recognizing = false;
var recognition;

// reply processing
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startConverting() {
    console.log("coming");
  if (recognizing) {
    recognition.stop();
    return;
  }
  console.log("25");
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
}


function show_result(){
     if(final_transcript.toLowerCase() == 'hello'){
                $('#hello_response').text("Hi! I'm Bhuvanesh")
                $('#hello_response').css('background-color', '#18bc9c');
            }
            else if(final_transcript.toLowerCase() == 'show me your picture'){
                $('#pic_response').append('<img class="img-fluid" src="img/profile3.jpg">');
            }
            else if(final_transcript.toLowerCase() == 'show expense report'){
                $('#report_response').animate({bottom: '-100px'});
            }
}


$( document ).ready(function() {
    if('webkitSpeechRecognition' in window){
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = function() {
            
            // $('#mic').css('color', 'red');
            console.log("in onstart");
            recognizing = true;
        };
        recognition.onend = function() {
            // $('#mic').css('color', 'black');
            console.log("in onend");
            recognizing = false;
            recognition.start();
            console.log("-------------",final_transcript);
            
            
        };
        recognition.onspeechstart = function() {    
            console.log("in onspeechstart");
            // setTimeout(function(){
            // 	recognition.stop(); 
            // }, 8000);
            
        };

        recognition.onresult = function(event) {
            console.log("in onresult");
            var interim_transcript = '';
            if (typeof(event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            return;
            }
            for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
            }
            final_transcript = capitalize(final_transcript);
            show_result();
        };

    }
    startConverting();
});
