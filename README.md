# Image Downsampler

A lightweight Image Downsampler for browsers with canvas support.

## Usage

This script does not preload images, make sure your image is loaded. I recommend the jQuery 'onload' method (see examples). It returns a two-dimensional array (samples[x][y]).

Consider reducing the sample size or the accuracy to improve the performance.

## Settings (defaults)

- 'samples_x' - the number of horizontal samples (10)
- 'samples_y' - the number of vertical samples (10)
- 'accuracy' - sample every * pixel for better performance (5)
- 'bleed' - distance to image border to avoid faulty analysing (10)
- 'async' - execute asynchronous to avoid blocking the script (false)

## Examples

### Synchronous

This example would return an 20x15 array and analyse on every 10th pixel.

   var image = new Image();
   image.src = 'http://www.example.com/image.jpg';

   // run downsampler on image load
   this.image.onload = function() {
      var samples = ImageDownsampler.run(image, {
         samples_x: 20,
         samples_y: 15,
         accuracy: 10
      });
   };

   // do something with the samples

### Asynchronous

Analysing an image can demand a lot of processing power depending on the size and number of samples. To avoid that the script is blocking the main thread you can provide a callback and execute it .

   var image = new Image();
   image.src = 'http://www.example.com/image.jpg';

   this.image.onload = function() {
      ImageDownsampler.run(image, {
         async: true
      }, myCallback);
   };

   var myCallback = function (samples) {
      // do something with the samples
   }