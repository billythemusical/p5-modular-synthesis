class Bubble {
  constructor(x, y, r, obj) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col;;
    this.obj = obj;
    this.amp = new p5.Amplitude();
    this.alpha;
  }
  
  display(col) {
    this.col = col;
    noStroke();
    fill(this.col, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
  
  listen() {
    this.amp.setInput(this.obj);
    this.alpha = map(this.amp.getLevel(), 0, 0.3, 0, 255);
  }
}