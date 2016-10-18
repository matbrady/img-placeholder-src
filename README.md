# img-placeholder-src

> helper for using structured data to populate various image placeholder sources. `18kb/6kb`

[![Build Status](https://travis-ci.org/matbrady/img-placeholder-src.svg?branch=master)](https://travis-ci.org/matbrady/img-placeholder-src) [![npm version](https://badge.fury.io/js/img-placeholder-src.svg?v=3.0.0)](https://badge.fury.io/js/img-placeholder-src)

**[Demo](http://matbrady.github.io/img-placeholder-src/)** showing keys features. For code examples and docs, see below.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
 - [Node](#node)
 - [Browser](#browser)
- [Configure](#configure)
- [API](#api)
- [Placeholder Image Services](#services)
- [Why?](#why)
- [Compatibility](#compatibility)
- [Changelog](#changelog)

## Install

```
npm install img-placeholder-src --save
```

## Usage

###### Node

```js
var IPS = require('img-placeholder-src');
var ips = new IPS;

var imageData = {
  height: 100,
  width: 100
};

var src = ips.src(imageData, 'placeholdit');
console.log(src);
/*
http://placehold.it/100x100
*/
```

```js
var IPS = require('img-placeholder-src');
var ips = new IPS;

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

###### Browser

Download the bundled script file [`img-placeholder-src.bundle.js`](https://github.com/matbrady/img-placeholder-src/blob/master/dist/img-placeholder-src.bundle.js). There is also a none bundle version available, but you will have to include the [srcset](https://www.npmjs.com/package/srcset) dependency yourself.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="img-placeholder-src.bundle.js"></script>
  <script>
  // Initialize/Configure IPS
  var ips = new IPS({
    serviceOverride: 'fillmurray'
  });
  // Create image data object
  var imageData = {
    height: 100,
    width: 100
  };
  // generate image source
  var src = ips.src(imageData);
  // create and image element
  var img1 = document.createElement("IMG");
  // set the image src attribute
  img1.setAttribute('src', src);
  // append the image to the body
  document.body.appendChild(img1);
  </script>
</body>
```

Each service supports different placeholder variations. An image data object that contains all types of image variations could include the following attributes.


|Attribute     | Options     | Description
|:---          |:---         |:---
|`width`       | *integer*   | Width of the image
|`height`      | *integer*   | Height of the image
|`filter`      | *string*    | *Optional.* Image filter (provided by service)
|`foreground`  | *string*    | *Optional.* Image foreground/text color
|`background`  | *string*    | *Optional.* Image background color
|`format`      | *string*    | *Optional.* Image format (gif, jpeg, jpg, png)
|`text`        | *string*    | *Optional.* Text displayed in the image
|`category`    | *string*    | *Optional.* Image category provided by service
|`delay`       | *integer*   | *Optional.* Response delay from server
|`brand`       | *string*    | *Optional.* Brand image
|`flag`        | *string*    | *Optional.* Flag image
|`texture`     | *string*    | *Optional.* Texture applied to backgrounds

## Configure

There are several settings that can be applied to the IPS configuration. They include:
``` js
var IPS = require('img-placeholder-src');
var ips = new IPS({
  serviceOverride: null,  // override service name          ex: 'placecage'
  service: 'placeholdit', // default service name           ex: 'fillmurray'
  protocol: null          // protocol prepended to src url  ex: 'https:'
});
```

## API

### src(imageData, [service], [options])

Accepts an image data object containing at least a height and width. If the optional `unique` attribute is passed, the image src size will be incremented by the `unique` value. This should be the index within a list. This forces the image services to send a different image instead of sending the same image if a duplicate size is requested. For example, the output would look like:

```js
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
`render`    | *function*  | `[data]` accepts settings that will populate the image source string which it returns. A template compile function could be used here.
`modifier`    | *function*  | *Optional.* Additional logic to modify data passed to the image template. Accepts a data object and **must:** return the modifed data object.

```js
ips.register({
  name: 'placekitten',
  render: function(args) {
    return (typeof(args.protocol) !== 'undefined' ? args.protocol : "")
      + '//placekitten.com'
      + (typeof(args.filter) !== 'undefined' ? '/'+args.filter : "")
      + '/' + args.width + '/' + args.width;
  },
  modifier: function(data) {
    return data;
  }
});

var imageData = {
  height: 100,
  width: 100,
  filter: 'greyscale'
};

var src = ips.src(imageData, 'placekitten');
console.log(src);

/*
//placekitten.com/g/100x100
*/
```
see [`services.es6.js`](https://github.com/matbrady/img-placeholder-src/tree/master/src/services.es6.js) for modifier example

## API - Services

There are shorthand functions for each service. Although, I would recommend to use the base `src` or `srcset` functions. **Why?** In a application you could conditionally override every placeholder src by setting a configuration variable. For example:

```js
var serviceOverride = 'fillmurray';
var ips = new IPS({
  serviceOverride: 'fillmurray'
});
```

```js
<img src="{{ ips.src(data, 'placeholdit') }}"/>
```

If `serviceOverride` is set, all image sources would be replaced with `fillmurray` sources rather than `placeholdit`. This allows for quickly changing image sources.

### src(imageData, [options])

### srcset(imageData, [options])

## Services

By default, these services are supported with no extra configuration. New services can be added by passing a `serviceData` object to the `ips.register` function. See the [API](#register) for reference

- [placeholdit](http://placehold.it/)
- [placeimg](https://placeimg.com/)
- [fillmurray](http://www.fillmurray.com/)
- [placecage](http://www.placecage.com/)
- [lorempixel](http://lorempixel.com/)
- [satyr](http://satyr.io/)

## Why

Populating actual content for a front-end that will later be integrated into a CMS is a waste of time. Placeholder content is more efficient and there are several image services out there that you can use. My default has always been [PLACEHOLD.IT](http://placehold.it/) because the file sizes are small, the dimensions are displayed which is helpful for integrators, the image can be customized in a bunch of different ways, and there's no awkward conversation with the client about why [Bill Murray](http://www.fillmurray.com/) is all over their site. The biggest problem with PLACEHOLD.IT is that the image files are so small. They don't accurately represent the final site with actual image content and weight.

As developers, we should always be testing and optimizing our code to be as efficient and accessible as possible. To do that we need more realistic placeholder content. We need to be able to test with actual images while also using simpler placeholder content for client reviews. This would require manually updating image sources which could be very tedious and time consuming, especially if you are using [responsive image](https://css-tricks.com/video-screencasts/133-figuring-responsive-images/) techniques. Instead, this module makes it possible to define placeholder image attributes like `height` and `width`, then generate the service image `src` and `srcset` attribute on demand.

## Contribute

1. Clone this repo
2. Build module and run tests `npm run watch`

`npm test` - runs application mocha tests  
`npm run watch` - runs the wepack build and mocha tests. Watches for new changes  
`npm run build:dev` - runs the wepack build  
`npm run dev` - runs the webpack build and tests the application for errors.
`npm run build` - builds various versions of the script to be used on the demo site and by browser

##### Update Example Page
pushes current checked out branch to the remote github-pages (`gh-pages`) branch
```
npm run deploy
```

## Compatibility

Latest Chrome  
Latest Safari  
Latest Firefox  
Latest Mobile Safari  
IE 9+  
Node 0.10+ via [TravisCI](https://travis-ci.org/matbrady/img-placeholder-src)  

[MIT](http://opensource.org/licenses/MIT) © [Mat Brady](https://github.com/matbrady)

## Changelog

Chackout the [Github release feed](https://github.com/matbrady/img-placeholder-src/releases)

## Todo

- [ ] register custom placeholder template for existing services
- [ ] override existing templates
- [ ] investigate whitelisting image options (ex: accepted formats or filters)
- [x] https support
- [x] es6 re-write
- [x] browser support
 - [x] remove extraneous dependencies
 - [x] create distribution package using webpack
- [x] add global service override function
- [x] support incrementing source size for custom registered services
