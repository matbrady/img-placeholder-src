# img-placeholder-src

> helper for using strcutured data to populate various image placeholder sources.

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

  var src = ips.placeholdit.src(imageData);
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

  var srcset = ips.placeholdit.srcset(srcsetData);
  console.log(srcset);
  /*
  http://placehold.it/100x100 100w 100h, http://placehold.it/200x200 200w 200h, 
  */
  ```

## API

### service.src()

Accepts an image data object containing atleast a height and width

### service.srcset()

Accepts an array of image data objects and returns a string of comma seperated source references and sizes. 

## Services 

- [placeholdit](http://placehold.it/)
- [placeimg](https://placeimg.com/)
- [fillmurray](http://www.fillmurray.com/)
- [placecage](http://www.placecage.com/)
- [lorempixel](http://lorempixel.com/)

## Todo

- [ ] https support
- [ ] register custom placeholder template
- [ ] override existing templates

[MIT](http://opensource.org/licenses/MIT) © [Mat Brady](https://github.com/matbrady)
