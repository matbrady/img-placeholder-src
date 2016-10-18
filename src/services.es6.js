var services = {

  /**
   * Placehold.it Service - http://placehold.it/
   * Supports: custom text
   * @type {Object}
   */
  placeholdit: {
    name: 'placeholdit',
    render: function(args) {
      const { protocol, width, height, background, foreground, format, text } = args;
      return `${ typeof(protocol) !== 'undefined' ? protocol : ""}`
        + `//placehold.it/${width}x${height}`
        + `${ typeof(background) !== 'undefined' ? '/'+background : ""}`
        + `${ typeof(foreground) !== 'undefined' ? '/'+foreground : ""}`
        + `${ typeof(format)     !== 'undefined' ? '.'+format     : ""}`
        + `${ (typeof(text)      !== 'undefined' && typeof(format) === 'undefined') ? '?text='+text : ""}`;
    },
    modifier: function(data, options) {
      var formats = ['png', 'gif', 'jpg', 'jpeg'];
      if (!!data.text) {
        data['text'] = data.text.replace(" ", "+");
      }
      // Only accept [png, gif, jpg, jpeg] formats
      if (!!data.format) {
        if (formats.indexOf(data.format) === -1) { // indexOf support: ie9
          data.format = undefined;
        }
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
    render: function(args) {
      const { protocol, filter, width, height, category, text } = args;
      return `${ typeof(protocol) !== 'undefined' ? protocol : ""}`
        + `//lorempixel.com`
        + `${ typeof(filter) !== 'undefined' ? '/'+filter : ""}`
        + `/${width}/${height}`
        + `${ typeof(category) !== 'undefined' ? '/'+category : ""}`
        + `${ (typeof(text) !== 'undefined' && typeof(category) !== 'undefined') ? '/'+text : ""}`;
    },
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
    render: function(args) {
      const { protocol, width, height, category, filter } = args;
      return `${ typeof(protocol) !== 'undefined' ? protocol : ""}`
        + `//placeimg.com/${width}/${height}`
        + `${ typeof(category) !== 'undefined' ? '/'+category : ""}`
        + `${ typeof(filter) !== 'undefined' ? '/'+filter : ""}`;
    },
    modifier: function(data, options) {
      var filters = ['greyscale', 'grayscale', 'sepia'];
      if (!data.category) {
        data['category'] = 'any'
      }
      if (!!data.filter) {
        if (filters.indexOf(data.filter) === -1) {
          data.filter = undefined;
        }
        else {
          switch(data.filter) {
            case 'greyscale':
            data.filter = 'grayscale';
            break;
            case 'sepia':
            data.filter = 'sepia';
            break;
          }
        }
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
    render: function(args) {
      const { protocol, width, height, filter, format } = args;
      return `${ typeof(protocol) !== 'undefined' ? protocol : ""}`
        + `//placecage.com`
        + `${ typeof(format) !== 'undefined' ? '/'+format : ""}`
        + `${ typeof(filter) !== 'undefined' && typeof(format) === 'undefined' ? '/'+filter : ""}`
        + `/${width}/${height}`;
    },
    modifier: function(data, options) {
      var formats = ['gif'];
      if (!!data.filter) {
        switch(data.filter) {
          case 'greyscale':
            data.filter = 'g';
            break;
          case 'crazy':
            data.filter = 'c';
            break;
          default:
            data.filter = undefined;
            break;
        }
      }
      // Only accept [gif] formats
      if (!!data.format) {
        if (formats.indexOf(data.format) === -1) {
          data.format = undefined;
        }
      }
      return data;
    }
  },

  /**
   * FillMurray Service - http://www.fillmurray.com
   * Supports: [greyscale, calm] filters
   * @type {Object}
   */
  fillmurray: {
    name: 'fillmurray',
    render: function(args) {
      const { protocol, width, height, filter } = args;
      return `${ typeof(protocol) !== 'undefined' ? protocol : ""}`
        + `//fillmurray.com`
        + `${ typeof(filter) !== 'undefined' ? '/'+filter : ""}`
        + `/${width}/${height}`;
    },
    modifier: function(data, options) {
      if (!!data.filter) {
        switch(data.filter) {
          case 'greyscale':
            data.filter = 'g';
            break;
          default:
            data.filter = undefined;
            break;
        }
      }
      return data;
    }
  },

  /**
   * satyr.io Service - https://satyr.io
   * Supports: custom text
   * @type {Object}
   */
  satyr: {
    name: 'satyr',
    render: function(args) {
      const { protocol, width, height, background, theme, format, text, delay, brand } = args;
      const params = ['format', 'text', 'delay', 'brand', 'flag', 'texture'];
      let result = "";

      result = `${ typeof(protocol) !== 'undefined' ? protocol : ""}`
        + `//satyr.io/${width}x${height}`
        + `${ typeof(background) !== 'undefined' ? '/'+background     : ""}`
        + `${ typeof(theme)      !== 'undefined' ? '/'+theme          : ""}`;

        // check for any parameter variables and set flag
        let count = 1;
        params.forEach(function(param, index) {
          if (args.hasOwnProperty(param)) {
            let value = args[param];
            // change `format` to `type`
            if (param === 'format') {
              param = 'type';
            }
            result += `${(count <= 1 ? '?' : '&')}${param}=${value}`
            count++
          }
        })

      return result;
    },
    modifier: function(data, options) {
      // Only accept [webp, png, gif, jpg, jpeg] formats
      var formats = ['webp', 'png', 'gif', 'jpg', 'jpeg'];
      if (!!data.text) {
        data['text'] = data.text.replace(" ", "+");
      }
      if (!!data.format) {
        if (formats.indexOf(data.format) === -1) { // indexOf support: ie9
          data.format = undefined;
        }
      }
      return data;
    }
  },
};

module.exports = services;
