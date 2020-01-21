var oA, oB, oC, oD;
var eA, eB, eC, eD;
var rev;
var part, beat;

var rate = 60;
var sptr = 0;
var fptr = 0;
var seqstart = 0;
var seqend = 15;
var seqA = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
var seqB = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0];
var seqC = [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];
var seqD = [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1];
var isPlaying = false;
var dir = 1
var c = ["Red", "Green", "Yellow", "Blue", "Red", "Green", "Orange", "Blue", "Red", "Green", "Yellow", "Blue", "Red", "Green", "Orange", "Blue"];

var NUMVIEWS = 6;
var view = 0;
var b1, b2, b3, b4, gb, ts, desc;
var crsr = 0;

function setup() {
	createCanvas(800, 600);
	background(100);
	
	initsound();
	
	b1 = createButton("Page");
	b1.position(50, 400);
	b1.mousePressed(clickPage);
	b2 = createButton("Select");
	b2.position(50, 450);
	b2.mousePressed(clickSelect);
	b3 = createButton("LEFT");
	b3.position(150, 400);
	b3.mousePressed(clickLeft);
	b4 = createButton("RIGHT");
	b4.position(150, 450);
	b4.mousePressed(clickRight);
	gb = createButton("GO");
	gb.position(50, 500);
	gb.mousePressed(clickGo);
	ts = createSlider(45, 165, 60);
	ts.position(150, 500);
	ts.style('width', '100px');
	desc = createSpan('<font color=#FFFFFF>keys:<br>UP/DOWN: page<br>LEFT/RIGHT: cursor<br>SPACE: select<br>RETURN: start/stop</font>');
	desc.position(525, 400);
	desc.style('text-align', 'right');
	
}

function draw() {
	background(128, 128, 192);
	fill(255);
	
	// draw circles:
	var x = 50;
	var xsp = 40;
	var y = 50;
	var ysp = 40;
	var dia = 20;
	for(let i=0;i<16;i++)
	{
		// rows
		stroke(i==sptr?255:0);
		fill(c[i]);
		ellipse(x + i*xsp, y + ysp*0, dia, dia); // sequence steps
		stroke(i==sptr?255:0);
		fill(seqA[i]?c[i]:0);
		ellipse(x + i*xsp, y + ysp*1, dia, dia); // seq A
		fill(seqB[i]?c[i]:0);
		ellipse(x + i*xsp, y + ysp*2, dia, dia); // seq B
		fill(seqC[i]?c[i]:0);
		ellipse(x + i*xsp, y + ysp*3, dia, dia); // seq C
		fill(seqD[i]?c[i]:0);
		ellipse(x + i*xsp, y + ysp*4, dia, dia); // seq D
		fill(i==seqstart?c[i]:0);
		ellipse(x + i*xsp, y + ysp*5, dia, dia); // start
		fill(i==seqend?c[i]:0);
		ellipse(x + i*xsp, y + ysp*6, dia, dia); // end
	}
		stroke(255);
		noFill();
		text('seq step', x + xsp*16, y + ysp*0);
		text('A', x + xsp*16, y + ysp*1);
		text('B', x + xsp*16, y + ysp*2);
		text('C', x + xsp*16, y + ysp*3);
		text('D', x + xsp*16, y + ysp*4);
		text('start', x + xsp*16, y + ysp*5);
		text('end', x + xsp*16, y + ysp*6);
		rect(x-dia/2, y-dia/2 + ysp*view, 16*xsp-dia, dia); // page
		rect(x + (xsp*crsr) - dia/2, y - dia/2, xsp - dia, 7*ysp - dia); // cursor
	
}

function keyPressed()
{
	if (keyCode === LEFT_ARROW) {
		clickLeft();
	}
	if (keyCode === RIGHT_ARROW) {
		clickRight();
	}
	if (keyCode === UP_ARROW) {
		clickPageUp();
	}
	if (keyCode === DOWN_ARROW) {
		clickPage();
	}
	if (keyCode === 13) {
		clickGo();
	}
	if (keyCode === 32) {
		clickSelect();
	}

}

