(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("core-js/fn/object/assign"), require("srcset"));
	else if(typeof define === 'function' && define.amd)
		define(["core-js/fn/object/assign", "srcset"], factory);
	else if(typeof exports === 'object')
		exports["IPS"] = factory(require("core-js/fn/object/assign"), require("srcset"));
	else
		root["IPS"] = factory(root["core-js/fn/object/assign"], root["srcset"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Local Dependencies


	__webpack_require__(1);

	var _services = __webpack_require__(2);

	var _services2 = _interopRequireDefault(_services);

	var _base_service = __webpack_require__(3);

	var _base_service2 = _interopRequireDefault(_base_service);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImagePlaceholderSrc = function () {
	  function ImagePlaceholderSrc() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, ImagePlaceholderSrc);

	    this.defaults = {
	      // engine: _, // DEPRICATED
	      serviceOverride: null,
	      service: 'placeholdit',
	      protocol: null,
	      services: _services2.default
	    };

	    // Message the passed options
	    // Upate protocol if it exists to 'https:' or 'http:'
	    if (typeof options.protocol !== 'undefined') {
	      options.protocol = options.protocol + ':';
	    }
	    // Applied passed options to default settings
	    this.settings = Object.assign({}, this.defaults, options);

	    /**
	     * Create Shorthand src functions for each service
	     * @return {null}       modifies `export`, nothing returned
	     */
	    for (var service in _services2.default) {
	      this[service] = new _base_service2.default(_services2.default[service]);
	    }
	  }

	  _createClass(ImagePlaceholderSrc, [{
	    key: 'src',
	    value: function src(data, serviceName, options) {
	      var config = void 0;
	      var service = void 0;
	      var imageData = Object.assign({}, data);

	      // Set default service if it is not defined
	      if (typeof serviceName === 'undefined') {
	        serviceName = this.settings.service;
	      }
	      // If `service` contains an object set the value to `config`
	      // and set the service to the default service
	      if (typeof serviceName !== 'undefined' && typeof serviceName !== 'string') {
	        config = serviceName;
	        serviceName = this.settings.service;
	      }
	      // IF `serviceOverride` exist, use the defined service
	      // regardless of the `service` passed to the function
	      if (!!this.settings.serviceOverride) {
	        service = this[this.settings.serviceOverride];
	      }
	      // ELSE set the service to the passed `service` variable
	      else {
	          service = this[serviceName];
	        }

	      if (!!this.settings.protocol) {
	        imageData['protocol'] = this.settings.protocol;
	      }

	      // Return the rendered template
	      return service.src(imageData, options);
	    }
	  }, {
	    key: 'srcset',
	    value: function srcset(data, serviceName) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      var config = void 0;
	      var service = void 0;
	      var sources = [];

	      // Set default service if it is not defined
	      if (typeof serviceName === 'undefined') {
	        serviceName = this.settings.service;
	      }
	      // If `service` contains an object set the value to `config`
	      // and set the service to the default service
	      if (typeof serviceName !== 'undefined' && typeof serviceName !== 'string') {
	        options = serviceName;
	        serviceName = this.settings.service;
	      }

	      // IF `serviceOverride` exist, use the defined service
	      // regardless of the `service` passed to the function
	      if (!!this.settings.serviceOverride) {
	        service = this[this.settings.serviceOverride];
	      }
	      // ELSE set the service to the passed `service` variable
	      else {
	          service = this[serviceName];
	        }

	      if (!!this.settings.protocol) {
	        options['protocol'] = this.settings.protocol;
	      }

	      // return the stringified image srcset value
	      return service.srcset(data, options);
	    }

	    /**
	     * Register New Image Service
	     * @param {object} serviceData options for create the image service function
	     * @return null    creates a new function on the IPS object
	     */

	  }, {
	    key: 'register',
	    value: function register(serviceData) {
	      if (typeof serviceData === 'undefined' || typeof serviceData.name === 'undefined' || typeof serviceData.render === 'undefined' || typeof serviceData.modifier === 'undefined') {
	        return new Error('Service must contain have a `name`, `render`, function and `modifier` function', serviceData);
	      }
	      this[serviceData.name] = new _base_service2.default(serviceData);
	    }
	  }]);

	  return ImagePlaceholderSrc;
	}();

	module.exports = ImagePlaceholderSrc;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("core-js/fn/object/assign");

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var services = {

	  /**
	   * Placehold.it Service - http://placehold.it/
	   * Supports: custom text
	   * @type {Object}
	   */
	  placeholdit: {
	    name: 'placeholdit',
	    render: function render(args) {
	      var protocol = args.protocol;
	      var width = args.width;
	      var height = args.height;
	      var background = args.background;
	      var foreground = args.foreground;
	      var format = args.format;
	      var text = args.text;

	      return '' + (typeof protocol !== 'undefined' ? protocol : "") + ('//placehold.it/' + width + 'x' + height) + ('' + (typeof background !== 'undefined' ? '/' + background : "")) + ('' + (typeof foreground !== 'undefined' ? '/' + foreground : "")) + ('' + (typeof format !== 'undefined' ? '.' + format : "")) + ('' + (typeof text !== 'undefined' && typeof format === 'undefined' ? '?text=' + text : ""));
	    },
	    modifier: function modifier(data, options) {
	      var formats = ['png', 'gif', 'jpg', 'jpeg'];
	      if (!!data.text) {
	        data['text'] = data.text.replace(" ", "+");
	      }
	      // Only accept [png, gif, jpg, jpeg] formats
	      if (!!data.format) {
	        if (formats.indexOf(data.format) === -1) {
	          // indexOf support: ie9
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
	    render: function render(args) {
	      var protocol = args.protocol;
	      var filter = args.filter;
	      var width = args.width;
	      var height = args.height;
	      var category = args.category;
	      var text = args.text;

	      return '' + (typeof protocol !== 'undefined' ? protocol : "") + '//lorempixel.com' + ('' + (typeof filter !== 'undefined' ? '/' + filter : "")) + ('/' + width + '/' + height) + ('' + (typeof category !== 'undefined' ? '/' + category : "")) + ('' + (typeof text !== 'undefined' && typeof category !== 'undefined' ? '/' + text : ""));
	    },
	    modifier: function modifier(data, options) {
	      if (!!data.text) {
	        data['text'] = data.text.replace(" ", "-");
	      }
	      if (!!data.filter) {
	        switch (data.filter) {
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
	    render: function render(args) {
	      var protocol = args.protocol;
	      var width = args.width;
	      var height = args.height;
	      var category = args.category;
	      var filter = args.filter;

	      return '' + (typeof protocol !== 'undefined' ? protocol : "") + ('//placeimg.com/' + width + '/' + height) + ('' + (typeof category !== 'undefined' ? '/' + category : "")) + ('' + (typeof filter !== 'undefined' ? '/' + filter : ""));
	    },
	    modifier: function modifier(data, options) {
	      var filters = ['greyscale', 'grayscale', 'sepia'];
	      if (!data.category) {
	        data['category'] = 'any';
	      }
	      if (!!data.filter) {
	        if (filters.indexOf(data.filter) === -1) {
	          data.filter = undefined;
	        } else {
	          switch (data.filter) {
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
	    render: function render(args) {
	      var protocol = args.protocol;
	      var width = args.width;
	      var height = args.height;
	      var filter = args.filter;
	      var format = args.format;

	      return '' + (typeof protocol !== 'undefined' ? protocol : "") + '//placecage.com' + ('' + (typeof format !== 'undefined' ? '/' + format : "")) + ('' + (typeof filter !== 'undefined' && typeof format === 'undefined' ? '/' + filter : "")) + ('/' + width + '/' + height);
	    },
	    modifier: function modifier(data, options) {
	      var formats = ['gif'];
	      if (!!data.filter) {
	        switch (data.filter) {
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
	    render: function render(args) {
	      var protocol = args.protocol;
	      var width = args.width;
	      var height = args.height;
	      var filter = args.filter;

	      return '' + (typeof protocol !== 'undefined' ? protocol : "") + '//fillmurray.com' + ('' + (typeof filter !== 'undefined' ? '/' + filter : "")) + ('/' + width + '/' + height);
	    },
	    modifier: function modifier(data, options) {
	      if (!!data.filter) {
	        switch (data.filter) {
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
	    render: function render(args) {
	      var protocol = args.protocol;
	      var width = args.width;
	      var height = args.height;
	      var background = args.background;
	      var theme = args.theme;
	      var format = args.format;
	      var text = args.text;
	      var delay = args.delay;
	      var brand = args.brand;

	      var params = ['format', 'text', 'delay', 'brand', 'flag', 'texture'];
	      var result = "";

	      result = '' + (typeof protocol !== 'undefined' ? protocol : "") + ('//satyr.io/' + width + 'x' + height) + ('' + (typeof background !== 'undefined' ? '/' + background : "")) + ('' + (typeof theme !== 'undefined' ? '/' + theme : ""));

	      // check for any parameter variables and set flag
	      var count = 1;
	      params.forEach(function (param, index) {
	        if (args.hasOwnProperty(param)) {
	          var value = args[param];
	          // change `format` to `type`
	          if (param === 'format') {
	            param = 'type';
	          }
	          result += '' + (count <= 1 ? '?' : '&') + param + '=' + value;
	          count++;
	        }
	      });

	      return result;
	    },
	    modifier: function modifier(data, options) {
	      // Only accept [webp, png, gif, jpg, jpeg] formats
	      var formats = ['webp', 'png', 'gif', 'jpg', 'jpeg'];
	      if (!!data.text) {
	        data['text'] = data.text.replace(" ", "+");
	      }
	      if (!!data.format) {
	        if (formats.indexOf(data.format) === -1) {
	          // indexOf support: ie9
	          data.format = undefined;
	        }
	      }
	      return data;
	    }
	  }
	};

	module.exports = services;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 3rd Party Dependencies


	__webpack_require__(1);

	var _srcset2 = __webpack_require__(4);

	var _srcset3 = _interopRequireDefault(_srcset2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// This only increases the size in the image url.
	// It does not affect the responsive size dimensions
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

	var Service = function () {
	  function Service(serviceConfig) {
	    _classCallCheck(this, Service);

	    Object.assign(this, serviceConfig);
	  }

	  /**
	   * Generate placeholder image `srcset` value string
	   * @param  {array}  data    array of image data objects
	   * @param  {object} options to be passed to the service's src function
	   * @return {string}         image `srcset` value string
	   */


	  _createClass(Service, [{
	    key: 'srcset',
	    value: function srcset(data) {
	      var _this = this;

	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var sources = [];

	      // Loop through each image data object and generate the
	      // image src attribute string to create the image url
	      data.forEach(function (imageData) {
	        var imageDataCopy = Object.assign({}, imageData);
	        if (!!options.protocol) {
	          imageDataCopy['protocol'] = options.protocol;
	        }
	        // collect all the image data while omitting the height
	        // height param doesn't seem to be support by responsive image
	        // ex: 'http://placehold.it/400x400 400w 400h'
	        // see: W3C spec [FIX_ME: Update link]
	        imageDataCopy.url = _this.src(imageDataCopy, options);
	        imageDataCopy.height = null;

	        sources.push(imageDataCopy);
	      });
	      // return the stringified image srcset value
	      return _srcset3.default.stringify(sources);
	    }

	    /**
	     * Generate placeholder image `src` value string
	     * @param  {object} data    to populate template ie: height, width
	     * @param  {object} options to modify the data that populates the src string
	     * @return {string}         image `src` value string
	     */

	  }, {
	    key: 'src',
	    value: function src(data) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      // service:string, options:object
	      var config;
	      var template;
	      var serviceObj;
	      var template;
	      var imageData = Object.assign({}, data);

	      // Apply base data modifiers
	      imageData = baseModifier(imageData, options);
	      // Apply specific service data modifiers
	      imageData = this.modifier(imageData, options);
	      // Return the rendered template
	      return this.render(imageData);
	    }

	    /* placeholder for adding new services */

	  }, {
	    key: 'modifier',
	    value: function modifier() {}

	    /* placeholder for rendering the source string */

	  }, {
	    key: 'render',
	    value: function render() {
	      return "something went wrong";
	    }
	  }]);

	  return Service;
	}();

	module.exports = Service;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("srcset");

/***/ }
/******/ ])
});
;