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
  if (recognizing) {
    recognition.stop();
    return;
  }
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
                $("#report_img").css("display", "block");
                $('#report_img').animate({bottom: '-100px'});
            }
  final_transcript = "";
}


$( document ).ready(function() {
    if('webkitSpeechRecognition' in window){
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = function() {
            recognizing = true;
        };
        recognition.onend = function() {
            recognizing = false;
            recognition.start();
            
            
        };
        recognition.onspeechstart = function() {    
            
        };

        recognition.onresult = function(event) {
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
