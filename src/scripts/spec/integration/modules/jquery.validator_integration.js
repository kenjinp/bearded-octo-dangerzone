//dependencies
var path = require('path'),
    Nightmare = require('nightmare'),
    should = require('chai').should();

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
  });
};

module.exports = jqvIntegration;
