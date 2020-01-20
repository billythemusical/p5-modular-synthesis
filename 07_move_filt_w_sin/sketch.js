// let's use the sin function in p5 to modulate some values
let noise;
let filt;
let freq = 400;
let env;
let a,d,s,r;

// here is a set of frequencies
let seq = [300, 500, 600, 280, 500, 400];
// and a value to increment through them
let note = 0;

function setup() {
  createCanvas(400, 400);
    
  // as before
  env = new p5.Envelope();
  
  // the Envelope object has a default ADSR values.  We can modify them as below
  a = 0.1;
  d = 0.1;
  s = 1;
  r = 0.0;
  env.setADSR(a, d, s, r);
  
  filt = new p5.Filter();
  noise = new p5.Noise();
  noise.disconnect();
  noise.connect(filt);
  filt.freq(freq);
  noise.start();
  // get rid of this line so the noise will always play
  // noise.amp(env);
}

function draw() {
  
  // here we can do things with the sin function in p5
  // print(sin(frameCount*0.01));
  // let sinRelease = map(sin(frameCount), -1, 1, freq/2, freq*4);
  // filt.freq(sinRelease);
  
  // once we know start to mix audio with visual rates, we get some trippy effects
  // let col = floor(map(sin(frameCount), -1, 1, 0, 255));
  // background(col);
  background (220);
}

// but what's the problem?  It's not precise!  Because the frameRate flutuates...
// so what to do?
