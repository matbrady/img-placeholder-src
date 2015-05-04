var should = require('chai').should();
var assert = require('chai').assert;
var IPS    = require('../index');

var ips = IPS();

// var defaults = {
//   "height": 100,
//   "width":  100,
//   "filter": "greyscale",
//   "foreground": "ffffff",
//   "background": "999999",
//   "format": "gif",
//   "text": "Hello world",
//   category: "people"
// };

var testData = {
  all: {
    category: {
      category: "people",
      height: 100,
      width: 100
    },
    colors: {
      height: 100,
      width: 100,
      foreground: '000000',
      background: 'dddddd'
    },
    filter: {
      filter: "greyscale",
      height: 100,
      width: 100
    },
    format: {
      height: 100, 
      width: 100, 
      format: 'jpg' 
    },
    src: {
      height: 100,
      width: 100
    },
    srcset: [
      {
        height: 100,
        width: 100
      },
      {
        height: 200,
        width: 200
      }
    ],
    text: {
      height: 100,
      width: 100,
      text: "hello world"
    }
  },
  placecage: {
    crazy: {
      filter: 'crazy',
      height: 100,
      width: 100
    }
  }
};

var results = {
  placeholdit: {
    colors:  "http://placehold.it/100x100/dddddd/000000",
    format: "http://placehold.it/100x100.jpg",
    src:    "http://placehold.it/100x100",
    srcset: 'http://placehold.it/100x100 100w 100h, http://placehold.it/200x200 200w 200h',
    text:   "http://placehold.it/100x100&text=hello+world"
  },
  lorempixel: {
    category: "http://lorempixel.com/100/100/people",
    filter: "http://lorempixel.com/g/100/100",
    src: "http://lorempixel.com/100/100",
    srcset: "http://lorempixel.com/100/100 100w 100h, http://lorempixel.com/200/200 200w 200h"
  },
  fillmurray: {
    filter: "http://fillmurray.com/g/100/100",
    src: "http://fillmurray.com/100/100",
    srcset: "http://fillmurray.com/100/100 100w 100h, http://fillmurray.com/200/200 200w 200h"
  },
  placecage: {
    filter: "http://placecage.com/g/100/100",
    crazy: "http://placecage.com/c/100/100",
    src: "http://placecage.com/100/100",
    srcset: "http://placecage.com/100/100 100w 100h, http://placecage.com/200/200 200w 200h"
  },
  placeimg: {
    filter: "http://placeimg.com/100/100/any/greyscale",
    src: "http://placeimg.com/100/100/any",
    srcset: "http://placeimg.com/100/100/any 100w 100h, http://placeimg.com/200/200/any 200w 200h"
  }
};

describe('#placeholdit', function() {

  it('should have a placeholdit function', function() {
    assert.isFunction(ips.placeholdit.src);
  });

  it('should return a string of "' + testData.all.src + '"', function() {
    ips.placeholdit.src(testData.all.src).should.equal(results.placeholdit.src);
  });

  it('should return a srcset string of "' + results.placeholdit.srcset +'"', function() {
    ips.placeholdit.srcset(testData.all.srcset).should.equal(results.placeholdit.srcset);
  });

  it('should accept text and return a string of "' + results.placeholdit.text +'"', function() {
    ips.placeholdit.src(testData.all.text).should.equal(results.placeholdit.text);
  });

  it('should accept a format and return a string of "' + results.placeholdit.format +'"', function() {
    ips.placeholdit.src(testData.all.format).should.equal(results.placeholdit.format);
  });

   it('should accept a colors and return a string of "' + results.placeholdit.colors +'"', function() {
    ips.placeholdit.src(testData.all.colors).should.equal(results.placeholdit.colors);
  });

});

describe('#lorempixel', function() {

  it('should have a lorempixel function', function() {
    assert.isFunction(ips.lorempixel.src);
  });

  it('should return a string of "' + results.lorempixel.src + '"', function() {
    ips.lorempixel.src(testData.all.src).should.equal(results.lorempixel.src);
  });

  it('should return a srcset string of "' + results.lorempixel.srcset +'"', function() {
    ips.lorempixel.srcset(testData.all.srcset).should.equal(results.lorempixel.srcset);
  });

  it('should return a filter string of "' + results.lorempixel.filter  +'"', function() {
    ips.lorempixel.src(testData.all.filter).should.equal(results.lorempixel.filter);
  });

  it('should return a category string of "' + results.lorempixel.category  +'"', function() {
    ips.lorempixel.src(testData.all.category).should.equal(results.lorempixel.category);
  });
  
});

describe('#fillmurray', function() {

  it('should have a fillmurray function', function() {
    assert.isFunction(ips.fillmurray.src);
  });

  it('should return a string of "' + results.lorempixel.src + '"', function() {
    ips.fillmurray.src(testData.all.src).should.equal(results.fillmurray.src);
  });

  it('should return a srcset string of "' + results.lorempixel.srcset +'"', function() {
    ips.fillmurray.srcset(testData.all.srcset).should.equal(results.fillmurray.srcset);
  });

  it('should return a filter string of "' + results.fillmurray.filter  +'"', function() {
    ips.fillmurray.src(testData.all.filter).should.equal(results.fillmurray.filter);
  });
  
});

describe('#placecage', function() {

  it('should have a placecage function', function() {
    assert.isFunction(ips.placecage.src);
  });

  it('should return a string of "' + results.placecage.src + '"', function() {
    ips.placecage.src(testData.all.src).should.equal(results.placecage.src);
  });

  it('should return a srcset string of "' + results.placecage.srcset +'"', function() {
    ips.placecage.srcset(testData.all.srcset).should.equal(results.placecage.srcset);
  });

  it('should return a filter string of "' + results.placecage.filter  +'"', function() {
    ips.placecage.src(testData.all.filter).should.equal(results.placecage.filter);
  });

  it('should return a filter string of "' + results.placecage.crazy  +'"', function() {
    ips.placecage.src(testData.placecage.crazy).should.equal(results.placecage.crazy);
  });
  
});

describe('#placeimg', function() {

  it('should have a placeimg function', function() {
    assert.isFunction(ips.placeimg.src);
  });

  it('should return a string of "' + results.placeimg.src + '"', function() {
    ips.placeimg.src(testData.all.src).should.equal(results.placeimg.src);
  });

  it('should return a srcset string of "' + results.placeimg.srcset +'"', function() {
    ips.placeimg.srcset(testData.all.srcset).should.equal(results.placeimg.srcset);
  });

  it('should return a filter string of "' + results.placeimg.filter  +'"', function() {
    ips.placeimg.src(testData.all.filter).should.equal(results.placeimg.filter);
  });
  
});


