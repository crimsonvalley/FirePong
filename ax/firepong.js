<!-- FIREPONG GAME SCRIPT -->

// Define keycode constants
var KEY_UP = 38;
var KEY_DOWN = 40;

// Define game constants
var HEIGHT_PADDLE = 150;
var WIDTH_PADDLE = 25;
var PADDLE_VELOCITY = 0.5;
var HEIGHT_SCREEN = window.innerHeight;
var WIDTH_SCREEN = window.innerWidth;

// Initialize DOM objects
var paddle_player = document.getElementById("paddleplayer");
var paddle_cpu = document.getElementById("paddlecpu");
var play_text = document.getElementById("playtext")

// Initialize game state
var playing = false;
var pressed_up = false;
var pressed_down = false
var paddle_mid_1 = (HEIGHT_SCREEN >> 1);
var paddle_mid_2 = (HEIGHT_SCREEN >> 1);
var paddle_top_1 = paddle_mid_1 - (HEIGHT_PADDLE >> 1);
var paddle_top_2 = paddle_mid_2 - (HEIGHT_PADDLE >> 1);
var paddle_bot_1 = paddle_mid_1 + (HEIGHT_PADDLE >> 1);
var paddle_bot_2 = paddle_mid_2 + (HEIGHT_PADDLE >> 1);

function play() {
	playing = true;
	play_text.innerHTML = "";
}

function keydown(event) {
// Detect when the key has been pressed
	if(playing) {
		var code = event.keyCode;
		switch(code) {
			case KEY_UP:
				pressed_up = true;
				break;
			case KEY_DOWN:
				pressed_down = true;
				break;
		}
	} else {
		play();
	}
}

function keyup(event) {
// Detect when the key has been released
	if(playing) {
		var code = event.keyCode;
		switch(code) {
			case KEY_UP:
				pressed_up = false;
				break;
			case KEY_DOWN:
				pressed_down = false;
				break;
		}
	}
}

var last_time = -1;
var curr_time;
var ticks;
function gameloop() {
// Function for animating and updating game state
	curr_time = (new Date()) - 0;
	if(last_time == -1) last_time = curr_time;
	ticks = curr_time - last_time;
	if(playing) {
		if(pressed_up && !pressed_down) {
			paddle_mid_1 -= PADDLE_VELOCITY * ticks;
		} else if(!pressed_up && pressed_down) {
			paddle_mid_1 += PADDLE_VELOCITY * ticks;
		}
		paddle_top_1 = paddle_mid_1 - (HEIGHT_PADDLE >> 1);
		paddle_bot_1 = paddle_mid_1 + (HEIGHT_PADDLE >> 1);
		if(paddle_top_1 < 0) {
			paddle_mid_1 = (HEIGHT_PADDLE >> 1);
		} else if(paddle_bot_1 > HEIGHT_SCREEN) {
			paddle_mid_1 = HEIGHT_SCREEN - (HEIGHT_PADDLE >> 1);
		}
		paddle_top_1 = paddle_mid_1 - (HEIGHT_PADDLE >> 1);
		paddle_bot_1 = paddle_mid_1 + (HEIGHT_PADDLE >> 1);
	}
	paddle_player.setAttribute("STYLE", "top:" + (paddle_top_1 | 0).toString() + ";");
	paddle_cpu.setAttribute("STYLE", "top:" + (paddle_top_2 | 0).toString() + ";");
	last_time = curr_time;
}

var game_interval = setInterval(gameloop, 1);