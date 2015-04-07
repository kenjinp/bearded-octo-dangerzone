'use strict';

//dependencies
var path = require('path'),
    Nightmare = require('nightmare'),
    should = require('chai').should();

//module integration tests
var passStrengthIntegration = require('./modules/passwordStrength_integration'),
    jqvIntegration = require('./modules/jquery.validator_integration');


//quick fake user
var bob = {
  vorname: 'bob',
  nochname: 'schmidt',
  mitgliedsname: 'bobschmidt2001',
  email: 'bob@lol.com',
  passwort: 'bobisthebest'
};

describe('Signup Form', function() {

  this.timeout(20000);
  var url = 'file://' + path.resolve(__dirname, '../../../../build/index.html');

  describe('Is page there?', function() {
    it('should show form when loaded', function(done) {
      new Nightmare()
        .goto(url)
        .evaluate(function() {
          return document.querySelectorAll('form').length;
        }, function(result) {
          result.should.equal(1);
          done();
        })
        .run();
    });

    it('it should have the name value in input if we type something there', function(done) {
      new Nightmare()
        .goto(url)
        .type('input[name="vorname"]',bob.vorname)
        .evaluate(function() {
          return document.querySelector('input[name="vorname"]').value;
        }, function(result) {
          result.should.equal(bob.vorname);
          done();
        })
        .run();
    });
  });

  describe('#showPass()', function() {
    it('should add show-password to end of password input', function(done) {
      new Nightmare()
        .goto(url)
        .evaluate(function() {
          return document.querySelectorAll('input[name="show-pass"]').length;
        }, function(result) {
          result.should.equal(1);
          done();
        })
        .run();
    });
    it('should show password if show-pass is checked', function(done) {
      new Nightmare()
        .goto(url)
        .click('input[name="show-pass"]')
        .evaluate(function() {
          return document.querySelectorAll('input[name="passwort"]')[0].getAttribute('type');
        }, function(result) {
          result.should.equal('text');
          done();
        })
        .run();
    });
  });

  //module integrations
  passStrengthIntegration(url);
  jqvIntegration(url);

});//SignupFormEnd
