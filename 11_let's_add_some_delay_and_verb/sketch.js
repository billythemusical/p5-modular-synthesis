// now we will modulate pitch of an osc with lfo
let osc;
let freq = 400;
let lfo1, freqSlider1, amtSlider1;
let lfo2, freqSlider2, amtSlider2;
let delay, reverb;

function setup() {
  createCanvas(400, 400);
  
  // a new low frequency oscillator will fix the issue with sin in draw();
  lfo1 = new p5.Oscillator();
  lfo1.start();
  // so the lfo is not sent the system audio
  lfo1.disconnect();
  
  lfo2 = new p5.Oscillator();
  lfo2.start();
  // so the lfo is not sent the system audio
  lfo2.disconnect();
  
  // a slider that goes into "audio rate" to control the lfo frequency
  freq1Slider = createSlider(0.01, 60, 0.5, 0.01);
  freq1Slider.position(10, 10);
  freq1Slider.size(width*0.8, 10);

  // a slider that goes into "audio rate" to control the lfo frequency
  amt1Slider = createSlider(0, 1000, 0, 1);
  amt1Slider.position(10, 50);
  amt1Slider.size(width*0.8, 10);
  
    // a slider that goes into "audio rate" to control the lfo frequency
  freq2Slider = createSlider(0.001, 1, 0.5, 0.001);
  freq2Slider.position(10, 100);
  freq2Slider.size(width*0.8, 10);

  // a slider that goes into "audio rate" to control the lfo frequency
  amt2Slider = createSlider(-500, 500, 0, 1);
  amt2Slider.position(10, 140);
  amt2Slider.size(width*0.8, 10);
  
  osc = new p5.Oscillator();
  // osc = new p5.Oscillator('square');
  // here is where we connect the LFO's
  osc.freq(lfo1);
  lfo1.freq(lfo2);
  osc.start();
  // let's turn it down a little first
  osc.amp(0.2);
  
  delay = new p5.Delay();
  // receives 4 args: (source, delay time in secs, feedback, filter freq);
  delay.process(osc, 0.99, 0.5);
  reverb = new p5.Reverb();
  // receives 4 args: (source, delay time in secs, feedback, filter freq);
  // reverb.process(osc, 3.0, 8);
  
  osc.disconnect();
  // to use the chain function, we must use the full p5.sound.js library
  // pop over to the index file and change it <<<
  osc.connect(delay);
  delay.connect(reverb);
  // delay.chain(reverb);
}

function draw() {
  background(220);
  text("LFO1 Freq: " + freq1Slider.value(), 10, 40);
  text("LFO1 Amount: " + amt1Slider.value(), 10, 80);  
  text("LFO2 Freq: " + freq2Slider.value(), 10, 130);
  text("LFO2 Amount: " + amt2Slider.value(), 10, 170);
  
  lfo1.freq(freq1Slider.value());
  lfo1.amp(amt1Slider.value());  
  lfo2.freq(freq2Slider.value());
  lfo2.amp(amt2Slider.value());
      
}

// Did you know you could change the shape of the oscillator?
