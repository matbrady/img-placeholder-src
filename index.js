var _        = require('underscore');
var nunjucks = require('nunjucks');
var srcset   = require('srcset');

var BaseService = {
  srcset: function(data, options) {
    var _this = this;
    var sources = [];
    var options = options || null;

    data.forEach(function(imageData) {
      imageData.url = _this.src(imageData, options);
      sources.push(_.omit(imageData, 'height'));
    });
    return srcset.stringify(sources);
  }
}

var ImagePlaceholderSrc = function(options) {
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

  var options = _.defaults(defaults, options);

  function createTemplate(tmplStr) {
    if (!!options.engine.compile) {
      return options.engine.compile(tmplStr);
    }
    else {
      return options.engine.template(tmplStr);
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

  // This only increases the size in the image url
  // it dones not affect the responsive size dimensions
  // so that the browser thinks it's the same size as its
  // sibling images and it's swaped at the same time. 
  function size(imageData, index) { 
    imageData.height += index;
    imageData.width += index;
    return imageData;
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
      src: function(data, options) {
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
        // Check if the sizes should be increamented by one. 
        if (!!options && !!options.unique) {
          data = size(data, options.unique);
        }
        return renderTemplate(template, data);
      }
    },

    placeimg: {
      src: function(data, options) {
        var data = _.clone(data);
        var template = createTemplate(tmpl.placeimg);

        if (!data.category) {
          data['category'] = 'any'
        }
        // Check if the sizes should be increamented by one. 
        if (!!options && !!options.unique) {
          data = size(data, options.unique);
        }

        return renderTemplate(template, data);
      }
    },

    placecage: {
      src: function(data, options) {
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
        // Check if the sizes should be increamented by one. 
        if (!!options && !!options.unique) {
          data = size(data, options.unique);
        }
        return renderTemplate(template, data);
      }
    },

    fillmurray: {
      src: function(data, options) {
        var data = _.clone(data);
        var template = createTemplate(tmpl.fillmurray);
        if (!!data.filter) {
          switch(data.filter) {
            case 'greyscale':
              data.filter = 'g';
              break;
          }
        }
        // Check if the sizes should be increamented by one. 
        if (!!options && !!options.unique) {
          data = size(data, options.unique);
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
