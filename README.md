# img-placeholder-src

> helper for using structured data to populate various image placeholder sources. 

**!! IMPORTANT:** This module is actively in development and you should expect breaking changes in the future versions

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
http://placehold.it/100x100 100w, http://placehold.it/200x200 200w, 
*/
```
Each service supports different placeholder variations which I've tried to include. An image data object that contains all types of image variations would look something like this.

```
{
  "height": 100,
  "width":  100,
  "filter": "greyscale",
  "foreground": "ffffff",
  "background": "999999",
  "format": "gif",
  "text": "Hello world",
  "category": "people"
}
```

## API

### src(imageData, [service], [options])

Accepts an image data object containing atleast a height and width. If the optional `unique` attribute is passed, the image src size will be increamented by the `unique` value. This should be the index within a list. This forces the image services to send a different image instead of sending the same image if a duplicate size is requested. For example, the output would look like: 

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

If `serviceOverride` is set, all image source would be replaced with `fillmurray` sources rather than `placeholdit`. This allows for quickly changing image sources. 

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

As developers we should always be testing and optimizing our code to be as perfomant and accessible as possible. To do that we need more realistic placeholder content. So we need to be able to test with actual images but use simpler placeholder content for client reviews. This would require manually updating image sources which could be very tedious and time consuming, especially if you are using [responsive image](https://css-tricks.com/video-screencasts/133-figuring-responsive-images/) techniques. Instead, this module makes it possible to define placeholder image attributes like `height`, `width` and generate the service image `src` and `srcset` attribute on demand. 

## Todo

- [X] https support
- [ ] register custom placeholder template
- [ ] override existing templates
- [X] add global service override function

[MIT](http://opensource.org/licenses/MIT) © [Mat Brady](https://github.com/matbrady)

## Changelog 

- removed height from srcset string output
- added root `src` and `srcset` functions
- added serviceOverride option
- added http protocol override option
