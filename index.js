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
  },
  src: function(service, data, options) {
    var data = _.clone(data);

    if (!!settings.serviceOverride) {
      console.log('override');
    }
    else {
      var template = createTemplate(tmpl[this.name]);
    }
    data = this.prototype.modifier(data);
    return renderTemplate(template, data);
  }
}

var ImagePlaceholderSrc = function(options) {
  var _this = this;
  var options = options || {};
  var defaults = {
    engine: nunjucks,
    serviceOverride: null,
    service: 'placeholdit',
    protocol: null
  };

  // Upate protocol if it exists to 'https:' or 'http:' 
  if (!!options.protocol) {
    options.protocol = options.protocol + ':';
  }
  // Applied passed options to default settings
  var settings = _.extend(defaults, options);

  /* Placeholder Services */
  /* 
    TODO: Override http vs https - note some services may not provide it 
    see: http://stackoverflow.com/questions/10348906/how-to-know-if-a-request-is-http-or-https-in-node-js
  */
  var tmpl = {
    lorempixel:  '{{ protocol }}//lorempixel.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}{{ "/"+category if category }}{{ "/"+text if (text and category) }}',
    placeholdit: '{{ protocol }}//placehold.it/{{ width }}x{{ height }}{{ "/"+background if background }}{{ "/"+foreground if foreground }}{{ "."+format if format }}{{ "&text="+text if text }}', //<%= '.'+format %>
    placeimg:    '{{ protocol }}//placeimg.com/{{ width }}/{{ height }}{{ "/"+category if category }}{{ "/"+filter if filter }}',
    placecage:   '{{ protocol }}//placecage.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}',
    fillmurray:  '{{ protocol }}//fillmurray.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}'
  };

  function createTemplate(tmplStr) {
    if (!!settings.engine.compile) {
      return settings.engine.compile(tmplStr);
    }
    else {
      return settings.engine.template(tmplStr);
    }
  }

  function renderTemplate(tmpl, data) {
    var newData = _.clone(data);

    newData.protocol = settings.protocol;

    if (!!tmpl.render) {
      return tmpl.render(newData);
    }
    else {
      return tmpl(newData);
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
      name: 'placeholdit',
      modifier: function(data, options) {
        if (!!data.text) {
          data['text'] = data.text.replace(" ", "+");
        }
        return data;
      }
    },

    lorempixel: {
      name: 'lorempixel',
      modifier: function(data, options) {
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
        return data;
      }
    },

    placeimg: {
      name: 'placeimg',
      modifier: function(data, options) {
        if (!data.category) {
          data['category'] = 'any'
        }
        // Check if the sizes should be increamented by one. 
        if (!!options && !!options.unique) {
          data = size(data, options.unique);
        }
        return data;
      }
    },

    placecage: {
      name: 'placecage',
      modifier: function(data, options) {
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
        return data;
      }
    },

    fillmurray: {
      name: 'fillmurray',
      modifier: function(data, options) {
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
        return data;
      }
    }
  };

  var exports = {
    srcset: function(data, service, options) {
      var _this = this;
      var sources = [];
      var options = options || null;

      data.forEach(function(imageData) {
        imageData.url = _this.src(imageData, service, options);
        sources.push(_.omit(imageData, 'height'));
      });
      return srcset.stringify(sources);
    },

    src: function(data, service, options) { // service:string, options:object
      var config;
      var template;
      var serviceObj;
      var data = _.clone(data);

      if (typeof service === 'undefined') {
        service = defaults.service;
      }
      if (!!service && typeof service !== 'string') {
        config = service; 
        service = defaults.service;
      }


      if (!!settings.serviceOverride) {
        serviceObj = services[settings.serviceOverride];
        template = createTemplate(tmpl[settings.serviceOverride]);
      }
      else {
        serviceObj = services[service];
        template = createTemplate(tmpl[serviceObj.name]);
      }
      data = serviceObj.modifier(data, options);
      return renderTemplate(template, data);
    }
  };

  _.each(services, function(service, key, list) {
    exports[key] = {
      srcset: function(data, options) {
        return exports.srcset(data, key, options);
      },
      src: function(data, options) {
        return exports.src(data, key, options);
      }
    }
  });

  return exports;
}; 

module.exports = ImagePlaceholderSrc;
