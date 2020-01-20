// let's use the sin function in p5 to modulate some values
let noise;
let filt;
let freq = 400;
let lfo, freqSlider, rateSlider;

// here is a set of frequencies
let seq = [300, 500, 600, 280, 500, 400];
// and a value to increment through them
let note = 0;

function setup() {
  createCanvas(400, 400);
  
  // a new low frequency oscillator will fix the issue with sin in draw();
  lfo = new p5.Oscillator();
  lfo.start();
  // so the lfo is not sent the system audio
  lfo.disconnect();
  
  // a slider that goes into "audio rate" to control the lfo frequency
  freqSlider = createSlider(0.01, 60, 0.5, 0.01);
  freqSlider.position(10, 10);
  freqSlider.size(width*0.8, 10);

  
  // a slider that goes into "audio rate" to control the lfo frequency
  ampSlider = createSlider(0, 1000, 20, 1);
  ampSlider.position(10, 50);
  ampSlider.size(width*0.8, 10);
  
  filt = new p5.Filter('bandpass');
  // using a band pass filter will make the effect more obvious
  // filt = new p5.Filter('bandpass');
  noise = new p5.Noise();
  noise.disconnect();
  noise.connect(filt);
  filt.freq(lfo);
  noise.start();
  // get rid of this line so the noise will always play
  // noise.amp(env);
}

function draw() {
  background(220);
  text("LFO Rate", 10, 40);
  text("LFO Amount", 10, 80);
  
  lfo.freq(freqSlider.value());
  lfo.amp(ampSlider.value());
  // filt.freq(lfo);
      
}

// what if we add a sequencer to control the LFO?


