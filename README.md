# p5-modular-synthesis
A set of code examples in p5 for a modular synthesis workshop.

<h2>Introduction</h2>

The p5.js library is a great entry point to javascript coding as it simplifies many of the complex functions and esoteric syntax, giving easier access to the tools available for creation in modern web browsers like those for graphics and sound.

Modular synthesis is a form of sound design and experimentation that has been around since the early 1960’s and has since seen a resurgence in popularity with the introduction of the Eurorack system and boutique sales made ubiquitous by the internet.  

<h2>Requirements</h2>

A basic understanding of javascript programming in p5.js and a laptop with a modern browser, Chrome of Firefox preferred.  

<h2>Building Blocks</h2>

Many of the basic functions of a modular synthesis are built in to the p5.sound.js library already.  These include, but are not limited to:

<ul>
  <li>Oscillators</li>
  <li>Filters</li>
  <li>Envelopes</li>
  <li>Sequencers</li>
</ul>

Let’s take a look at what these modules do briefly.

<b>Oscillators</b> are special modules that reproduce sound by electrically vibrating at frequencies in the audible range.  When amplified through a speaker, they produce sound.  <a href="https://editor.p5js.org/billythemusical/sketches/KtG4EUYGU>Here</a> is a basic example of an oscillator producing sound at 400 vibrations per second or 400 Hz.  Oscillators can also be used to modulate values of other functions and even other oscillators.  When oscillators are below the audible range, we refer to them as LFO’s or low frequency oscillators.  We will talk more about this later.  

<b>Filters</b> will be used here to change the spectral content of a sound like an equalizer found on a home stereo system or in the system settings in Spotify or iTunes.  For example, a low pass filter or LPF attenuates the higher frequencies of a sound, allowing the low frequencies to pass through unaltered, thus the name.  A high pass filter or HPF does the opposite.  <a href="https://editor.p5js.org/billythemusical/sketches/OtAFcMUq9">Here</a> is an example of a LPF on white noise.  

<b>Envelopes</b> are useful in recreating more life-like sounds as organic instruments have a characteristic pattern of changes in volume while being played.  For instance, when a piano key is struck and held down, the sound almost immediately appears and disappears slowly over the course of a few seconds.  We can mimic this volume change over time by passing an envelope object into the amplitude of our sound source, whether that’s noise or an oscillator.  <a href="https://editor.p5js.org/billythemusical/sketches/ttn3ofn_N">Here</a> is an example that uses the space bar to trigger an envelope.

A <b>sequencer</b> is simply a device for storing values over time.  We feed these values into different objects over time in order to orchestrate our patches.  We will most often be using arrays to store the values and the draw() function and frameCount to move through our the array.  <a href="https://editor.p5js.org/billythemusical/sketches/1Cgm0sKHT">Here</a> is an example.

<h2>Making a Patch</h2>

Now that we have some of the basic elements laid out, we can begin to patch these together to make some interesting sounds and also see why programming can be a unique way to control sound that would otherwise be inaccessible in the physical world of modular synthesis.  Let’s begin here.