function clickPage()
{
    view = (view + 1) % (NUMVIEWS + 1);
    if (view == 5) crsr = seqstart;
    else if (view == 6) crsr = seqend;
    // else crsr = 0; // reset cursor
}

function clickPageUp()
{
    view = (view - 1);
		if(view<0) view = NUMVIEWS;
    if (view == 5) crsr = seqstart;
    else if (view == 6) crsr = seqend;
    // else crsr = 0; // reset cursor
}

function clickSelect()
{
    if (view == 0) sptr = dir > 0 ? seqstart : seqend; // reset clock
    else if (view == 1) seqA[crsr] = !seqA[crsr];
    else if (view == 2) seqB[crsr] = !seqB[crsr];
    else if (view == 3) seqC[crsr] = !seqC[crsr];
    else if (view == 4) seqD[crsr] = !seqD[crsr];
    else if (view == 5) seqstart = 0; // reset
    else if (view == 6) seqend = 15; // reset
}

function clickLeft()
{
    if (view == 0) sptr = floor(random(seqstart, seqend + 1));
		else {
    	crsr--;
    	if (crsr < 0) crsr = 15;			
		}
    if (view == 5) seqstart = crsr;
    if (view == 6) seqend = crsr;
}

function clickRight()
{
    if (view == 0) dir = dir * -1;
		else {
	    crsr++;
  	  if (crsr > 15) crsr = 0;
		}
    if (view == 5) seqstart = crsr;
    if (view == 6) seqend = crsr;
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
	if(seqA[sptr]) eA.play();
	if(seqB[sptr]) eB.play();
	if(seqC[sptr]) eC.play();
	if(seqD[sptr]) eD.play();

	sptr += dir;
	if (dir == 1 && sptr > seqend)
	{
		if (seqend >= seqstart) sptr = seqstart;
		else if (sptr < seqstart) sptr = seqstart;
	}
	if (dir == -1 && sptr < seqstart)
	{
		if (seqstart <= seqend) sptr = seqend;
		else if (sptr > seqend) sptr = seqend;
	}
	if (sptr > 15) sptr = 0; // wrap
	if (sptr < 0) sptr = 15; // wrap		

	part.setBPM(ts.value());
}

function initsound()
{
	rev = new p5.Reverb();
	
	eA = new p5.Envelope();
	eA.setADSR(0.001, 0.01, 0.05, 0.01);
	oA = new p5.Oscillator();
	oA.setType('square');
	oA.freq(50);
	oA.amp(1);
	oA.start();
	oA.amp(eA);

	eB = new p5.Envelope();
	eB.setADSR(0.001, 0.01, 0.05, 0.01);
	oB = new p5.Oscillator();
	oB.setType('square');
	oB.freq(150);
	oB.amp(1);
	oB.start();
	oB.amp(eB);

	eC = new p5.Envelope();
	eC.setADSR(0.001, 0.01, 0.05, 0.01);
	oC = new p5.Oscillator();
	oC.setType('square');
	oC.freq(450);
	oC.amp(1);
	oC.start();
	oC.amp(eC);

	eD = new p5.Envelope();
	eD.setADSR(0.001, 0.01, 0.05, 0.01);
	oD = new p5.Oscillator();
	oD.setType('square');
	oD.freq(1350);
	oD.amp(1);
	oD.start();
	oD.amp(eD);
	
	oA.disconnect();
	oB.disconnect();
	oC.disconnect();
	oD.disconnect();
	rev.drywet(0.5);
	rev.process(oA, 3, 2);
	rev.process(oB, 3, 2);
	rev.process(oC, 3, 2);
	rev.process(oD, 3, 2);	
	
	beat = new p5.Phrase('beat', doBeat, [1]);
	part = new p5.Part();
	part.addPhrase(beat);
	part.setBPM(60);
	part.loop();
	part.stop();
	
}
