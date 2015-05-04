var should = require('chai').should();
var assert = require('chai').assert;
var IPS    = require('../index');

var ips = IPS();

var singleImageData = {
  "height": 100,
  "width":  100
  // "filter": "greyscale",
  // "foreground": "ffffff",
  // "background": "999999",
  // "type": "gif",
  // "text": "Hello world"
};

var srcsetImageArray = [
 {
  height: 100,
  width: 100
 },
 {
  height: 200,
  width: 200
 }
];

var srcTest1 = 'http://placehold.it/100x100';
var srcTest2 = 'http://placehold.it/100x100 100w 100h, http://placehold.it/200x200 200w 200h';

describe('#placeholdit', function() {

  it('should have a placeholdit function', function() {
    assert.isFunction(ips.placeholdit.src);
  });

  it('should return a string of "' + srcTest1 + '"', function() {
    ips.placeholdit.src(singleImageData).should.equal(srcTest1);
  });

  it('should return a srcset string of "' + srcTest2 +'"', function() {
    ips.placeholdit.srcset(srcsetImageArray).should.equal(srcTest2);
  });
});