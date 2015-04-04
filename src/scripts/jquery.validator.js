(function($) {
  'use strict';
  $.fn.validator = function() {
    this.each(function() {
      var elm = $(this);
      if (elm.is('input')) {
        elm.text('input');
      } else {
        elm.text('not input');
      }
    });
    return this;
  };
})(jQuery);
