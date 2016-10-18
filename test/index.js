var assert = require('chai').assert;
var should = require('chai').should();
var IPS    = require('../dist/img-placeholder-src');

var testData = {
  all: {
    everything: {
      height:     100,
      width:      100,
      filter:     "greyscale",
      foreground: "ffffff",
      background: "999999",
      format:     "gif",
      text:       "Hello World",
      category:   "people",
      delay:      1000,
      flag:       "usa",
      brand:      "apple",
      texture:    "cross"
    },
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
    },
    format: {
      format: 'gif',
      height: 100,
      width: 100
    }
  },
  lorempixel: {
    text: {
      height: 100,
      width: 100,
      category: "sports",
      text: "Hello-World"
    }
  }

};

var results = {
  general: {
    protocol: 'https://placehold.it/100x100',
    protocolSrcset: 'https://placehold.it/100x100 100w, https://placehold.it/200x200 200w'
  },
  placeholdit: {
    colors:  "//placehold.it/100x100/dddddd/000000",
    everything: "//placehold.it/100x100/999999/ffffff.gif",
    format: "//placehold.it/100x100.jpg",
    src:    "//placehold.it/100x100",
    srcset: '//placehold.it/100x100 100w, //placehold.it/200x200 200w',
    text:   "//placehold.it/100x100?text=hello+world"
  },
  lorempixel: {
    category: "//lorempixel.com/100/100/people",
    everything: "//lorempixel.com/g/100/100/people/Hello-World",
    filter: "//lorempixel.com/g/100/100",
    src: "//lorempixel.com/100/100",
    srcset: "//lorempixel.com/100/100 100w, //lorempixel.com/200/200 200w",
    text:   "//lorempixel.com/100/100/sports/Hello-World",
    unqiue: "//lorempixel.com/102/102 100w, //lorempixel.com/202/202 200w"
  },
  fillmurray: {
    everything: "//fillmurray.com/g/100/100",
    filter: "//fillmurray.com/g/100/100",
    src: "//fillmurray.com/100/100",
    srcset: "//fillmurray.com/100/100 100w, //fillmurray.com/200/200 200w",
    unqiue: "//fillmurray.com/102/102 100w, //fillmurray.com/202/202 200w"
  },
  placecage: {
    everything: "//placecage.com/gif/100/100",
    format: "//placecage.com/gif/100/100",
    filter: "//placecage.com/g/100/100",
    crazy: "//placecage.com/c/100/100",
    src: "//placecage.com/100/100",
    srcset: "//placecage.com/100/100 100w, //placecage.com/200/200 200w",
    unqiue: "//placecage.com/102/102 100w, //placecage.com/202/202 200w"
  },
  placeimg: {
    everything: "//placeimg.com/100/100/people/grayscale",
    filter: "//placeimg.com/100/100/any/grayscale",
    src: "//placeimg.com/100/100/any",
    srcset: "//placeimg.com/100/100/any 100w, //placeimg.com/200/200/any 200w",
    unqiue: "//placeimg.com/102/102/any 100w, //placeimg.com/202/202/any 200w"
  },
  placekitten: {
    everything: "//placekitten.com/g/100/100",
    filter: "//placekitten.com/g/100/100",
    src: "//placekitten.com/100/100",
    unqiue: "//placekitten.com/102/102 100w, //placekitten.com/202/202 200w"
  },
  satyr: {
    colors:  "//satyr.io/100x100/dddddd",
    everything: "//satyr.io/100x100/999999?type=gif&text=Hello+World&delay=1000&brand=apple&flag=usa&texture=cross",
    format: "//satyr.io/100x100?type=jpg",
    src:    "//satyr.io/100x100",
    srcset: '//satyr.io/100x100 100w, //satyr.io/200x200 200w',
    text:   "//satyr.io/100x100?text=hello+world"
  },
};

