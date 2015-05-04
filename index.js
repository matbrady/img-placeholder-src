var _        = require('underscore');
var nunjucks = require('nunjucks');
var srcset   = require('srcset');

var ImagePlaceholderSrc = function(config) {
  var _this = this;
  var defaults = {
    engine: nunjucks
  };

  /* Placeholder Services */
  var tmpl = {
    placeholdit: 'http://placehold.it/{{ width }}x{{ height }}{{ "/"+background if background }}{{ "/"+foreground if foreground }}', //<%= '.'+format %>
    placeimg:    'http://placeimg.com/{{ width }}/{{ height }}{{ "/"+category if category }}{{ "/"+filter if filter }}',
    placecage:   'http://placecage.com{{ "/"+mod if mod }}/{{ width }}/{{ height }}',
    fillmurray:  'http://fillmurray.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}'
  };

  var config = _.defaults(defaults, config);

  function createTemplate(tmplStr) {
    if (!!config.engine.compile) {
      return config.engine.compile(tmplStr);
    }
    else {
      return config.engine.template(tmplStr);
    }
  }

  function renderTemplate(tmpl, data) {
    if (!!tmpl.render) {
      return tmpl.render(data);
    }
    else {
      return tmpl(data);
    }
  }

  return {

    placeholdit: {
      src: function(data) {
        var template = createTemplate(tmpl.placeholdit);
        return renderTemplate(template, data);
      },
      srcset: function(data) {
        var _this = this;
        var sources = [];
        data.forEach(function(imageData) {
          imageData['url'] = _this.src(imageData);
          sources.push(imageData);
        });
        return srcset.stringify(sources);
      }
    },

    placeimg: function(data) {
      src: function(data) {
        var template = createTemplate(tmpl.placeimg);
        return renderTemplate(template, data);
      },
      srcset: function(data) {
        var _this = this;
        var sources = [];
        data.forEach(function(imageData) {
          imageData['url'] = _this.src(imageData);
          sources.push(imageData);
        });
        return srcset.stringify(sources);
      }
    },

    placecage: function(data) {
      src: function(data) {
        var template = createTemplate(tmpl.placecage);
        return renderTemplate(template, data);
      },
      srcset: function(data) {
        var _this = this;
        var sources = [];
        data.forEach(function(imageData) {
          imageData['url'] = _this.src(imageData);
          sources.push(imageData);
        });
        return srcset.stringify(sources);
      }
    },

    fillmurray: function(data) {
      src: function(data) {
        var template = createTemplate(tmpl.fillmurray);
        return renderTemplate(template, data);
      },
      srcset: function(data) {
        var _this = this;
        var sources = [];
        data.forEach(function(imageData) {
          imageData['url'] = _this.src(imageData);
          sources.push(imageData);
        });
        return srcset.stringify(sources);
      }
    }
  }
}; 

module.exports = ImagePlaceholderSrc;
