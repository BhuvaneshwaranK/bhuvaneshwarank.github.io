// var final_transcript = '';
// var recognizing = false;
// var recognition;

// if('webkitSpeechRecognition' in window){
//         // $("#emily-input-button").css("background-image", "url(../static/images/mic_new.gif)");
//         // document.getElementById('emily-input-button').setAttribute("onclick","javascript:return startConverting();");
//         recognition = new webkitSpeechRecognition();
//         recognition.continuous = false;
//         recognition.interimResults = false;
//         recognition.maxAlternatives = 5;

//         recognition.onstart = function() {
            
//             $('#mic').css('color', 'red');
//             console.log("in onstart");
//             recognizing = true;
//         };
//         recognition.onend = function() {
//             $('#mic').css('color', 'black');
//             console.log("in onend");
//             recognizing = false;
//             console.log("-------------",final_transcript);
//             show_result();
            
//         };
//         recognition.onspeechstart = function() {    
//             console.log("in onspeechstart");
//             setTimeout(function(){
//             	recognition.stop(); 
//             }, 8000);
            
//         };

//         recognition.onresult = function(event) {
//             console.log("in onresult");
//             var interim_transcript = '';
//             if (typeof(event.results) == 'undefined') {
//             recognition.onend = null;
//             recognition.stop();
//             return;
//             }
//             for (var i = event.resultIndex; i < event.results.length; ++i) {
//             if (event.results[i].isFinal) {
//                 final_transcript += event.results[i][0].transcript;
//             } else {
//                 interim_transcript += event.results[i][0].transcript;
//             }
//             }
//             final_transcript = capitalize(final_transcript);
//         };

//     }

// // reply processing
// var two_line = /\n\n/g;
// var one_line = /\n/g;
// function linebreak(s) {
//   return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
// }

// var first_char = /\S/;
// function capitalize(s) {
//   return s.replace(first_char, function(m) { return m.toUpperCase(); });
// }

// function startConverting() {
//     console.log("coming");
//   if (recognizing) {
//     recognition.stop();
//     return;
//   }
//   console.log("25");
//   final_transcript = '';
//   recognition.lang = 'en-US';
//   recognition.start();
// }


// function show_result(){
//      if(final_transcript.toLowerCase() == 'hello'){
//                 $('#hello_response').text("Hi! I'm Bhuvanesh")
//                 $('#hello_response').css('background-color', '#18bc9c');
//             }
//             else if(final_transcript.toLowerCase() == 'show me your picture'){
//                 $('#pic_response').append('<img class="img-fluid" src="img/profile3.jpg">');
//             }
//             else if(final_transcript.toLowerCase() == 'show expense report'){
//                 $('#report_response').animate({bottom: '-100px'});
//             }
// }

function startButton(event) {
    recognition.start();
    
}

    if (!('webkitSpeechRecognition' in window)) {
    //Speech API not supported here…
    console.log("not support");
} else { //Let’s do some cool stuff :)
    var recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
    recognition.continuous = false;   //Suitable for dictation. 
    recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
    //Define some more additional parameters for the recognition:
    recognition.lang = "en-US"; 
    recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
}
recognition.onstart = function() {
    $('#mic').css('color', 'red');
    //Listening (capturing voice from audio input) started.
    //This is a good place to give the user visual feedback about that (i.e. flash a red light, etc.)
};

recognition.onend = function() {
    //Again – give the user feedback that you are not listening anymore. If you wish to achieve continuous recognition – you can write a script to start the recognizer again here.
};

recognition.onresult = function(event) { //the event holds the results
//Yay – we have results! Let’s check if they are defined and if final or not:
    if (typeof(event.results) === 'undefined') { //Something is wrong…
        recognition.stop();
        return;
    }

    for (var i = event.resultIndex; i < event.results.length; ++i) {      
        if (event.results[i].isFinal) { //Final results
            console.log("final results: " + event.results[i][0].transcript);   //Of course – here is the place to do useful things with the results.
        } else {   //i.e. interim...
            console.log("interim results: " + event.results[i][0].transcript);  //You can use these results to give the user near real time experience.
        } 
    } //end for loop
}; 




