//this time we will use MIDI notes which you can think of as simply 
// the keys on a piano sequentially numbered from 0 to 127
let osc;
let filt;
let freq = 400;
let env;
let x;

// here is a set of MIDI notes
let seq = [50, 57, 62, 49, 55, 54];
// and a value to increment through them
let note = 0;

function setup() {
  createCanvas(400, 400);
    
  // as before
  env = new p5.Envelope();
  
  filt = new p5.Filter();
  osc = new p5.Oscillator(); 
  osc.disconnect();
  osc.connect(filt);
  filt.freq(freq);
  osc.start();  
  osc.amp(env);
  // set how loud the envelope gets
  env.setRange(0.2);
}

function draw() {
  
  // increment through the sequence of values every fifteen frames
  if (frameCount % 10 == 0) {
    let not;
    if(random(1) < 0.8) {
      // 80% of the time cycle through the array in order
      not = seq[note % seq.length];
    } else {
      //otherwise play a random note from the array of sequences
      not = random(seq);
    }
    // for the visuals below
    x = not;
    // set the oscillator frequency
    osc.freq(midiToFreq(not));
    // and trigger the envelope
    env.play();
    // increment the note
    note++;    
    
  }
  
  // and some visual fun
  // background(0, 10);
  // push();
  // colorMode(HSB);
  // noStroke();
  // fill(map(x, 49, 62, 0, 255), 100, 100);
  // ellipse(map(x, 49, 62, width*0.1, width*0.9) + random(-40, 40), height*0.5, 40);
  // pop();
}

// what if we change the ADSR times?
// what if we change the frameCount % 30 to trigger every 2 frames?
