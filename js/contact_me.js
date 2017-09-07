
$( document ).ready(function() {
    $.ajax({
//         url: "https://quotes.stormconsultancy.co.uk/random.json",
//         method:"GET",
//         dataType: 'json',
//         success: function (data) { 
//             var quote = data.quote;
//             var author = data.author;
//             $('#quote_text').append("<p>"+ quote + "</p><p>&mdash; " + author + "</p>");
         // url: "http://quotes.stormconsultancy.co.uk/random.json",
        url : "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        method:"GET",
        contentType: "application/json;odata=verbose",
        dataType: 'json',
        success: function (data) { 
            var quote = data[0].content;
            var author = data[0].title;
            $('#quote_text').append("<p>"+ quote + "</p><p>&mdash; " + author + "</p>");
            console.log("success now");
            
        },
        error: function (data) {
            quote = "A year spent in artificial intelligence is enough to make one believe in God.";
            author = "Alan Perlis";
            $('#quote_text').append("<p>"+ quote + "</p><p>&mdash; " + author + "</p>");
            console.log("fail");
        }
    });
});
$(function() {


  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

       setTimeout(function() {
            // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);

  
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
