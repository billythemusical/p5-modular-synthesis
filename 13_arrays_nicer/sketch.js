// now we will make an arrays of oscillators and filters and kind of go nuts
// using envelopes and varying intervals, we have made it more interesting
let oscs = [];
let filts = [];
let freqs = [];
let envs = [];
let notes = [50, 55, 57, 61, 62, 67, 69, 73, 78];
let num = notes.length;
let inc = 0;

function setup() {
  
  for (i = 0; i < num; i++) {
    oscs[i] = new p5.Oscillator('saw');
    // must have setup(); and p5.sound
    oscs[i].freq(midiToFreq(notes[i]));
    envs[i] = new p5.Envelope();
    oscs[i].amp(envs[i]);
    envs[i].setADSR(0.5, 0.5, 0.15, 3);
    envs[i].setRange(0.1);
    oscs[i].start();
    oscs[i].disconnect();
    filts[i] = new p5.Filter();
    filts[i].freq(midiToFreq(notes[i]*2));
    oscs[i].connect(filts[i]);
  }
}

function draw() {
  // here, we modulate the right side of the modulo operator below
  let interval = map(sin(frameCount*0.01), -1, 1, 40, 80);
  
  if (frameCount % int(interval) == 0) {
    let newPitch = random(notes);
    let cycle = inc % notes.length;
    // print(cycle, newPitch);
    inc++;
    oscs[cycle].freq(midiToFreq(newPitch));
    envs[cycle].play();
  }
  
}

// but how to use a more stable clock??  What about an LFO that happens once a second?


