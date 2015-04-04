'use strict';

var passStrength = require('../../passwordStrength'),
    should = require('chai').should();

module.exports = describe('PasswordStrength Module', function() {

  describe('#passStrength.rate()', function() {
    it('should return 0 for blank pass', function() {
      passStrength.rate('').should.equal(0);
    });
  });

  describe('#passStrength.check()', function() {
    it('should return "poor" for a blank password', function() {
      passStrength.check('').should.equal('poor');
    });
  });
});
