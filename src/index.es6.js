// Local Dependencies
import 'core-js/fn/object/assign';
import services    from './services.es6';
import BaseService from './base_service.es6';

class ImagePlaceholderSrc {
  constructor(options={}) {
    this.defaults = {
      // engine: _, // DEPRICATED
      serviceOverride: null,
      service: 'placeholdit',
      protocol: null,
      services: services
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
    for (let service in services) {
      this[service] = new BaseService(services[service]);
    }
  }

  src(data, serviceName, options) {
    let config;
    let service;
    let imageData = Object.assign({}, data);

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

  srcset(data, serviceName, options={}) {
    let config;
    let service;
    let sources = [];

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
  register(serviceData) {
    if (
      typeof(serviceData) === 'undefined'
      || typeof(serviceData.name) === 'undefined'
      || typeof(serviceData.render) === 'undefined'
      || typeof(serviceData.modifier) === 'undefined'
    ) {
      return new Error('Service must contain have a `name`, `render`, function and `modifier` function', serviceData);
    }
    this[serviceData.name] = new BaseService(serviceData);
  }
}

module.exports = ImagePlaceholderSrc;
