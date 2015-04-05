(function($) {
'use strict';

$.fn.validator = function() {
    this.each(function() {
      var elm = $(this);
      if (elm.is('input')) {
        console.log('Im alive!');
      } else {
        console.log('HelloWorld!');
      }
    });
    return this;
  };
})(jQuery);
