# ImageDownsampler

A lightweight JavaScript Image Downsampler for browsers with canvas support. Works with image urls, image objects (make sure they are preloaded) and raw canvas data. ImageDownsampler returns a two-dimensional array (samples[x][y]). Consider reducing the sample size or the accuracy to improve the performance.

## Settings (defaults)

- 'samples_x' - the number of horizontal samples (10)
- 'samples_y' - the number of vertical samples (10)
- 'accuracy' - sample every * pixel for better performance (5)
- 'bleed' - distance to image border to avoid faulty analysing (5)
- 'async' - execute asynchronous to avoid blocking the application (true)

## Examples

### Synchronous

This example calculates a 20x15 array and analyses every 10th pixel.

```html
   var image = new Image();
   image.src = 'http://www.example.com/image.jpg';

   // run downsampler on image load
   this.image.onload = function() {
      var samples = ImageDownsampler.run(image, {
         samples_x: 20,
         samples_y: 15,
         accuracy: 10,
         async: false
      });

      // do something with the samples
   };
```

### Asynchronous

Analysing an image can demand a lot of processing power depending on the size and number of samples. To avoid that your whole application is blocked during analysis you can provide a callback.

```html
   var image = new Image();
   image.src = 'http://www.example.com/image.jpg';

   this.image.onload = function() {
      ImageDownsampler.run(image, {}, myCallback);
   };

   var myCallback = function (samples) {
      // do something with the samples
   }
```

### Preloading

Image urls are automaticly preloaded. This only works asynchronous.

```html
   ImageDownsampler.run('http://www.example.com/image.jpg', {}, myCallback);

   var myCallback = function (samples) {
      // do something with the samples
   }
```

### Advanced

ImageDownsampler also accepts raw canvas data. This can be used to downsample a canvas object, to analyse very large images line by line or to do a partial analysis. Use your own function to get the raw data or use ImageDownsample's 'get' function to retrieve it from a an preloaded image object.

```html
   var image = new Image();
   image.src = 'http://www.example.com/image.jpg';

   this.image.onload = function() {
      var imagedata = ImageDownsampler.get(image);
      // do something with the image data
      var samples = ImageDownsampler.run(imagedata, {}, myCallback);
   };

   var myCallback = function (imagedata) {
      // do something with the samples
   }
```