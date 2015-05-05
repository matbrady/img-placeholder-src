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
Each service supports different placeholder variations which I've tried to include. At image data object that looks contains all types of variations would look something like this.

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

### service.src(imageData, [options])

Accepts an image data object containing atleast a height and width. If the optional `unique` attribute is passed, the image src size will be increamented by the `unique` value. This should be the index within a list. This forces the image services to send a different image instead of sending the same image if a duplicate size is requested. For example, the output would look like: 

```
var data = [
  {height: 300, width: 300},
  {height: 300, width: 300},
  {height: 300, width: 300}
]
list.forEach(function(item, index) {
  console.log( ips.placecage.srcset(data, {unique:index}) );
}
/*
http://placecage.com/300/300 ...
http://placecage.com/301/301 ...
http://placecage.com/302/302 ...
*/
```

### service.srcset(srcsetData, [options])

Accepts an array of image data objects and returns a string of comma seperated source references and sizes. Optional `options` can be passed to the internal `src()` call. 

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
