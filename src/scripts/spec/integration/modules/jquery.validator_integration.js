//dependencies
var path = require('path'),
    Nightmare = require('nightmare'),
    should = require('chai').should();

var bob = {
  vorname: 'bob',
  nochname: 'schmidt',
  mitgliedsname: 'bobschmidt2001',
  email: 'bob@lol.com',
  passwort: 'bobisthebest'
};

var jqvIntegration = function(url) {
  describe('#jQuery Validator', function() {
    it('should confirm initialization by adding class "validating" to form',
      function(done) {
        new Nightmare()
          .goto(url)
          .evaluate(function() {
              var el = document.querySelector('form');
              return el.classList.contains('validating');
          }, function(result) {
            result.should.equal(true);
            done();
          })
          .run();
      });
      it('it should show a success message if form submitted and inputs are validated', function(done) {
        new Nightmare()
          .goto(url)
          .type('input[name="vorname"]', bob.vorname)
          .type('input[name="nachname"]', bob.nachname)
          .type('input[name="mitgliedsname"]', bob.mitgliedsname)
          .type('input[name="email"]', bob.email)
          .type('input[name="passwort"]', bob.passwort)
          .click('input[name="terms"]')
          .click('.call-to-action')
          .evaluate(function() {
              var el = document.querySelector('.success');
              return el.classList.contains('hidden');
          }, function(result) {
            result.should.not.equal(false);
            done();
          })
          .run();
      });
      it('it should show a warning message if form submitted but notvalid', function(done) {
        new Nightmare()
          .goto(url)
          .type('input[name="vorname"]', bob.vorname)
          .type('input[name="nachname"]', bob.nachname)
          .type('input[name="mitgliedsname"]', bob.mitgliedsname)
          .type('input[name="email"]', bob.email)
          //.type('input[name="passwort"]', bob.passwort)
          .click('input[name="terms"]')
          .click('.call-to-action')
          .evaluate(function() {
              var el = document.querySelector('.warning');
              return el.classList.contains('hidden');
          }, function(result) {
            result.should.not.equal(false);
            done();
          })
          .run();
      });
  });
};

module.exports = jqvIntegration;
