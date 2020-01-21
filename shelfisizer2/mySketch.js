/*
"shelfisizer2" by R. Luke DuBois
http://www.openprocessing.org/sketch/764799
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/
*/

//
// modes -
// 0 - 6 channels... input goes high and sets bit for a single trigger
// 1 - 6 channels... input goes high and sets bit for a single trigger with hysteresis
// 2 - 6 channels... input value (0 - MAXANALOG/2) is probability for a trigger
// 3 = 6 channels... one trigger per clock across all channels; highest input value gets it
// 4 = 3 channels... paired inputs compared (A/B, C/D, E/F); triggers for winners
// 5 = 3 channels... paired inputs compared (A/B, C/D, E/F); triggers for winners with hysteresis
// 6 - 1 channel... input at pin A (0 - MAXANALOG/2) determines which red trigger (A-F)
// 7 - 2 channels... inputs at pins A and D (0 - MAXANALOG/2) determine which trigger (A/B/C,  D/E/F)
// 8 = 2 channels... and/or/xor - &&/||/!= - of A/B and D/E
// 9 = 2 channels... and/or/xor - &&/||/!= - of A/B and D/E with hysteresis
// 10 = 2 channels... and/or/xor - &&/||/!= - of A/B and D/E with C/F as high threshold
// 11 = 2 channels... and/or/xor - &&/||/!= - of A/B and D/E with C/F as high threshold with hysteresis
//


var o = new Array(6); // oscillators
var e = new Array(6); // envelopes
var rev;
var part, beat;

var rate = 60;
var mode = 0;

var isPlaying = false;

var s = new Array(6); // sliders
var v = new Array(6); // "voltages"
var t = new Array(6); // triggers
var h = new Array(6); // hysteresis
var p = new Array(6); // random
var u = new Array(6); // up lights
var pick; // probability modes
var uptime = 10;

var gb, mb, ts, desc, modelabel;
var thresh = 50; // fire threshold

function setup() {
	createCanvas(800, 600);
	background(100);
	
	initsound();
	
	gb = createButton("MODE");
	gb.position(50, 450);
	gb.mousePressed(clickMode);

	gb = createButton("GO");
	gb.position(50, 500);
	gb.mousePressed(clickGo);
	
	
	var x = 50;
	var xsp = 40;
	var y = 50;
	var ysp = 40;
	var dia = 20;
	for(let i = 0;i<6;i++)
	{
		s[i] = createSlider(1, 1000, 20);
		s[i].position(x, y + (i*ysp));
		v[i] = 0;
		t[i] = 0;
		h[i] = 0;
		p[i] = 0;
		u[i] = 0;
	}
	ts = createSlider(45, 165, 60);
	ts.position(150, 500);
	ts.style('width', '100px');
	desc = createSpan('<font color=#FFFFFF>keys:<br>SPACE: mode<br>RETURN: start/stop</font>');
	desc.position(525, 400);
	desc.style('text-align', 'right');

	modelabel = createSpan('<font color=#FFFFFF>'+mode+'</font>');
	modelabel.position(150, 450);
	modelabel.style('text-align', 'left');

}

