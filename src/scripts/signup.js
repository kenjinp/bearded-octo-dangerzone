"use strict";
//browserify JQUERY
var $ = require('jquery');
var passStrength = require('./passwordStrength')

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

  function removeHTMLValidation() {
    document.querySelector( "form" )
    .addEventListener( "invalid", function( event ) {
        event.preventDefault();
    }, true );
  };

  function noBlankValidation() {
    $( "form" ).each(function() {
      var form = this;
      // Add a tooltip to each invalid field
      var invalidFields = $( ":invalid", form ).each(function() {
          var field = $(this).append('<span>invalid!!!</span>');
      });

      $(':valid', form).each(function() {
        $(this).removeClass('invalid');
      });

      // If there are errors, give focus to the first invalid field
      invalidFields.first().trigger( "focus" ).eq( 0 ).focus();
      invalidFields.first().addClass('invalid');
    });
  };

  function validate(elm) {
    var value = elm.val();

    switch (elm.attr('type')) {
      case 'email':
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!re.test(value)) {
          elm.removeClass('valid');
          elm.addClass('invalid');
          console.log('email invalid by regex')
        } else {
          elm.removeClass('invalid')
          elm.addClass('valid');
          console.log('valid')
        }
      case 'text' || 'password':
        if (value == '') {
          elm.removeClass('valid');
          elm.addClass('invalid');
          console.log('text or passwordfield invalid by blank')
        } else {
          elm.removeClass('invalid');
          elm.addClass('valid');
          console.log('valid');
        }
        break;
      case 'checkbox':
        if (elm.is(':checked') == false) {
          elm.removeClass('valid');
          elm.addClass('invalid');
          console.log('checkbox not checked')
        } else {
          elm.removeClass('invalid');
          elm.addClass('valid');
          console.log('valid');
        }
        break;
    }
  }

  showPass();
  removeHTMLValidation();

  //$('input[required]:visible').each(function(index) {
  //}

  $( "input" ).blur(function() {
    validate($(this));
  });

  $('.call-to-action').on('click', function(even) {
    event.preventDefault();
    $('input[required]:visible').each(function(index) {
      validate($(this))
    });

    if ($('form input[require]').length == $('form input.valid').length) {
      $('.messages.success').removeClass('hidden').addClass('shown');
    } else {
      $('.messages.warning').removeClass('hidden').addClass('shown');
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

    //assign colors
    if (passStrength.rate(pass) > 60) {
      $('.pass-strength').addClass('success');
      $('.pass-strength').removeClass('warning');
    } else {
      $('.pass-strength').addClass('warning');
      $('.pass-strength').removeClass('success');
    }

  });
