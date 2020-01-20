let noise;
let filt;
let freq = 400;

let slider;

function setup() {
  createCanvas(400, 400);
  
  // the filter function is included in p5.min.sound.js
  // the default filter type is a low pass filter
  filt = new p5.Filter();
  // the noise function will produce oscillators across the whole audible spectrum 
  noise = new p5.Noise(); 
  // we must disconnect the noise from the system audio and then connect it to the filter
  // otherwise both the noise and the filtered noise will sound
  noise.disconnect();
  noise.connect(filt);
  // here we tell the filter the Hz value at which to begin to attenuate the noise
  filter.freq(freq);
  // to begin the sound
  noise.start();  
  
  // create a DOM slider to control the filter's cutoff frequency
  slider = createSlider(100, 1000, freq, 1);
  slider.position(10, 10);
}

function draw() {
  background(220);
  filt.freq(slider.value());
}