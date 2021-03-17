var context = new (window.AudioContext || window.webkitAudioContext)();
var isConnected = false;
var nextNotetime;
var timerID;
var beattable = [2,1/4,1/4,1/4,1/4,1/2,1/2,1/4,1/4,1/4,1/4,1,1,1,1/2,1/2,1/2,1/2]
var counter = 0;
var bpm = 120;

function playSound(time) {

  let osc = context.createOscillator();
	let envelope = context.createGain();
  osc.frequency.value = Math.round(Math.random() * 500 + 300);

  envelope.gain.cancelScheduledValues(time);
  envelope.gain.setValueAtTime(0.2, time);
	envelope.gain.linearRampToValueAtTime(0, time + 0.08)
	osc.connect(envelope).connect(context.destination);
	document.getElementById("noteVal").innerHTML = osc.frequency.value;
  osc.start(time);
  osc.stop(time + 0.12);

};

function scheduler() {
	document.getElementById("time").innerHTML = Math.round(context.currentTime * 10) / 10;
	while (nextNotetime < context.currentTime) {

		nextNotetime += (60 / bpm) * beattable[counter];

		console.log("Scheduling a note to be played at " + nextNotetime);
		playSound(nextNotetime);
		counter++;
		if (counter === beattable.length) counter = 1;
	}

		timerID = window.setTimeout(scheduler, 10);


}

function start() {
	document.getElementById("bpm").innerHTML = bpm;
	nextNotetime = Math.round(context.currentTime);
	scheduler();
}
