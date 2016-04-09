// 3rd Party Dependencies
import 'core-js/fn/object/assign';
import srcset from 'srcset';

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

class Service {
  constructor(serviceConfig) {
    Object.assign(this, serviceConfig);
  }

  /**
   * Generate placeholder image `srcset` value string
   * @param  {array}  data    array of image data objects
   * @param  {object} options to be passed to the service's src function
   * @return {string}         image `srcset` value string
   */
  srcset(data, options={}) {
    var sources = [];

    // Loop through each image data object and generate the
    // image src attribute string to create the image url
    data.forEach((imageData) => {
      let imageDataCopy = Object.assign({}, imageData);
      if (!!options.protocol) {
        imageDataCopy['protocol'] = options.protocol;
      }
      // collect all the image data while omitting the height
      // height param doesn't seem to be support by responsive image
      // ex: 'http://placehold.it/400x400 400w 400h'
      // see: W3C spec [FIX_ME: Update link]
      imageDataCopy.url = this.src(imageDataCopy, options);
      imageDataCopy.height = null;

      sources.push(imageDataCopy);
    });
    // return the stringified image srcset value
    return srcset.stringify(sources);
  }

  /**
   * Generate placeholder image `src` value string
   * @param  {object} data    to populate template ie: height, width
   * @param  {object} options to modify the data that populates the src string
   * @return {string}         image `src` value string
   */
  src(data, options={}) { // service:string, options:object
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
  modifier() {}

  /* placeholder for rendering the source string */
  render() {
    return "something went wrong"
  }
}

module.exports = Service;
