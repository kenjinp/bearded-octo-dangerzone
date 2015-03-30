//mocha testing
'use strict';

var path = require('path');
var Nightmare = require('nightmare');
var should = require('chai').should()

var bob = {
  vorname: 'bob',
  nochname: 'schmidt',
  mitgliedsname: 'bobschmidt2001',
  email: 'bob@lol.com',
  passwort: 'bobisthebest'
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

describe('Signup Form', function() {

  this.timeout(20000);
  var url = 'file:///Users/Kenjin/Repositories/bearded-octo-dangerzone/build/index.html'

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
  });

  describe('type name into name input', function() {
    it('it should have the name value in input', function(done) {
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

  describe('submit valid form', function() {
    it('it should show a success message', function(done) {
      new Nightmare()
        .goto(url)
        .type('input[name="vorname"]', bob.vorname)
        .type('input[name="nachname"]', bob.nachname)
        .type('input[name="mitgliedsname"]', bob.mitgliedsname)
        .type('input[name="email"]', bob.email)
        .type('input[name="passwort"]', bob.passwort)
        .click('inpit[name="terms"]')
        .click('.call-to-action')
        .evaluate(function() {
            var el = document.querySelector('#success');
            return el.classList.contains('hidden');
        }, function(result) {
          result.should.not.equal(true);
          done();
        })
        .run();
    });
  });




});//SignupFormEnd
