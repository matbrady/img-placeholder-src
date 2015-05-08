var should = require('chai').should();
var assert = require('chai').assert;
var IPS    = require('../index');

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
  general: {
    protocol: 'https://placehold.it/100x100'
  },
  placeholdit: {
    colors:  "//placehold.it/100x100/dddddd/000000",
    format: "//placehold.it/100x100.jpg",
    src:    "//placehold.it/100x100",
    srcset: '//placehold.it/100x100 100w, //placehold.it/200x200 200w',
    text:   "//placehold.it/100x100&text=hello+world"
  },
  lorempixel: {
    category: "//lorempixel.com/100/100/people",
    filter: "//lorempixel.com/g/100/100",
    src: "//lorempixel.com/100/100",
    srcset: "//lorempixel.com/100/100 100w, //lorempixel.com/200/200 200w",
    unqiue: "//lorempixel.com/102/102 100w, //lorempixel.com/202/202 200w"
  },
  fillmurray: {
    filter: "//fillmurray.com/g/100/100",
    src: "//fillmurray.com/100/100",
    srcset: "//fillmurray.com/100/100 100w, //fillmurray.com/200/200 200w",
    unqiue: "//fillmurray.com/102/102 100w, //fillmurray.com/202/202 200w"
  },
  placecage: {
    filter: "//placecage.com/g/100/100",
    crazy: "//placecage.com/c/100/100",
    src: "//placecage.com/100/100",
    srcset: "//placecage.com/100/100 100w, //placecage.com/200/200 200w",
    unqiue: "//placecage.com/102/102 100w, //placecage.com/202/202 200w"
  },
  placeimg: {
    filter: "//placeimg.com/100/100/any/greyscale",
    src: "//placeimg.com/100/100/any",
    srcset: "//placeimg.com/100/100/any 100w, //placeimg.com/200/200/any 200w",
    unqiue: "//placeimg.com/102/102/any 100w, //placeimg.com/202/202/any 200w"
  }
};