function draw() {
	background(192, 128, 128);
	fill(255);
	
	stroke(0);
	var x = width/2 - 100;
	var xsp = 40;
	var y = 50;
	var ysp = 40;
	var dia = 20;
	fill("blue");
	line(x + 100., y, x+100., y + (5*ysp));


		if (mode == 0) { // threshold trigger
			for(let i =0;i<6;i++) {
    	if (v[i] > thresh) t[i] = 1;
			}
  	}
  else if (mode == 1) { // threshold trigger w/ hysteresis
		for(let i =0;i<6;i++) {
				if(v[i]>thresh) {
					if(h[i]==0) {
						t[i] = 1;
						h[i] = 1;
					}
				} else {
					h[i] = 0;
				}
		}
  }
	else if (mode == 4) { // paired comparison trigger
    if (v[0] >= v[1]) t[0] = 1; else t[1] = 1;
    if (v[2] >= v[3]) t[2] = 1; else t[3] = 1;
    if (v[4] >= v[5]) t[4] = 1; else t[5] = 1;
  }
  else if (mode == 5) { // paired comparison trigger w/ hysteresis
    if (v[0] >= v[1]) {
      if (h[0] == 0) {
        t[0] = 1;
        h[0] = 1;
      }
    } else {
      h[0] = 0;
    }
    if (v[1] > v[0]) {
      if (h[1] == 0) {
        t[1] = 1;
        h[1] = 1;
      }
    } else {
      h[1] = 0;
    }
    if (v[2] >= v[3]) {
      if (h[2] == 0) {
        t[2] = 1;
        h[2] = 1;
      }
    } else {
      h[2] = 0;
    }
    if (v[3] > v[2]) {
      if (h[3] == 0) {
        t[3] = 1;
        h[3] = 1;
      }
    } else {
      h[3] = 0;
    }
    if (v[4] >= v[5]) {
      if (h[4] == 0) {
        t[4] = 1;
        h[4] = 1;
      }
    } else {
      h[4] = 0;
    }
    if (v[5] > v[5]) {
      if (h[5] == 0) {
        t[5] = 1;
        h[5] = 1;
      }
    } else {
    	h[5] = 0;
    }
  }
	else if (mode == 8) { // two-channel boolean ops
    if ((v[0] > thresh) && (v[1] > thresh)) t[0] = 1;
    if ((v[0] > thresh) || (v[1] > thresh)) t[1] = 1;
    if ((v[0] > thresh) != (v[1] > thresh)) t[2] = 1;
    if ((v[3] > thresh) && (v[4] > thresh)) t[3] = 1;
    if ((v[3] > thresh) || (v[4] > thresh)) t[4] = 1;
    if ((v[3] > thresh) != (v[4] > thresh)) t[5] = 1;
  }
  else if (mode == 9) { // two-channel boolean ops with hysteresis
    if ((v[0] > thresh) || (v[1] > thresh)) {
      if (h[0] == 0) {
        t[0] = 1;
        h[0] = 1;
      }
    } else {
      h[0] = 0;
    }
    if ((v[0] > thresh) || (v[1] > thresh)) {
      if (h[1] == 0) {
        t[1] = 1;
        h[1] = 1;
      }
    } else {
      h[1] = 0;
    }
    if ((v[0] > thresh) != (v[1] > thresh)) {
      if (h[2] == 0) {
        t[2] = 1;
        h[2] = 1;
      }
    } else {
      h[2] = 0;
    }
    if ((v[3] > thresh) && (v[4] > thresh)) {
      if (h[3] == 0) {
        t[3] = 1;
        h[3] = 1;
      }
    } else {
      h[3] = 0;
    }
    if ((v[3] > thresh) || (v[4] > thresh)) {
      if (h[4] == 0) {
        t[4] = 1;
        h[4] = 1;
      }
    } else {
      h[4] = 0;
    }
    if ((v[3] > thresh) != (v[4] > thresh)) {
      if (h[5] == 0) {
        t[5] = 1;
        h[5] = 1;
      }
    } else {
      h[5] = 0;
    }
  }
  else if (mode == 10) { // two-channel boolean ops around threshold
    if ((v[0] > v[2]) && (v[1] > v[2])) t[0] = 1;
    if ((v[0] > v[2]) || (v[1] > v[2])) t[1] = 1;
    if ((v[0] > v[2]) != (v[1] > v[2])) t[2] = 1;
    if ((v[3] > v[5]) && (v[4] > v[5])) t[3] = 1;
    if ((v[3] > v[5]) || (v[4] > v[5])) t[4] = 1;
    if ((v[3] > v[5]) != (v[4] > v[5])) t[5] = 1;
  }
  else if (mode == 11) { // two-channel boolean ops around threshold with hysteresis
    if ((v[0] > v[2]) || (v[1] > v[2])) {
      if (h[0] == 0) {
        t[0] = 1;
        h[0] = 1;
      }
    } else {
      h[0] = 0;
    }
    if ((v[0] > v[2]) || (v[1] > v[2])) {
      if (h[1] == 0) {
        t[1] = 1;
        h[1] = 1;
      }
    } else {
      h[1] = 0;
    }
    if ((v[0] > v[2]) != (v[1] > v[2])) {
      if (h[2] == 0) {
        t[2] = 1;
        h[2] = 1;
      }
    } else {
      h[2] = 0;
    }
    if ((v[3] > v[5]) && (v[4] > v[5])) {
      if (h[3] == 0) {
        t[3] = 1;
        h[3] = 1;
      }
    } else {
      h[3] = 0;
    }
    if ((v[3] > v[5]) || (v[4] > v[5])) {
      if (h[4] == 0) {
        t[4] = 1;
        h[4] = 1;
      }
    } else {
      h[4] = 0;
    }
    if ((v[3] > v[5]) != (v[4] > v[5])) {
      if (h[5] == 0) {
        t[5] = 1;
        h[5] = 1;
      }
    } else {
      h[5] = 0;
    }
  }
	
	// OUTPUT:
	for(let i =0;i<6;i++)
	{
		if(u[i]>0) fill("lightblue"); else fill("white"); // mark trigger
		ellipse(x + v[i]*2, y + (i*ysp), dia, dia);
		if(isPlaying) {
			v[i] = (v[i]+s[i].value()/300.)%100.; // increment
			u[i]--;
		}
	}
	
}

function keyPressed()
{
	if (keyCode === 13) {
		clickGo();
	}
	if (keyCode === 32) {
		clickMode();
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

function clickMode()
{
	mode = (mode+1)%12;	
	modelabel.html('<font color=#FFFFFF>'+mode+'</font>');
}


function doBeat()
{
	// ON TRIGGER: modes 2, 3, 6, 7:
	if (mode == 2) // probability trigger
	{
		for(let i = 0;i<6;i++)
		{
			p[i] = random(0, 100);
			if(p[i]<v[i]) t[i] = 1;
		}
	}
	else if (mode == 3) // highest channel triggers
	{
		let highest = -1;
		pick = -1;
		for(let i = 0;i<6;i++)
		{
			if (v[i] > highest) {
				pick = i;
				highest = v[i];
			}
		}
		t[pick] = 1;
	}
	else if (mode == 6) // A jack determines A-F trigger
	{
		pick = constrain(floor(v[0] / 100. * 6.), 0, 5);
		t[pick] = 1;
	}
	else if (mode == 7) // A jack determines A-C trigger, D jack determines D-F trigger
	{
		pick = constrain(floor(v[0] / 100. * 3.), 0, 2);
		t[pick] = 1;
		pick = constrain(floor(v[3] / 100. * 3.), 0, 2);
		t[pick+3] = 1;
	}
	
	// DO THE STUFF:
	for(let i = 0;i<6;i++)
	{
		if(t[i]) {
			e[i].play();
			u[i] = uptime;
			t[i] = 0;
		}
	}
	part.setBPM(ts.value());
}

function initsound()
{
	var notes = [48, 51, 58, 65, 70, 75];
	rev = new p5.Reverb();
	rev.drywet(0.5);
	
	for(let i = 0;i<6;i++)
	{
		e[i] = new p5.Envelope();
		e[i].setADSR(0.001, 0.0, 0.25, 0.5);
		o[i] = new p5.Oscillator();
		o[i].setType('triangle');
		o[i].freq(midiToFreq(notes[i]));
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
