# ImageDownsampler

A lightweight JavaScript Image Downsampler for browsers with canvas support. Works with image urls, preloaded image objects and raw canvas data.

## Output

ImageDownsampler returns a two-dimensional array ([x][y]). Each sample contains an object with the rgb data, like {r: 255, g:150, b: 50}.

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
   image.src = 'image.jpg';

   this.image.onload = function() {
      // run downsampler on image load
      var samples = ImageDownsampler.run(image, {
         samples_x: 20,
         samples_y: 15,
         accuracy: 10,
         async: false
      });

      // do something with the samples
      for (var x = 0; x < samples.length; x++) {
         for (var y = 0; y < samples[x].length; y++) {
            console.log(samples[x][y]); // logs something like {r: 255, g:150, b: 50}
         }
      };
```

### Asynchronous

Analysing an image can demand a lot of processing power depending on the size and number of samples. To avoid that your whole application is blocked during analysis you can provide a callback.

```html
   var image = new Image();
   image.src = 'image.jpg';

   this.image.onload = function() {
      ImageDownsampler.run(image, {}, myCallback);
   };

   var myCallback = function (samples) {
      // do something with the samples
   }
```

### Preloading

Image links are automatically preloaded, just make sure the passed string is a valid URL. Please note that this only works asynchronous.

```html
   ImageDownsampler.run('http://www.example.com/image.jpg', {}, myCallback);

   var myCallback = function (samples) {
      // do something with the samples
   }
```

### Advanced

ImageDownsampler also accepts raw canvas data. This can be used to downsample a canvas object, to analyse very large images line by line or to do a partial analysis. Use your own function to get the raw data or use ImageDownsample's 'get' function to retrieve it from a preloaded image object.

```html
   var image = new Image();
   image.src = 'image.jpg';

   this.image.onload = function() {
      var imagedata = ImageDownsampler.get(image);
      // do something with the image data
      var samples = ImageDownsampler.run(imagedata, {}, myCallback);
   };

   var myCallback = function (imagedata) {
      // do something with the samples
   }
```

If you experience performance problems consider reducing the sample size or the accuracy since this greatly improves the processing time. It can also be a good idea to use an already downsampled copy of an image instead of the full sized one. Just keep in mind that the results can appear more edgy.
