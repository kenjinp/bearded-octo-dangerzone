(function($) {
  'use strict';

  /*/////////////////////////////////////////////
      Very Small Validatoion Plugin!
            THE VALIDATOR!

  Use 1 : $(form).validator()
  -------------------------------------------------
  - Will validate all inputs in form supplied with
  the 'required' attribute. Form must have any ID
  - Form Submission validated only if submit button
  Has an ID of #submit.
  - Will append error message tooltips if supplied
  with error messages in options
  - applies invalid or valid classes to inputs

  Use 2 : $(input).validator()
  ------------------------------------------------
  - Will validate input and return true or false
  and apply invalid or valid classes

  ////////////////////////////////////////////*///

  var methods = {

    init: function(form, options) {
      var inputs = $('input[required]', form);
      form.addClass('validating');
      methods.removeHTMLValidation(form);
      methods.blurValidate(form, inputs, options);
      methods.afterSubmit(form, inputs, options);
    },

    removeHTMLValidation: function(form) {
      var formId = form.attr('id');
      document.getElementById(formId)
        .addEventListener('invalid', function(event) {
          event.preventDefault();
        }, true );
    },

    //validate each input when user types and exits
    blurValidate: function(form, inputs, options) {
      inputs.blur(function() {
        methods.showValidity($(this), options);
        methods.addFirstInvalidTooltip(form, options)
      });
    },

    showValidity: function(el, options) {
      var errorMessages = options.errorMessages;
      methods.validate(el, function(error) {
        if (!error) {
          el.removeClass('invalid');
          el.addClass('valid');
        } else {
          el.removeClass('valid');
          el.addClass('invalid');
        }
      });
    },

    //validate (callback(error))
    validate: function(el, callback) {
      var value = el.val();

      switch (el.prop('type')) {
        case 'email':
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          if (value == '') {
            if (callback) callback('required');
            return false;
          } else if (!re.test(value)) {
            if (callback) callback('email');
            return false;
          }
          else {
            if (callback) callback();
            return true;
          }
          break;
        case 'password':
        case 'text':
          if (value == '') {
            if (callback) callback('required');
            return false;
          }
          else {
            if (callback) callback();
            return true
          }
          break;
        case 'checkbox':
          if (el.is(':checked') == false) {
            if (callback) callback('checkbox');
            return false;
          }
          else {
            if (callback) callback();
            return true;
          }
          break;
      }
    },

    getErrorMessage: function(error, options) {
      var errorMessages = options.errorMessages;
      for (var i in errorMessages) {
        if (i === error)
          return errorMessages[i]
      }
    },

    addFirstInvalidTooltip: function(form, options) {
      $('.tooltip').remove();
      var firstInvalid = $('input[required].invalid', form).first();
      var msg;
      methods.validate(firstInvalid, function(error){
        msg = methods.getErrorMessage(error, options);
      });
      if ($('.tooltip').length > 0)  return;
      firstInvalid.after(
        '<span id="' +
        firstInvalid.prop('name') +
        '" class="tooltip warning">' +
        msg +
        '</span>' );
      if ($('.tooltip').hasClass('shown')) {
        return;
      } else {
        setTimeout(function() {
          $('.tooltip').addClass('shown');
        }, 100);
      }
    },

    //if validation is complete return a callback
    afterSubmit: function(form, inputs, options) {
      $('#submit').on('click', function(event) {
        event.preventDefault();
        //validate all inputs
        inputs.each(function() {
          methods.showValidity($(this), options)
        });
        //show error messages
        methods.addFirstInvalidTooltip(form, options)
        //check if entire form is valid
        var formValidity;
        if (inputs.length !== $('input.valid', form).length) {
          formValidity = false;
        } else {
          formValidity = true;
        }
        //run onSubmit callback if requested
        if (options.onSubmit && options.onSubmit(formValidity)) {
          return;
        } else if (options.onSubmit && !options.onSubmit(formValidity)) {
          form.submit();
        } else {
          form.submit();
        }
      });
    }

  }

  //Plugin access point
  $.fn.validator = function(options) {

      var target = $(this);

      if (target.is('form'))
        methods.init(target, options);

      else if (target.is('input'))
        methods.showValidity(target);

      else return this
  };

})(jQuery);
