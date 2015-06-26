var _        = require('underscore');
var nunjucks = require('nunjucks');
var srcset   = require('srcset');

// This only increases the size in the image url
// it dones not affect the responsive size dimensions
// so that the browser thinks it's the same size as its
// sibling images and it's swaped at the same time.
function size(imageData, index) {
  imageData.height += index;
  imageData.width += index;
  return imageData;
}

function baseModifier(data, options) {
  // Check if the sizes should be increamented by one.
  if (!!options && !!options.unique) {
    data = size(data, options.unique);
  }
  return data;
}

var BaseService = function(name, root) {

  if ( !name || !root) {
    throw new Error('Service requires a name and a parent object to reference');
  }
  return {
    name: name,
    /**
     * Generate service specific placeholder image `srcset` value string
     * @param  {array}  data    array of image data objects
     * @param  {object} options to be passed to the service's src function
     * @return {string}         image `srcset` value string
     */
    srcset: function(data, options) {
      return root.srcset(data, name, options);
    },
    /**
     * Service specific src function
     * @param  {object} data    image src data
     * @param  {object} options to modify the data that populates the src string
     * @return {string}         image `src` value string
     */
    src: function(data, options) {
      return root.src(data, name, options);
    },
    /* placeholder for adding new services */
    modifier: function() {}
  }
};

/**
 * Contructor function for creating an Image Placeholder Src object
 * @param  {object} options for overriding defaults
 * @return {object}         Image Placeholder Src object
 */
var ImagePlaceholderSrc = function(options) {
  var _this = this;
  var options = options || {};
  var defaults = {
    engine: nunjucks,
    serviceOverride: null,
    service: 'placeholdit',
    protocol: null,
    tmpl: {
      lorempixel:  '{{ protocol }}//lorempixel.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}{{ "/"+category if category }}{{ "/"+text if (text and category) }}',
      placeholdit: '{{ protocol }}//placehold.it/{{ width }}x{{ height }}{{ "/"+background if background }}{{ "/"+foreground if foreground }}{{ "."+format if format }}{{ "&text="+text if text }}',
      placeimg:    '{{ protocol }}//placeimg.com/{{ width }}/{{ height }}{{ "/"+category if category }}{{ "/"+filter if filter }}',
      placecage:   '{{ protocol }}//placecage.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}',
      fillmurray:  '{{ protocol }}//fillmurray.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}'
    }
  };

  // Upate protocol if it exists to 'https:' or 'http:'
  if (!!options.protocol) {
    options.protocol = options.protocol + ':';
  }
  // Applied passed options to default settings
  var settings = _.extend(defaults, options);

  /**
   * Create template using default or defined engine
   * @param  {string} tmplStr src url template string
   * @return {object}         template for rendering data
   */
  function createTemplate(tmplStr) {
    if (!!settings.engine.compile) {
      return settings.engine.compile(tmplStr);
    }
    else {
      return settings.engine.template(tmplStr);
    }
  }

  /**
   * Render image data into template string
   * @param  {object} tmpl for data to be rendered to
   * @param  {object} data from image
   * @return {string}      src string rendered from the data
   */
  function renderTemplate(tmpl, data) {
    var newData = _.clone(data);
    newData['protocol'] = settings.protocol;

    if (!!tmpl.render) {
      return tmpl.render(newData);
    }
    else {
      return tmpl(newData);
    }
  }

  var services = {

    /**
     * Placehold.it Service - http://placehold.it/
     * Supports: custom text
     * @type {Object}
     */
    placeholdit: {
      name: 'placeholdit',
      modifier: function(data, options) {
        if (!!data.text) {
          data['text'] = data.text.replace(" ", "+");
        }
        return data;
      }
    },

    /**
     * LoremPixel Service - http://lorempixel.com/
     * Supports: [greyscale] filter
     * @type {Object}
     */
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
        return data;
      }
    },

    /**
     * PlaceIMG Service - https://placeimg.com/
     * Supports: [see site] category
     * @type {Object}
     */
    placeimg: {
      name: 'placeimg',
      modifier: function(data, options) {
        if (!data.category) {
          data['category'] = 'any'
        }
        return data;
      }
    },

    /**
     * PlaceCage Service - http://www.placecage.com/
     * Supports: [greyscale, crazy] filters
     * @type {Object}
     */
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
        return data;
      }
    }
  };

  var exports = {

    /**
     * Generate placeholder image `srcset` value string
     * @param  {array}  data    array of image data objects
     * @param  {string} service placeholder image service name
     * @param  {object} options to be passed to the service's src function
     * @return {string}         image `srcset` value string
     */
    srcset: function(data, service, options) {
      var _this = this;
      var sources = [];
      var config = options || null;

      // Set default service if it is not defined
      if (typeof service === 'undefined') {
        service = defaults.service;
      }
      // If `service` contains an object set the value to `config`
      // and set the service to the default service
      if (!!service && typeof service !== 'string') {
        config = service;
        service = defaults.service;
      }

      // Loop through each image data object and generate the
      // image src attribute string to create the image url
      data.forEach(function(imageData) {
        imageData.url = _this.src(imageData, service, config);
        // collect all the image data while omitting the height
        // height param doesn't seem to be support by responsive image
        // ex: 'http://placehold.it/400x400 400w 400h'
        // see: W3C spec [FIX_ME: Update link]
        sources.push(_.omit(imageData, 'height'));
      });
      // return the stringified image srcset value
      return srcset.stringify(sources);
    },

    /**
     * Generate placeholder image `src` value string
     * @param  {object} data    to populate template ie: height, width
     * @param  {string} service placeholder image service name
     * @param  {object} options to modify the data that populates the src string
     * @return {string}         image `src` value string
     */
    src: function(data, service, options) { // service:string, options:object
      var config;
      var template;
      var serviceObj;
      var template;
      var data = _.clone(data);

      // Set default service if it is not defined
      if (typeof service === 'undefined') {
        service = defaults.service;
      }
      // If `service` contains an object set the value to `config`
      // and set the service to the default service
      if (!!service && typeof service !== 'string') {
        config = service;
        service = defaults.service;
      }
      // IF `serviceOverride` exist, use the defined service
      // regardless of the `service` passed to the function
      if (!!settings.serviceOverride) {
        serviceObj = services[settings.serviceOverride];
        // Create the template
        template = createTemplate(settings.tmpl[settings.serviceOverride]);
      }
      // ELSE set the service to the passed `service` variable
      else {
        serviceObj = services[service];
        // Create the template
        template = createTemplate(settings.tmpl[serviceObj.name]);
      }

      // Apply base data modifiers
      data = baseModifier(data, options);
      // Apply specific service data modifiers
      data = serviceObj.modifier(data, options);
      // Return the rendered template
      return renderTemplate(template, data);
    },

    register: function(serviceData) {
      services[serviceData.name] = {
        name: serviceData.name,
        modifier: serviceData.modifier || {}
      };
      this[serviceData.name] = new BaseService(serviceData.name, this);
      settings.tmpl[serviceData.name] = serviceData.template;
    }
  };

  /**
   * Create Shorthand src functions for each service
   * @return {null}       modifies `export`, nothing returned
   */
  _.each(services, function(service, key, list) {
    exports[key] = new BaseService(key, exports);
  });

  return exports;
};

module.exports = ImagePlaceholderSrc;
