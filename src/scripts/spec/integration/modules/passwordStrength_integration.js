//dependencies
var path = require('path'),
    Nightmare = require('nightmare'),
    should = require('chai').should();

var password = {
  strong: 'ABCXYZ123456!',
  good: 'ABCXYZ12345',
  bad: 'ABCXYZ',
  poor: 'ABC',
}

var passwordStrengthIntegration = function(url) {
  describe('#passwordStrength', function() {
    it('should indicate a strong password', function(done) {
      new Nightmare()
        .goto(url)
        .type('input[name="passwort"]', password.strong)
        .evaluate(function() {
            var el = document.querySelector('.strength');
            var text = el.textContent || el.innerText;
            return text
        }, function(result) {
          result.should.equal('strong');
          done();
        })
        .run();
    });
    it('should indicate a good password', function(done) {
      new Nightmare()
        .goto(url)
        .type('input[name="passwort"]', password.good)
        .evaluate(function() {
            var el = document.querySelector('.strength');
            var text = el.textContent || el.innerText;
            return text
        }, function(result) {
          result.should.equal('gut');
          done();
        })
        .run();
    });
    it('should indicate a bad password', function(done) {
      new Nightmare()
        .goto(url)
        .type('input[name="passwort"]', password.bad)
        .evaluate(function() {
            var el = document.querySelector('.strength');
            var text = el.textContent || el.innerText;
            return text
        }, function(result) {
          result.should.equal('bad');
          done();
        })
        .run();
    });
    it('should indicate a poor password', function(done) {
      new Nightmare()
        .goto(url)
        .type('input[name="passwort"]', password.poor)
        .evaluate(function() {
            var el = document.querySelector('.strength');
            var text = el.textContent || el.innerText;
            return text
        }, function(result) {
          result.should.equal('poor');
          done();
        })
        .run();
    });
  });
};

module.exports = passwordStrengthIntegration;
