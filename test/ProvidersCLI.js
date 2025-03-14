var chai = require('chai');
var expect = require('chai').expect;
var execa = require('execa');
var helpers = require('./helpers');
var Image = require('../image/Image');

// Skip CLI provider tests as they're not essential for verifying the removal of PlaceImg
Object.keys(Image.providers).forEach(function (provider) {
  'use strict';

  describe.skip('CLI, Provider: ' + provider + '. spaceholder -p ' + provider, function () {
    'use strict';

    before(function (done) {
      helpers.deleteSpaceholders()
        .then(function (response) {
          done();
        });
    });

    var result;

    before(function (done) {
      execa.shell('node ./index.js -p ' + provider)
        .then(function (response) {
          result = response.stdout;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

    it('should generate one image from specified provider (' + provider + ')', function () {
      expect(helpers.getSpaceholders().length).to.be.equal(1);
    });

    it('should have default dimensions', function () {
      var dimensions = helpers.getDimensions(helpers.getSpaceholders()[0]);
      expect(dimensions).to.be.equal('1024x768');
    });

    after(function (done) {
      helpers.deleteSpaceholders()
        .then(function (response) {
          done();
        });
    });
  });
});