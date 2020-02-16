<!-- FIREPONG GAME SCRIPT -->

// Define keycode constants
var KEY_UP = 38;
var KEY_DOWN = 40;

// Initialize game state
var playing = false;
var pressed_up = false;
var pressed_down = false

function play() {
	playing = true;
}

function keydown(event) {
// Detect when the key has been pressed
	if(playing) {
		document.body.innerHTML = event.keyCode.toString();
	} else {
		play();
	}
}

function keyup(event) {
// Detect when the key has been released
	if(playing) {
		document.body.innerHTML = event.keyCode.toString();
	}
}