describe('img-placeholder-src', function() {


  // describe('#srcset', function() {

  //   it('should have a srcset function', function() {
  //     assert.isFunction(ips.srcset);
  //   });

  // });
  // 
  context('general', function() {

    before(function(){
      ips = IPS();
    });

    after(function() {
      ips = null;
    });

    it('should have a srcset function', function() {
      assert.isFunction(ips.srcset);
    });

    it('should have a src function', function() {
      assert.isFunction(ips.src);
    });

  });

  describe('#src', function() {

    context('without service override', function() {

      before(function(){
        ips = IPS();
      });

      after(function() {
        ips = null;
      });

      it('should generate a placeholdit src by default: ' + results.placeholdit.src, function() {
        ips.src(testData.all.src).should.equal(results.placeholdit.src);
      });

      it('should generate a lorempixel src: ' + results.lorempixel.src, function() {
        ips.src(testData.all.src, 'lorempixel').should.equal(results.lorempixel.src);
      });

      it('should generate a fillmurray src: ' + results.fillmurray.src, function() {
        ips.src(testData.all.src, 'fillmurray').should.equal(results.fillmurray.src);
      });

      it('should generate a placecage src: ' + results.placecage.src, function() {
        ips.src(testData.all.src, 'placecage').should.equal(results.placecage.src);
      });

      it('should generate a placeimg src: ' + results.placeimg.src, function() {
        ips.src(testData.all.src, 'placeimg').should.equal(results.placeimg.src);
      });

    });

    context('with service override', function() {

      before(function(){
        ips = IPS({
          serviceOverride: 'placeimg'
        });
      });

      after(function() {
        ips = null;
      });

      it('should generate a placeimg src since serviceOverride was set: ' + results.placeimg.src, function() {
        ips.src(testData.all.src).should.equal(results.placeimg.src);
      });

    });

    context('with protocol override', function() {

      before(function(){
        ips = IPS({
          protocol: 'https'
        });
      });

      after(function() {
        ips = null;
      });

      it('should generate a src: ' + results.general.protocol, function() {
        ips.src(testData.all.src).should.equal(results.general.protocol);
      });

    });

  });

  describe('#srcset', function() {

    context('without service override', function() {

      before(function(){
        ips = IPS();
      });

      after(function() {
        ips = null;
      });

      it('should generate a placeholdit srcset by default: ' + results.placeholdit.srcset, function() {
        ips.srcset(testData.all.srcset).should.equal(results.placeholdit.srcset);
      });

      it('should generate a lorempixel srcset: ' + results.lorempixel.srcset, function() {
        ips.srcset(testData.all.srcset, 'lorempixel').should.equal(results.lorempixel.srcset);
      });

      it('should generate a fillmurray srcset: ' + results.fillmurray.srcset, function() {
        ips.srcset(testData.all.srcset, 'fillmurray').should.equal(results.fillmurray.srcset);
      });

      it('should generate a placecage srcset: ' + results.placecage.srcset, function() {
        ips.srcset(testData.all.srcset, 'placecage').should.equal(results.placecage.srcset);
      });

      it('should generate a placeimg srcset: ' + results.placeimg.srcset, function() {
        ips.srcset(testData.all.srcset, 'placeimg').should.equal(results.placeimg.srcset);
      });

    });

    context('with service override', function() {

      before(function(){
        ips = IPS({
          serviceOverride: 'placeimg'
        });
      });

      after(function() {
        ips = null;
      });

      it('should generate a placeimg srcset since serviceOverride was set: ' + results.placeimg.srcset, function() {
        ips.srcset(testData.all.srcset).should.equal(results.placeimg.srcset);
      });

    });

  });

  describe('#placeholdit', function() {

    before(function(){
      ips = IPS();
    });

    after(function() {
      ips = null;
    });

    it('should have a placeholdit src function', function() {
      assert.isFunction(ips.placeholdit.src);
    });

    it('should have a placeholdit srcset function', function() {
      assert.isFunction(ips.placeholdit.srcset);
    });

    it('should generate a src:' + results.placeholdit.src, function() {
      ips.placeholdit.src(testData.all.src).should.equal(results.placeholdit.src);
    });

    it('should generate a src with custom text: ' + results.placeholdit.text, function() {
      ips.placeholdit.src(testData.all.text).should.equal(results.placeholdit.text);
    });

    it('should generate a src with a custom format: ' + results.placeholdit.format, function() {
      ips.placeholdit.src(testData.all.format).should.equal(results.placeholdit.format);
    });

    it('should generate a src with custom colors: ' + results.placeholdit.colors, function() {
      ips.placeholdit.src(testData.all.colors).should.equal(results.placeholdit.colors);
    });

    it('should generate a srcset: ' + results.placeholdit.srcset, function() {
      ips.placeholdit.srcset(testData.all.srcset).should.equal(results.placeholdit.srcset);
    });

  });

  describe('#lorempixel', function() {

    before(function(){
      ips = IPS();
    });

    after(function() {
      ips = null;
    });

    it('should have a lorempixel src function', function() {
      assert.isFunction(ips.lorempixel.src);
    });

    it('should have a lorempixel srcset function', function() {
      assert.isFunction(ips.lorempixel.srcset);
    });

    it('should generate a src: ' + results.lorempixel.src, function() {
      ips.lorempixel.src(testData.all.src).should.equal(results.lorempixel.src);
    });

    it('should generate a srcset: ' + results.lorempixel.srcset, function() {
      ips.lorempixel.srcset(testData.all.srcset).should.equal(results.lorempixel.srcset);
    });

    it('should generate a src with a custom filter: ' + results.lorempixel.filter, function() {
      ips.lorempixel.src(testData.all.filter).should.equal(results.lorempixel.filter);
    });

    it('should generate a src with a custom category: ' + results.lorempixel.category, function() {
      ips.lorempixel.src(testData.all.category).should.equal(results.lorempixel.category);
    });

    it('should generate a srcset with unique dimensions: ' + results.lorempixel.unqiue, function() {
      ips.lorempixel.srcset(testData.all.srcset, {unique: 2}).should.equal(results.lorempixel.unqiue);
    });
    
  });

  describe('#fillmurray', function() {

    before(function(){
      ips = IPS();
    });

    after(function() {
      ips = null;
    });

    it('should have a fillmurray src function', function() {
      assert.isFunction(ips.fillmurray.src);
    });

    it('should have a fillmurray srcset function', function() {
      assert.isFunction(ips.fillmurray.srcset);
    });

    it('should generate a src: ' + results.fillmurray.src, function() {
      ips.fillmurray.src(testData.all.src).should.equal(results.fillmurray.src);
    });

    it('should generate a srcset: ' + results.fillmurray.srcset, function() {
      ips.fillmurray.srcset(testData.all.srcset).should.equal(results.fillmurray.srcset);
    });

    it('should generate a src with a custom filter: ' + results.fillmurray.filter, function() {
      ips.fillmurray.src(testData.all.filter).should.equal(results.fillmurray.filter);
    });

    it('should generate a srcset with unique dimensions: ' + results.fillmurray.unqiue, function() {
      ips.fillmurray.srcset(testData.all.srcset, {unique: 2}).should.equal(results.fillmurray.unqiue);
    });
    
  });

  describe('#placecage', function() {

    before(function(){
      ips = IPS();
    });

    after(function() {
      ips = null;
    });

    it('should have a placecage src function', function() {
      assert.isFunction(ips.placecage.src);
    });

    it('should have a placecage srcset function', function() {
      assert.isFunction(ips.placecage.srcset);
    });

    it('should generate a src: ' + results.placecage.src, function() {
      ips.placecage.src(testData.all.src).should.equal(results.placecage.src);
    });

    it('should generate a srcset: ' + results.placecage.srcset, function() {
      ips.placecage.srcset(testData.all.srcset).should.equal(results.placecage.srcset);
    });

    it('should generate a src with a custom filter: ' + results.placecage.filter, function() {
      ips.placecage.src(testData.all.filter).should.equal(results.placecage.filter);
    });

    it('should generate a src and override a crazy filter: ' + results.placecage.crazy, function() {
      ips.placecage.src(testData.placecage.crazy).should.equal(results.placecage.crazy);
    });

    it('should generate a srcset with unique dimensions: ' + results.placecage.unqiue, function() {
      ips.placecage.srcset(testData.all.srcset, {unique: 2}).should.equal(results.placecage.unqiue);
    });

  });

  describe('#placeimg', function() {

    before(function(){
      ips = IPS();
    });

    after(function() {
      ips = null;
    });

    it('should have a placeimg src function', function() {
      assert.isFunction(ips.placeimg.src);
    });

    it('should have a placeimg srcset function', function() {
      assert.isFunction(ips.placeimg.srcset);
    });

    it('should generate a src: ' + results.placeimg.src, function() {
      ips.placeimg.src(testData.all.src).should.equal(results.placeimg.src);
    });

    it('should generate a srcset: ' + results.placeimg.srcset, function() {
      ips.placeimg.srcset(testData.all.srcset).should.equal(results.placeimg.srcset);
    });

    it('should generate a src with a custom filter: ' + results.placeimg.filter, function() {
      ips.placeimg.src(testData.all.filter).should.equal(results.placeimg.filter);
    });

    it('should generate a srcset with unique dimensions: ' + results.placeimg.unqiue, function() {
      ips.placeimg.srcset(testData.all.srcset, {unique: 2}).should.equal(results.placeimg.unqiue);
    });
    
  });

});