describe('img-placeholder-src', function() {

  context('general', function() {

    before(function(){
      ips = new IPS();
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

    it('should have a register function', function() {
      assert.isFunction(ips.register);
    });

  });

  describe('#src', function() {

    context('without service override', function() {

      before(function(){
        ips = new IPS();
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

      it('should generate a satyr src: ' + results.satyr.src, function() {
        ips.src(testData.all.src, 'satyr').should.equal(results.satyr.src);
      });

    });

    context('with service override', function() {

      before(function(){
        ips = new IPS({
          serviceOverride: 'placeimg'
        });
      });

      after(function() {
        ips = null;
      });

      it('should generate a placeimg src since the `serviceOverride` setting was set: ' + results.placeimg.src, function() {
        ips.src(testData.all.src).should.equal(results.placeimg.src);
      });

    });

    context('with default service setting and override', function() {

      before(function(){
        ips = new IPS({
          serviceOverride: 'fillmurray',
          service: 'placeimg'
        });
      });

      after(function() {
        ips = null;
      });

      it('should generate a fillmurray src since the `service` setting was set: ' + results.fillmurray.src, function() {
        ips.src(testData.all.src).should.equal(results.fillmurray.src);
      });

    });

    context('with default service setting ', function() {

      before(function(){
        ips = new IPS({
          service: 'placeimg'
        });
      });

      after(function() {
        ips = null;
      });

      it('should generate a placeimg src since the `service` setting was set: ' + results.placeimg.src, function() {
        ips.src(testData.all.src).should.equal(results.placeimg.src);
      });

    });

    context('with protocol override', function() {

      before(function(){
        ips = new IPS({
          protocol: 'https'
        });
      });

      after(function() {
        ips = null;
      });

      it('should generate a src: ' + results.general.protocol, function() {
        ips.src(testData.all.src).should.equal(results.general.protocol);
      });

      it('should generate a srcset: ' + results.general.protocol, function() {
        ips.srcset(testData.all.srcset).should.equal(results.general.protocolSrcset);
      });

    });

  });

  describe('#srcset', function() {

    context('without service override', function() {

      before(function(){
        ips = new IPS();
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

      it('should generate a satyr srcset: ' + results.satyr.srcset, function() {
        ips.srcset(testData.all.srcset, 'satyr').should.equal(results.satyr.srcset);
      });

    });

    context('with service override', function() {

      before(function(){
        ips = new IPS({
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
      ips = new IPS();
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

    it('should generate a src with everything: ' + results.placeholdit.everything, function() {
      ips.placeholdit.src(testData.all.everything).should.equal(results.placeholdit.everything);
    });

    it('should generate a srcset: ' + results.placeholdit.srcset, function() {
      ips.placeholdit.srcset(testData.all.srcset).should.equal(results.placeholdit.srcset);
    });

  });

  describe('#lorempixel', function() {

    before(function(){
      ips = new IPS();
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

    it('should generate a src with custom text: ' + results.lorempixel.text, function() {
      ips.lorempixel.src(testData.lorempixel.text).should.equal(results.lorempixel.text);
    });

    it('should generate a src with everything: ' + results.lorempixel.everything, function() {
      ips.lorempixel.src(testData.all.everything).should.equal(results.lorempixel.everything);
    });

    it('should generate a srcset with unique dimensions: ' + results.lorempixel.unqiue, function() {
      ips.lorempixel.srcset(testData.all.srcset, {unique: 2}).should.equal(results.lorempixel.unqiue);
    });

  });

  describe('#fillmurray', function() {

    before(function(){
      ips = new IPS();
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

    it('should generate a src with everything: ' + results.fillmurray.everything, function() {
      ips.fillmurray.src(testData.all.everything).should.equal(results.fillmurray.everything);
    });

    it('should generate a srcset with unique dimensions: ' + results.fillmurray.unqiue, function() {
      ips.fillmurray.srcset(testData.all.srcset, {unique: 2}).should.equal(results.fillmurray.unqiue);
    });

  });

  describe('#placecage', function() {

    before(function(){
      ips = new IPS();
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

    it('should generate a src with a custom format: ' + results.placecage.format, function() {
      ips.placecage.src(testData.placecage.format).should.equal(results.placecage.format);
    });

    it('should generate a src with everything: ' + results.placecage.everything, function() {
      ips.placecage.src(testData.all.everything).should.equal(results.placecage.everything);
    });

    it('should generate a srcset with unique dimensions: ' + results.placecage.unqiue, function() {
      ips.placecage.srcset(testData.all.srcset, {unique: 2}).should.equal(results.placecage.unqiue);
    });

  });

  describe('#placeimg', function() {

    before(function(){
      ips = new IPS();
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

    it('should generate a src with everything: ' + results.placeimg.everything, function() {
      ips.placeimg.src(testData.all.everything).should.equal(results.placeimg.everything);
    });

    it('should generate a srcset with unique dimensions: ' + results.placeimg.unqiue, function() {
      ips.placeimg.srcset(testData.all.srcset, {unique: 2}).should.equal(results.placeimg.unqiue);
    });

  });

  describe('#satyr', function() {

    before(function(){
      ips = new IPS();
    });

    after(function() {
      ips = null;
    });

    it('should have a satyr src function', function() {
      assert.isFunction(ips.satyr.src);
    });

    it('should have a satyr srcset function', function() {
      assert.isFunction(ips.satyr.srcset);
    });

    it('should generate a src:' + results.satyr.src, function() {
      ips.satyr.src(testData.all.src).should.equal(results.satyr.src);
    });

    it('should generate a src with custom text: ' + results.satyr.text, function() {
      ips.satyr.src(testData.all.text).should.equal(results.satyr.text);
    });

    it('should generate a src with a custom format: ' + results.satyr.format, function() {
      ips.satyr.src(testData.all.format).should.equal(results.satyr.format);
    });

    it('should generate a src with custom colors: ' + results.satyr.colors, function() {
      ips.satyr.src(testData.all.colors).should.equal(results.satyr.colors);
    });

    it('should generate a src with everything: ' + results.satyr.everything, function() {
      ips.satyr.src(testData.all.everything).should.equal(results.satyr.everything);
    });

    it('should generate a srcset: ' + results.satyr.srcset, function() {
      ips.satyr.srcset(testData.all.srcset).should.equal(results.satyr.srcset);
    });

  });

  // DEPRICATED
  // IPS no longer uses a templating engine. Instead, each service requires a
  // function to be passed as it's template.
  // context('engine', function() {
  //
  //   before(function(){
  //     ips = new IPS({
  //       engine: _,
  //       tmpl: {
  //         placeholdit: "<%= protocol %>//placehold.it/<%= width %>x<%= height %>"
  //       }
  //     });
  //   });
  //
  //   after(function() {
  //     ips = null;
  //   });
  //
  //   it('should render using an alternative template engine', function() {
  //     ips.src(testData.all.src).should.equal(results.placeholdit.src);
  //   });
  // });

  describe('custom serivce', function() {

    before(function(){
      ips = new IPS();

      ips.register({
        name: 'placekitten',
        render: function(args) {
          return (typeof(args.protocol) !== 'undefined' ? args.protocol : "")
            + '//placekitten.com'
            + (typeof(args.filter) !== 'undefined' ? '/'+args.filter : "")
            + '/' + args.width + '/' + args.width;
        },
        modifier: function(data) {
          if (!!data.filter) {
            switch(data.filter) {
              case 'greyscale':
                data.filter = 'g';
                break;
            }
          }
          return data;
        }
      });
    });

    after(function() {
      ips = null;
    });

    it('should render using newly registered placeholder service: ' + results.placekitten.src, function() {
      ips.src(testData.all.src, 'placekitten').should.equal(results.placekitten.src);
    });

    it('should generate a src with a custom filter: ' + results.placekitten.filter, function() {
      ips.placekitten.src(testData.all.filter).should.equal(results.placekitten.filter);
    });

    it('should generate a src with everything: ' + results.placekitten.everything, function() {
      ips.placekitten.src(testData.all.everything).should.equal(results.placekitten.everything);
    });

    it('should generate a srcset with unique dimensions: ' + results.placekitten.unqiue, function() {
      ips.placekitten.srcset(testData.all.srcset, {unique: 2}).should.equal(results.placekitten.unqiue);
    });

  });

});
