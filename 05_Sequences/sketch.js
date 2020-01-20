let noise;
let filt;
let freq = 400;
let env;

// here is a set of frequencies
let seq = [300, 500, 600, 280, 500, 400];
// and a value to increment through them
let note = 0;

function setup() {
  createCanvas(400, 400);
    
  // as before
  env = new p5.Envelope();
  
  // the Envelope object has a default ADSR values.  We can modify them as below
  // let a = 0.1;
  // let d = 0.1;
  // let s = 1;
  // let r = 0.0;
  // env.setADSR(a, d, s, r);
  
  filt = new p5.Filter();
  noise = new p5.Noise(); 
  noise.disconnect();
  noise.connect(filt);
  filt.freq(freq);
  noise.start();  
  noise.amp(env);
}

function draw() {
  // increment through the sequence of values to control the filter's freq
  if (frameCount % 30 == 0) {
    let not = seq[note % seq.length];
    filt.freq(not);
    env.play();
    note++;    
    
    // let's add some visual cues
    // by mapping a color value to the frequency of the filter
    let col = floor(map(not, 280, 600, 0, 255));
    background(col);
    print("not: " + not + " col: " + col);
  }
}

// what if we change the ADSR times?
// what if we change the frameCount % 30 to trigger every 2 frames?
