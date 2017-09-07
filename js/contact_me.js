
$( document ).ready(function() {
//     $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
//   $("#quote_text").append(a[0].content + "<p>&mdash; " + a[0].title + "</p>")
// });
    $.ajax({
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
        method:"GET",
        contentType: "application/json;odata=verbose",
        headers: {
          "X-Mashape-Key": "1dxu1jK3JymshsynO0mMMWuQOYHxp1pR5Q8jsnJGSzuBNxtBp1",
           "Content-Type": "application/x-www-form-urlencoded",
           "Accept": "application/json"
        },
        xhrFields: {
            withCredentials: false
        },
        success: function (data) { 
            console.log("data",data);
//             data=(JSON.parse(data)); 
            var quote = data.quote;
            var author = data.author;
//             quote = "A year spent in artificial intelligence is enough to make one believe in God.";
//             author = "Alan Perlis";
            $('#quote_text').append("<p>"+ quote + "</p><p>&mdash; " + author + "</p>");
            console.log("success");
            
        },
        error: function (data) {
            quote = "A year spent in artificial intelligence is enough to make one believe in God.";
            author = "Alan Perlis";
            $('#quote_text').append("<p>"+ quote + "</p><p>&mdash; " + author + "</p>");
            console.log("error");
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

      // $.ajax({
      //   url: "http://formspree.io/cselakshmanan@gmail.com",
      //   type: "POST",
      //   data: {
      //     name: name,
      //     phone: phone,
      //     email: email,
      //     message: message
      //   },
      //   cache: false,
      //   success: function() {
      //     // Success message
      //     $('#success').html("<div class='alert alert-success'>");
      //     $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
      //       .append("</button>");
      //     $('#success > .alert-success')
      //       .append("<strong>Your message has been sent. </strong>");
      //     $('#success > .alert-success')
      //       .append('</div>');
      //     //clear all fields
      //     $('#contactForm').trigger("reset");
      //   },
      //   error: function() {
      //     // Fail message
      //     $('#success').html("<div class='alert alert-danger'>");
      //     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
      //       .append("</button>");
      //     $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
      //     $('#success > .alert-danger').append('</div>');
      //     //clear all fields
      //     $('#contactForm').trigger("reset");
      //   },
      //   complete: function() {
      //     setTimeout(function() {
      //       $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
      //     }, 1000);
      //   }
      // });
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
