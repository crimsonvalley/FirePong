<!-- FIREPONG GAME SCRIPT -->

// Define keycode constants
var KEY_UP = 38;
var KEY_DOWN = 40;

// Define game constants
var HEIGHT_PADDLE = 150;
var WIDTH_PADDLE = 24;
var HEIGHT_BALL = 24;
var HEIGHT_BALL_HALF = HEIGHT_BALL >> 1;
var WIDTH_BALL = 24;
var WIDTH_BALL_HALF = WIDTH_BALL >> 1;
var PADDLE_VELOCITY = 0.5;
var BALL_VELOCITY = 6;
var BALL_VELOCITIES = [];
var HEIGHT_SCREEN = window.innerHeight;
var WIDTH_SCREEN = window.innerWidth;

var ball_angle;
var ball_dx;
var ball_dy;
for(var i = 0; i < 360; i++) {
	ball_angle = (i * Math.PI / 180);
	ball_dx = BALL_VELOCITY * Math.cos(ball_angle);
	ball_dy = BALL_VELOCITY * Math.sin(ball_angle);
	BALL_VELOCITIES.push([ball_dx, ball_dy]);
}

// Initialize DOM objects
var paddle_player = document.getElementById("paddleplayer");
var paddle_cpu = document.getElementById("paddlecpu");
var ball = document.getElementById("ball");
var play_text = document.getElementById("playtext")

// Initialize game state
var playing = false;
var pressed_up = false;
var pressed_down = false
var paddle_mid_1 = (HEIGHT_SCREEN >> 1);
var paddle_mid_2 = paddle_mid_1;
var paddle_top_1 = paddle_mid_1 - (HEIGHT_PADDLE >> 1);
var paddle_top_2 = paddle_top_1;
var paddle_bot_1;
var paddle_bot_2;
var ball_mid = paddle_mid_1;
var ball_right;
var ball_center = WIDTH_SCREEN >> 1;
ball_angle = ((new Date()) - 0) % 360;

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
	// Update player paddle position based on keypress
		if(pressed_up && !pressed_down) {
			paddle_top_1 -= PADDLE_VELOCITY * ticks;
		} else if(!pressed_up && pressed_down) {
			paddle_top_1 += PADDLE_VELOCITY * ticks;
		}
		paddle_bot_1 = paddle_top_1 + HEIGHT_PADDLE;
	// Make sure paddle stays within bounds
		if(paddle_top_1 < 0) {
			paddle_top_1 = 0;
		} else if(paddle_bot_1 > HEIGHT_SCREEN) {
			paddle_top_1 = HEIGHT_SCREEN - HEIGHT_PADDLE;
		}
		paddle_mid_1 = paddle_top_1 + (HEIGHT_PADDLE >> 1);
		paddle_bot_1 = paddle_mid_1 + HEIGHT_PADDLE;
	// Update CPU paddle based on ball position
		paddle_top_2 = ball_mid - (HEIGHT_PADDLE >> 1);
		paddle_mid_2 = paddle_top_2 + (HEIGHT_PADDLE >> 1);
		paddle_bot_2 = paddle_mid_2 + HEIGHT_PADDLE;
	// Update ball velocity based on angle
		ball_dx = BALL_VELOCITIES[ball_angle][0];
		ball_dy = BALL_VELOCITIES[ball_angle][1];
		ball_mid += ball_dy;
		ball_center += ball_dx;
	// Handle collisions with boundary & bounce ball
		if(ball_mid - (HEIGHT_BALL_HALF) < 0) {
			ball_mid = (HEIGHT_BALL_HALF);
			ball_angle -= 270;
			ball_angle = 90 - ball_angle;
		} else if(ball_mid + (HEIGHT_BALL_HALF) > HEIGHT_SCREEN) {
			ball_mid = HEIGHT_SCREEN - (HEIGHT_BALL_HALF);
			ball_angle -= 90;
			ball_angle = 270 - ball_angle;
		}
		if(ball_center - (WIDTH_BALL_HALF) < WIDTH_PADDLE) {
			if(ball_mid + HEIGHT_BALL_HALF > paddle_top_1) {
				if(ball_mid - HEIGHT_BALL_HALF < paddle_bot_1) {
					ball_angle = 0;
				}
			}
		} else if(ball_center + (WIDTH_BALL_HALF) > WIDTH_SCREEN - WIDTH_PADDLE) {
			if(ball_mid + HEIGHT_BALL_HALF > paddle_top_2) {
				if(ball_mid - HEIGHT_BALL_HALF < paddle_bot_2) {
					ball_angle = 180;
				}
			}
		}
		ball.setAttribute("STYLE", "top:" + (ball_mid | 0).toString() + "px;left:" + (ball_center | 0).toString() + "px;");
	}
	paddle_player.setAttribute("STYLE", "top:" + (paddle_top_1 | 0).toString() + "px;");
	paddle_cpu.setAttribute("STYLE", "top:" + (paddle_top_2 | 0).toString() + "px;");
	last_time = curr_time;
}

var game_interval = setInterval(gameloop, 1);