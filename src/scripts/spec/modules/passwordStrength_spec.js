'use strict';

var passStrength = require('../../passwordStrength'),
    should = require('chai').should();

var passwords = [
  ['strong', 'ABCXYZ123456!', 85],
  ['good', 'ABCXYZ12345', 65],
  ['bad', 'ABCXYZ', 30],
  ['poor', 'ABC', 15]
]

module.exports = describe('PasswordStrength Module', function() {

  describe('#passStrength.rate()', function() {

    //test for blank case
    it('should return 0 for blank pass', function() {
      passStrength.rate('').should.equal(0);
    });

    for (var i in passwords) {
      var passwordList = passwords[i],
          rating = passwordList[0],
          password = passwordList[1],
          score = passwordList[2];
      //test for other cases
      it('should return '+ score + ' for a ' + rating + 'password: ' + password,
        function() {
          passStrength.rate(password).should.equal(score);
      });
    }
  });

  describe('#passStrength.check()', function() {

    //test for blank case
    it('should return "poor" for a blank password', function() {
      passStrength.check('').should.equal('poor');
    });

    for (var i in passwords) {
      var passwordList = passwords[i],
          rating = passwordList[0],
          password = passwordList[1],
          score = passwordList[2];
      //test for other cases
      it('should return '+ rating + ' for password: ' + password,
        function() {
          passStrength.check(password).should.equal(rating);
      });
    }
  });
});
