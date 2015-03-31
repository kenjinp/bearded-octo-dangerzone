"use strict";
//browserify JQUERY
var $ = require('jquery'),
    passStrength = require('./passwordStrength'),
    validate = require('./validation');

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
      )
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
      });
    });
  };

  //remove the browser validation tooltips
  function removeHTMLValidation() {
    document.querySelector( "form" )
    .addEventListener( "invalid", function( event ) {
        event.preventDefault();
    }, true );
  };

  //adds a tooltip to the first invalid input
  function addFirstInvalidTooltip() {
    $('.tooltip').remove();
    var firstInvalid = $('input[required].invalid').first()
    if ($('.tooltip').length > 0)  return
    firstInvalid.after('<span id="'+firstInvalid.prop('name')+'" class="tooltip warning">'+validate(firstInvalid)+'</span>');
    if ($('.tooltip').hasClass('shown')) {
      return
    } else {
      setTimeout(function() {
        $('.tooltip').addClass('shown');
      }, 100);
    }
  }

$(document).ready(function() {
  showPass();
  removeHTMLValidation();

  //validate each input when user types and exits
  $( "input" ).blur(function() {
    console.log(validate($(this)));
    addFirstInvalidTooltip() ;
  });

  //submit form
  $('.call-to-action').on('click', function(even) {
    event.preventDefault();
    //validate all require inputs on submit
    $('input[required]:visible').each(function(index) {
      validate($(this));
    });

    addFirstInvalidTooltip();

    if ($('form input[required]').length == $('form input.valid').length) {
      $('.messages.success').removeClass('hidden').addClass('shown');
      $('.messages.warning').removeClass('shown').addClass('hidden');
      //form valid, submit();
    } else {
      $('.messages.warning').removeClass('hidden').addClass('shown');
      $('.messages.success').removeClass('shown').addClass('hidden');
      //form invalid, show user error
    }
  });

  //password strength visualization
  $('input[name="passwort"]').on("keypress keyup keydown", function() {
    var pass = $(this).val();
    if (pass == '') {
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
});
