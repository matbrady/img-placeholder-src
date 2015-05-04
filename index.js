var _        = require('underscore');
var nunjucks = require('nunjucks');
var srcset   = require('srcset');

var BaseService = {
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

var ImagePlaceholderSrc = function(config) {
  var _this = this;
  var defaults = {
    engine: nunjucks
  };

  /* Placeholder Services */
  /* 
    TODO: Override http vs https - note some services may not provide it 
    see: http://stackoverflow.com/questions/10348906/how-to-know-if-a-request-is-http-or-https-in-node-js
  */
  var tmpl = {
    lorempixel:  'http://lorempixel.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}{{ "/"+category if category }}{{ "/"+text if (text and category) }}',
    placeholdit: 'http://placehold.it/{{ width }}x{{ height }}{{ "/"+background if background }}{{ "/"+foreground if foreground }}{{ "."+format if format }}{{ "&text="+text if text }}', //<%= '.'+format %>
    placeimg:    'http://placeimg.com/{{ width }}/{{ height }}{{ "/"+category if category }}{{ "/"+filter if filter }}',
    placecage:   'http://placecage.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}',
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

  var services = {

    placeholdit: {
      src: function(data) {
        var data = _.clone(data);
        var template = createTemplate(tmpl.placeholdit);
        if (!!data.text) {
          data['text'] = data.text.replace(" ", "+");
        }
        return renderTemplate(template, data);
      }
    },

    lorempixel: {
      src: function(data) {
        var data = _.clone(data);
        var template = createTemplate(tmpl.lorempixel);
        // Image Modifications
        if (!!data.text) {
          data['text'] = data.text.replace(" ", "-");
        }
        if (!!data.filter) {
          switch(data.filter) {
            case 'greyscale':
              data.filter = 'g';
              break;
          }
        }
        return renderTemplate(template, data);
      }
    },

    placeimg: {
      src: function(data) {
        var data = _.clone(data);
        if (!data.category) {
          data['category'] = 'any'
        }
        var template = createTemplate(tmpl.placeimg);
        return renderTemplate(template, data);
      }
    },

    placecage: {
      src: function(data) {
        var data = _.clone(data);
        var template = createTemplate(tmpl.placecage);
        if (!!data.filter) {
          switch(data.filter) {
            case 'greyscale':
              data.filter = 'g';
              break;
            case 'crazy':
              data.filter = 'c';
              break;
          }
        }
        return renderTemplate(template, data);
      }
    },

    fillmurray: {
      src: function(data) {
        var data = _.clone(data);
        var template = createTemplate(tmpl.fillmurray);
        if (!!data.filter) {
          switch(data.filter) {
            case 'greyscale':
              data.filter = 'g';
              break;
          }
        }
        return renderTemplate(template, data);
      }
    }
  }

  _.each(services, function(service, key, list) {
    _.extend(services[key], BaseService);
  });

  return services;
}; 

module.exports = ImagePlaceholderSrc;
