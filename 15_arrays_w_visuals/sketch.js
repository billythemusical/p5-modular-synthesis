/* now we can add visuals with our sound by uncommenting lines 29 and 47-50 */
let oscs = [];
let filts = [];
let freqs = [];
let envs = [];
let bubbles = [];
let notes = [50, 55, 57, 61, 62, 67, 69, 73, 78];
let num = notes.length;
let inc = 0;


function setup() {
  createCanvas(600, 600);
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
    let w = width*0.5 + random(-width*0.4, width*0.4);
    let h = height*0.5 + random(-height*0.2, height*0.2);
    // bubbles[i] = new Bubble(w, h, 100, envs[i]);
  }
}

function draw() {
  background(200, 100, 200);
  let interval = map(sin(frameCount*0.01), -1, 1, 40, 100);
  // print(interval);
  if (frameCount % int(interval) == 0) {
  // if (frameCount % 10 == 0) {
    let newPitch = random(notes);
    let cycle = inc % notes.length;
    // print(cycle, newPitch);
    inc++;
    oscs[cycle].freq(midiToFreq(newPitch));
    envs[cycle].play();
  }
  
  // for(i of bubbles) {
  //   i.display(random(255));
  //   i.listen(envs[i]);
  // }
  
}

// can we choose to change the key after a certain interval or if we give some input?



