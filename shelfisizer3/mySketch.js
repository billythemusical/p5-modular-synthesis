/*
"shelfisizer3" by R. Luke DuBois
http://www.openprocessing.org/sketch/764951
Licensed under Creative Commons Attribution ShareAlike 
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/
*/
var o = new Array(3); // oscillators
var e = new Array(3); // envelopes
var rev;
var part, beat;

var rate = 60;
var mode = 0;

var isPlaying = false;

var s = new Array(3); // sliders
var v = new Array(3); // "voltages"
var idx = new Array(3); // indexes
var u = new Array(3); // light time
var uptime = 1;

var gb, ts, desc;
var p = new Array(16); // pitchsliders
var thresh = 50; // fire threshold

function setup() {
	createCanvas(800, 600);
	background(100);
	
	initsound();
	
	gb = createButton("GO");
	gb.position(50, 500);
	gb.mousePressed(clickGo);
	
	
	var x = 50;
	var xsp = 40;
	var y = 50;
	var ysp = 40;
	var dia = 20;
	for(let i = 0;i<3;i++)
	{
		s[i] = createSlider(1, 1000, 20);
		s[i].position(x, y + (i*ysp));
		v[i] = 0;
		u[i] = 0;
		idx[i] = 0;
	}
	
	y+=200;
	//x = width/2 - 100;
	for(let i = 0;i<16;i++)
	{
		p[i] = createSlider(20, 90, 60);
		p[i].position(x + xsp*i, y + ysp*(i%4));
		//p[i].style('-webkit-appearance', 'slider-vertical');
	}
	ts = createSlider(45, 165, 60);
	ts.position(150, 500);
	ts.style('width', '100px');
	desc = createSpan('<font color=#FFFFFF>keys:<br>RETURN: start/stop</font>');
	desc.position(525, 400);
	desc.style('text-align', 'right');


}

function draw() {
	background(128, 192, 128);
	fill(255);
	
	stroke(0);
	var x = width/2 - 100;
	var xsp = 40;
	var y = 50;
	var ysp = 40;
	var dia = 20;

	// OUTPUT:
	for(let i =0;i<3;i++)
	{
		if(u[i]>0) fill("lightblue"); else fill("blue"); // mark trigger
		ellipse(x + v[i]*2, y + (i*ysp), dia, dia);
		line(x + v[i]*2, y + (i*ysp), 50+xsp*idx[i], 250+ysp*(idx[i]%4));
		if(isPlaying) {
			v[i] = (v[i]+s[i].value()/300.)%100.; // increment
			idx[i] = floor(constrain(map(v[i], 0, 100, 0, 16), 0, 15));
			u[i]--;
		}
	}
	
}

function keyPressed()
{
	if (keyCode === 13) {
		clickGo();
	}
}


function clickGo()
{
	if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
	isPlaying = !isPlaying;
	if(isPlaying) part.start(); else part.stop();
	
}


function doBeat()
{
	// DO THE STUFF:
	for(let i = 0;i<3;i++)
	{
		let pitch = p[idx[i]].value();
		o[i].freq(midiToFreq(pitch));
		e[i].play();
		u[i] = uptime;
	}
	part.setBPM(ts.value());
}

function initsound()
{
	rev = new p5.Reverb();
	rev.drywet(0.5);
	
	for(let i = 0;i<3;i++)
	{
		e[i] = new p5.Envelope();
		e[i].setADSR(0.001, 0.0, 0.25, 0.5);
		o[i] = new p5.Oscillator();
		o[i].setType('sine');
		o[i].freq(midiToFreq(60));
		o[i].amp(1);
		o[i].start();
		o[i].amp(e[i]);
		o[i].disconnect();
		rev.process(o[i], 3, 2);
	}
	
	beat = new p5.Phrase('beat', doBeat, [1]);
	part = new p5.Part();
	part.addPhrase(beat);
	part.setBPM(60);
	part.loop();
	part.stop();
	
}
