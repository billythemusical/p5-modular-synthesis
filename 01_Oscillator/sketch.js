let osc;
let freq = 400;

function setup() {
  createCanvas(400, 400);
  
  // the Oscillator function is included in the p5.min.sound.js library 
  osc = new p5.Oscillator();
  // here we tell the oscillator the Hz value at which to vibrate the speakers
  osc.freq(freq);
  // to begin the oscillator
  osc.start();
  
}

function draw() {
  background(220);
}