let noise;
let filt;
let freq = 400;

let env;

let slider;

function setup() {
  createCanvas(400, 400);
  
  // the Envelope object is built in to the p5.min.sound.js library 
  env = new p5.Envelope();
  
  // the Envelope object has a default ADSR values.  We can modify them as below
  // to get a sound more like soft orchestral strings or ocean waves
  // let a = 1.2;
  // let d = 0.5;
  // let s = 1.0;
  // let r = 3.0;
  // env.setADSR(a, d, s, r);
  
  // as before
  filt = new p5.Filter();
  noise = new p5.Noise(); 
  noise.disconnect();
  noise.connect(filt);
  filt.freq(freq);
  noise.start();  
  
  // here we are telling the noise to have the amplitude or volume 
  // as descirbed by the envelope
  noise.amp(env);
  
  // create a DOM slider to control the filter's cutoff frequency
  slider = createSlider(100, 1000, freq, 1);
  slider.position(10, 10);
}

function draw() {
  background(220);
  filt.freq(slider.value());
}

// we can use space bar to trigger the envelope, like pressing a key on the piano
// make sure to click in the canvas first
function keyPressed() {
  if (keyCode == 32){
    print('space bar');
    env.play();
  }
}