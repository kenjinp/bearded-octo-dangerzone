//mocha testing
'use strict';

//dependencies
var path = require('path'),
    Nightmare = require('nightmare'),
    should = require('chai').should(),
    fs = require('fs');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

console.log(__dirname);
console.log(getDirectories(__dirname));

//tests
var passStrengthSpec = require('./modules/passwordStrength_spec'),
    integrationSpec = require('./integration/signup_spec')

//run pass strength module;
passStrengthSpec;

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
  var url = 'file://' + path.resolve(__dirname, '../../../build/index.html');

  describe('Is page there?', function() {
    it('should show form when loaded', function(done) {
      new Nightmare({webSecurity:false})
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

  describe('#passwordStrength', function() {

    describe('write crappy password', function() {
      it('it should indicate bad password', function(done) {
        new Nightmare()
          .goto(url)
          .type('input[name="passwort"]', 'aaaaa')
          .evaluate(function() {
              var el = document.querySelector('.pass-strength');
              return el.classList.contains('warning');
          }, function(result) {
            result.should.not.equal(false);
            done();
          })
          .run();
      });
    });

    describe('write great password', function() {
      it('it should indicate good password', function(done) {
        new Nightmare()
          .goto(url)
          .type('input[name="passwort"]', 'aBanana123!@Jupiter')
          .evaluate(function() {
              var el = document.querySelector('.pass-strength');
              return el.classList.contains('success');
          }, function(result) {
            result.should.not.equal(false);
            done();
          })
          .run();
      });
    });

  });//passwordStrength end

});//SignupFormEnd
