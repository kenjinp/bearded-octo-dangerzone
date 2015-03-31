//validate input function
module.exports = function(elm) {
  var value = elm.val();

  switch (elm.prop('type')) {
    case 'email':
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (value == '') {
        elm.removeClass('valid');
        elm.addClass('invalid');
        console.log('email blank');
        return 'muss ausgefüllt werden';
      } if (!re.test(value)) {
        elm.removeClass('valid');
        elm.addClass('invalid');
        console.log('doesnt look like an email');
        return 'dies ist nicht eine email';
      } else {
        elm.removeClass('invalid');
        elm.addClass('valid');
        console.log('email valid');
      }
      break;
    case 'password':
    case 'text':
      if (value == '') {
        elm.removeClass('valid');
        elm.addClass('invalid');
        console.log('text or passwordfield invalid by blank');
        return 'muss ausgefüllt werden';
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
        return 'Bitte stimmen Sie den Geschäfts';
      } else {
        elm.removeClass('invalid');
        elm.addClass('valid');
        console.log('valid');
      }
      break;
  }
}
