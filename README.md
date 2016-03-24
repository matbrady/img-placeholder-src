# img-placeholder-src

> helper for using structured data to populate various image placeholder sources.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Placeholder Image Services](#services)
- [Why?](#why)
- [Changelog](#changelog)

## Install

```
npm install img-placeholder-src --save
```

## Usage

```
var ips = require('img-placeholder-src')();

var imageData = {
  height: 100,
  width: 100
};

var src = ips.src(imageData, 'placeholdit');
console.log(src);
/*
http://placehold.it/100x100
*/

var srcsetData = [
  {
    height: 100,
    width: 100
  },
  {
    height: 200,
    width: 200
  }
];

var srcset = ips.srcset(srcsetData, 'placeholdit');
console.log(srcset);
/*
http://placehold.it/100x100 100w, http://placehold.it/200x200 200w
*/
```
Each service supports different placeholder variations. An image data object that contains all types of image variations could include the following attributes.


Attribute     | Options     | Description
---           | ---         | ---
`width`       | *integer*   | Width of the image
`height`      | *integer*   | Height of the image
`filter`      | *string*    | *Optional.* Image filter (provided by service)
`foreground`  | *string*    | *Optional.* Image foreground/text color
`background`  | *string*    | *Optional.* Image background color
`format`      | *string*    | *Optional.* Image format (gif, jpeg, jpg)
`text`        | *string*    | *Optional.* Text displayed in the image
`category`    | *string*    | *Optional.* Image category provided by service


## API

### src(imageData, [service], [options])

Accepts an image data object containing at least a height and width. If the optional `unique` attribute is passed, the image src size will be incremented by the `unique` value. This should be the index within a list. This forces the image services to send a different image instead of sending the same image if a duplicate size is requested. For example, the output would look like:

```
var data = [
  {height: 300, width: 300},
  {height: 300, width: 300},
  {height: 300, width: 300}
]
list.forEach(function(item, index) {
  console.log( ips.srcset(data, 'placecage', {unique:index}) );
}
/*
http://placecage.com/300/300 ...
http://placecage.com/301/301 ...
http://placecage.com/302/302 ...
*/
```

### srcset(srcsetData, [service], [options])

Accepts an array of image data objects and returns a string of comma seperated source references and sizes. Optional `options` can be passed to the internal `src()` call.

### register(serviceData)

Registers a new image service function.

Attribute     | Options     | Description
---           | ---         | ---
`name`        | *string*    | Name of registered placeholder service
`template`    | *string*    | Template for image data to be rendered to. Default to [nunjucks](https://mozilla.github.io/nunjucks/templating.html)
`modifier`    | *function*  | *Optional.* Additional logic to modify data passed to the image template. Accepts a data object and **must:** return the modifed data object.

```
ips.register({
  name: 'placekitten',
  template: '{{ protocol }}//placekitten.com{{ "/"+filter if filter }}/{{ width }}/{{ height }}',
  modifier: function(data) {
    return data;
  }
});
```

## API - Services

There are shorthand functions for each service. Although, I would recommend to use the base `src` or `srcset` functions. **Why?** In a application you could conditionally override every placeholder src by setting a configuration varaible. For example:

```
var serviceOverride = 'fillmurray';
var ips = require('img-placeholder-src')({
  serviceOverride: 'fillmurray'
});
```

```
<img src="{{ ips.src(data, 'placeholdit') }}"/>
```

If `serviceOverride` is set, all image sources would be replaced with `fillmurray` sources rather than `placeholdit`. This allows for quickly changing image sources.

### src(imageData, [options])

### srcset(imageData, [options])

## Services

- [placeholdit](http://placehold.it/)
- [placeimg](https://placeimg.com/)
- [fillmurray](http://www.fillmurray.com/)
- [placecage](http://www.placecage.com/)
- [lorempixel](http://lorempixel.com/)

## Why

Populating actual content for a front-end that will later be integrated into a CMS is a waste of time. Placeholder content is more efficient and there are several image services out there that you can use. My default has always been [PLACEHOLD.IT](http://placehold.it/) because the file sizes are small, the dimensions are displayed which is helpful for integrators, the image can be customized in a bunch of different ways, and there's no awkward conversation with the client about why [Bill Murray](http://www.fillmurray.com/) is all over their site. The biggest problem with PLACEHOLD.IT is that the image files are so small. They don't accurately represent the final site with actual image content and weight.

As developers, we should always be testing and optimizing our code to be as perfomant and accessible as possible. To do that we need more realistic placeholder content. We need to be able to test with actual images while also using simpler placeholder content for client reviews. This would require manually updating image sources which could be very tedious and time consuming, especially if you are using [responsive image](https://css-tricks.com/video-screencasts/133-figuring-responsive-images/) techniques. Instead, this module makes it possible to define placeholder image attributes like `height` and `width`, then generate the service image `src` and `srcset` attribute on demand.

## Todo

- [X] https support
- [ ] register custom placeholder template for existing services
- [ ] override existing templates
- [X] add global service override function
- [X] support incrementing source size for custom registered services

[MIT](http://opensource.org/licenses/MIT) © [Mat Brady](https://github.com/matbrady)

## Changelog

- removed height from srcset string output
- added root `src` and `srcset` functions
- added serviceOverride option
- added http protocol override option
