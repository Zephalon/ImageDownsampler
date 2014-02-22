$(document).ready(function() {
   ImageDownsampler.run('image.jpg', {
      samples_x: 50,
      samples_y: 50,
      accuracy: 1
   }, output);

   ImageDownsampler.run('image.jpg', {
      samples_x: 50,
      samples_y: 50,
      accuracy: 50
   }, output);
});

/**
 * Draw Image
 * 
 * @param {array} samples
 */
var output = function(samples) {
   console.log(samples);

   var $output = $('#output');

   for (var y = 0; y < samples.length; y++) {
      for (var x = 0; x < samples[y].length; x++) {
         var color = samples[x][y].r + ',' + samples[x][y].g + ',' + samples[x][y].b + ',1';
         $output.append('<div class="pixel p' + x + '-' + y + '" style="background-color:rgba(' + color + ');"></div>');
      }
   }
};