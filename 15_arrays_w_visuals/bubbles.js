class Bubble {
  constructor(x, y, r, obj) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector();
    
    // Arbitrary damping to slow down ship
    this.damping = 0.8;
    this.maxSpeed = 10;

    // Variable for heading!
    this.heading = 0;

    // Size of particles
    this.r = r;
    
    // the sound object
    this.obj = obj;

    this.col = 0;
    this.amp = new p5.Amplitude();
    this.amp.setInput(obj);
    this.alpha = 0;
  }
  
    // Newton's law: F = M * A
  applyForce(force) {
    let f = force.copy();
    //f.div(mass); // ignoring mass right now
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkEdges() {
    if(this.position.x > (width - this.r/2)) this.velocity.x *= -1;
    if(this.position.x < this.r/2) this.velocity.x *= -1;
    if(this.position.y > (height - this.r/2)) this.velocity.y *= -1;
    if(this.position.y < this.r/2) this.velocity.y *= -1;
  }
  
  // Apply a thrust force
  boost(b) {
    // // Offset the angle since we drew the ship vertically
    let angle = this.velocity.heading();
    // // Polar to cartesian for force vector!
    let force = p5.Vector.fromAngle(angle);
    // let force = createVector(this.velocity);
    force.mult(b);
    // force.mult(b);
    this.applyForce(force);
  }
  
    
  display() {
    // noStroke();
    this.alpha = map(this.amp.getLevel(), 0, 0.1, 0, 255);
    fill(random(200, 210), random(200, 210), 50, this.alpha);
    this.r = map(this.amp.getLevel(), 0, 0.1, 10, 100);
    ellipse(this.position.x, this.position.y, this.r);
  }
  
  listen() {
    // map the panning to the position
    this.obj.pan(map(this.position.x, 0, width, -1, 1));
    // map the amplitude of the oscillator to the acceleration of the ellipse
    let boostVal = map(this.amp.getLevel(), 0, 0.1, 0.1, 0.3);
    // pass that boost value as a force to be applied
    this.boost(boostVal);
  }
}