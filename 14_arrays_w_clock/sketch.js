// now we will make an arrays of oscillators and filters and kind of go nuts
let oscs = [];
let filts = [];
let freqs = [];
let notes = [50, 55, 57, 59, 61, 62, 67, 69, 73];
let num = notes.length;
let inc = 0;
let lfoClock, amp;
let change = false;
let prevChange = false;

function setup() {

  for (i = 0; i < num; i++) {
    oscs[i] = new p5.Oscillator('saw');
    // must have setup(); and p5.sound
    oscs[i].freq(midiToFreq(notes[i]));
    oscs[i].amp(0.1);
    oscs[i].start();
    oscs[i].disconnect();
    filts[i] = new p5.Filter();
    filts[i].freq(midiToFreq(notes[i] * 2));
    oscs[i].connect(filts[i]);
  }

  lfoClock = new p5.Oscillator();
  lfoClock.freq(1);
  lfoClock.start();
  lfoClock.disconnect();

  amp = new p5.Amplitude();
  amp.setInput(lfoClock);

}

function draw() {

  if (amp.getLevel() > 0.3) {
    change = true;
  } else {
    change = false;
  }
  
  if (change == true && prevChange != change) {
    // if (frameCount % 10 == 0) {
    print('should change');
    // let newPitch = floor(random(-1, 1)) * 5;
    let newPitch = int(random(-2, 2)) * 5;
    let cycle = inc % notes.length;
    inc++;
    oscs[cycle].freq(midiToFreq(notes[cycle] + newPitch));
  print("newPitch: " + newPitch + " cycle: " + cycle);
  }
  prevChange = change;
}
