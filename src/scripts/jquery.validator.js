(function($) {
'use strict';

//remove HTML5 validation
function removeHTMLValidation() {
  document.querySelector( "form" )
  .addEventListener( "invalid", function( event ) {
      event.preventDefault();
  }, true );
}

//validate

//make tooltip

//attatch tooltip to first invalid on form
function addFirstInvalidTooltip() {
  $('.tooltip').remove();
  var firstInvalid = $('input[required].invalid').first();
  if ($('.tooltip').length > 0)  return;
  firstInvalid.after('<span id="'+firstInvalid.prop('name')+'" class="tooltip warning">'+validate(firstInvalid)+'</span>');
  if ($('.tooltip').hasClass('shown')) {
    return;
  } else {
    setTimeout(function() {
      $('.tooltip').addClass('shown');
    }, 100);
  }
}

//get_error_message

//if validation is complete return a callback

//validate each input when user types and exits
function blur() {
  $('input', form).blur(function() {
    validate($(this));
    addFirstInvalidTooltip() ;
  });
}

var methods = {

  init: function(form) {
    form.addClass('validating');
  }
}

$.fn.validator = function() {

    var form = $(this);
    if(!form[0]) return form;

    methods.init(form);

    return this;
  };
})(jQuery);
