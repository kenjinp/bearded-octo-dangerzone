//browserify JQUERY
global.jQuery = global.$ = require('jquery');

var passStrength = require('./passwordStrength'),
    validator = require('./jquery.validator');

  //add the show password box if javascript is enabled
  function showPass() {
    var passField = $('.show-pass-field');
    passField.each(function(index, input) {
      var $input = $(input);
      passField.after(
        '<span class="input-tag">' +
        '<input type="checkbox" name="show-pass"></input>' +
        '<label for="show-pass">Anzeigen</label>' +
        '</span>'
      );
      $('input[name="show-pass"]').click(function() {
        var change= $(this).is(':checked') ? 'text' : 'password';
        var rep = $('<input type="' + change + '" />')
          .attr('id', $input.attr('id'))
          .attr('name', $input.attr('name'))
          .attr('class', $input.attr('class'))
          .prop('required', true)
          .val($input.val())
          .insertBefore($input);
        $input.remove();
        $input = rep;
        showPassStrength();
      });
    });
  }

  //password strength visualization
  function showPassStrength() {
    $('input.show-pass-field').on("keypress keyup keydown", function() {
      var pass = $(this).val();
      if (pass === '') {
        $('.pass-strength').removeClass('shown');
        $('.pass-strength').addClass('hidden');
      } else {
        $('.strength').text(passStrength.check(pass));
        $('.pass-strength').removeClass('hidden');
        $('.pass-strength').addClass('shown');
      }

      //assign colors to password feedback message
      if (passStrength.rate(pass) > 60) {
        $('.pass-strength').addClass('success');
        $('.pass-strength').removeClass('warning');
      } else {
        $('.pass-strength').addClass('warning');
        $('.pass-strength').removeClass('success');
      }
    });
  }

$(document).ready(function() {
  showPass();
  showPassStrength();

  //Validator plugin config
  var options = {
    //error messages for this form
    'errorMessages' : {
      'required' : 'muss ausgefüllt werden',
      'email' : 'dies ist nicht eine email',
      'checkbox' : 'Bitte stimmen Sie den Geschäfts'
    },
    //bind warnings on validator's onSubmit when form is submitted
    onSubmit: function(validated) {
      if (validated === true) {
        //form valid, show errors
        $('.messages.success').removeClass('hidden').addClass('shown');
        $('.messages.warning').removeClass('shown').addClass('hidden');
        //we can return true here to submit the form
      } else {
        //form invalid, show user errors
        $('.messages.warning').removeClass('hidden').addClass('shown');
        $('.messages.success').removeClass('shown').addClass('hidden');
      }
    }
  };

  //apply validaiton to form
  $('form').validator(options);

});
