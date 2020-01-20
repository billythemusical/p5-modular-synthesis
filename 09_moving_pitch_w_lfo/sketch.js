// now we will modulate pitch of an osc with lfo
let osc;
let freq = 400;
let lfo, freqSlider, amtSlider;

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
  amtSlider = createSlider(0, 1000, 20, 1);
  amtSlider.position(10, 50);
  amtSlider.size(width*0.8, 10);
  
  osc = new p5.Oscillator();
  osc.freq(lfo);
  osc.start();
  // let's turn it down a little first
  osc.amp(0.2);
}

function draw() {
  background(220);
  text("LFO Rate", 10, 40);
  text("LFO Amount", 10, 80);
  
  lfo.freq(freqSlider.value());
  lfo.amp(amtSlider.value());
      
}

// cool huh?  so let's "patch" another LFO to control the amount of the first LFO!  And in this way, we are patching modules together.  This is called frequency modulation or FM synthesis.  

