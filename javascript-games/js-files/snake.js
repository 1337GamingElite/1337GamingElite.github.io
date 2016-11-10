// Grid Size
var COLS = 26, ROWS = 26;

// Game ID's
var EMPTY = 0, SNAKE = 1, FRUIT = 2;

// Direction
var LEFT  = 0, UP = 1, RIGHT = 2, DOWN = 3;

// Keys
var KEY_LEFT = 65, KEY_UP = 87, KEY_RIGHT = 68, KEY_DOWN = 83, PAUSE_KEY = 80;

// Game Variables
var canvas, ctx, keystate, frames, score;

//Pause Count
var pauseCount = 3;

//Nightmode
var nightMode = false;

var grid = {
	width: null,  // Number of Columns
	height: null, //Number of Rows
	_grid: null,

	init: function(d, c, r) {
		this.width = c;
		this.height = r;
		this._grid = [];
		for (var x=0; x < c; x++) {
			this._grid.push([]);
			for (var y=0; y < r; y++) {
				this._grid[x].push(d);
			}
		}
	},

	set: function(val, x, y) {
		this._grid[x][y] = val;
	},

	get: function(x, y) {
		return this._grid[x][y];
	}
}

var snake = {
	direction: null, // The direction of the snake
	last: null,		 // Last element in the queue (Snake is First in first out)
	_queue: null,

	init: function(d, x, y) {
		this.direction = d;
		this._queue = [];
		this.insert(x, y);
	},

	insert: function(x, y) {
		// unshift prepends an element to an array
		this._queue.unshift({x:x, y:y});
		this.last = this._queue[0];
	},

	remove: function() {
		// pop returns the last element of an array
		return this._queue.pop();
	}
};

// Sets food at a random empty space in the game
function setFood() {
	var empty = [];
	// Finds empty cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			if (grid.get(x, y) === EMPTY) {
				empty.push({x:x, y:y});
			}
		}
	}
	// Chooses a random cell
	var randpos = empty[Math.round(Math.random()*(empty.length - 1))];
	grid.set(FRUIT, randpos.x, randpos.y);
}

// Starts the game
function main(id) {
	// Makes Canvas
	canvas = document.getElementById("gameCanvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");
    var div = document.getElementById(id);
	// Adds canvas to body element
	div.appendChild(canvas);
	// sets an base font for bigger score display
	ctx.font = "20px Comic Sans MS";
	frames = 0;
	keystate = {};
	// Keyboard input
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});
	// Starts Game Loop + Initiates Objects
	init();
	loop();
}

// Resets or Sets game objects
function init() {
	score = 0;
    pauseCount = 3;
	grid.init(EMPTY, COLS, ROWS);
	var sp = {x:Math.floor(COLS/2), y:ROWS-5};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);
	setFood();
}

function gameOver() {
    var gameOverMessage = confirm("Congrats, You have gotten " + score + " points. Do you want to continue?");
    if (!gameOverMessage) {
        window.location = "../../index.html";
    }
    init();
}

// Loops throuch update and draw functions
function loop() {
	update();
	draw();
	// When ready to redraw the canvas call the loop function
	// Runs about 60 frames a second
	window.requestAnimationFrame(loop, canvas);
}

// Updates game logic
function update() {
	frames++;
	// Changes the snake's direction
	if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
		snake.direction = LEFT;
	}
	if (keystate[KEY_UP] && snake.direction !== DOWN) {
		snake.direction = UP;
	}
	if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
		snake.direction = RIGHT;
	}
	if (keystate[KEY_DOWN] && snake.direction !== UP) {
		snake.direction = DOWN;
	}
	// Every 10 frames would update game state
	if (frames % 5 === 0) {
		// Pop the last element from the snake queue
		var nx = snake.last.x;
		var ny = snake.last.y;
		// Updates the position of the snake
		switch (snake.direction) {
			case LEFT:
				nx--;
				break;
			case UP:
				ny--;
				break;
			case RIGHT:
				nx++;
				break;
			case DOWN:
				ny++;
				break;
		}
		// Checks all gameover conditions
		if (0 > nx || nx > grid.width-1  ||
			0 > ny || ny > grid.height-1 ||
			grid.get(nx, ny) === SNAKE
		) {
            //return init(); /*Use for live previewing*/
			return gameOver();
		}
		// Check whether the new position are on the fruit item
		if (grid.get(nx, ny) === FRUIT) {
			// Increment the score and sets a new fruit position
			score++;
			setFood();
		} else {
			// Take out the first item from the snake queue
			var tail = snake.remove();
			grid.set(EMPTY, tail.x, tail.y);
		}
		// Add a snake id at the new position and append it to the snake queue
		grid.set(SNAKE, nx, ny);
		snake.insert(nx, ny);
	}
}

// Renders the grid
function draw() {
	// Calculate tile-width and -height
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	// Draws all the cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			// Sets the cell colour
			switch (grid.get(x, y)) {
				case EMPTY:
                    if (nightMode) {
                        ctx.fillStyle = "#000";
                    } else if (!nightMode) {
					   ctx.fillStyle = "#fff";
                    }
					break;
				case SNAKE:
                    if (nightMode) {
                        ctx.fillStyle = "chartreuse";
                    } else if (!nightMode) {
					   ctx.fillStyle = "#00f";
                    }
					break;
				case FRUIT:
                    if (nightMode) {
                        ctx.fillStyle = "#fff"
                    } else if (!nightMode) {
					   ctx.fillStyle = "#f00";
                    }
					break;
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}
	// changes the fillstyle once more and draws the score
	// message to the canvas
    if (nightMode) {
        ctx.fillStyle = "darkorchid"
    } else if (!nightMode) {
	   ctx.fillStyle = "#000";
    }
	ctx.fillText("SCORE: " + score, 10, canvas.height - 10);
    ctx.fillText("PAUSES: " + pauseCount, canvas.width - 115, canvas.height - 10);
}

function pauseGame() {
    if (pauseCount > 0) {
        pauseCount--;
        window.alert("The game has been paused. You now have " + pauseCount + " pauses left.");
    }
}

function toggleNightMode() {
    nightMode = !nightMode
    if (nightMode) {
        document.getElementById("nightMode").style.color = "white";
        document.getElementById("nightMode").style.backgroundColor = "black";
        document.getElementById("nightMode").value = "NightMode - On"
        document.getElementById("gameCanvas").style.border = "5px solid darkorchid";
        document.getElementById("gameCanvas").style.boxShadow = "2px 2px 15px darkorchid";
    } else if (!nightMode) {
        document.getElementById("nightMode").style.color = "black";
        document.getElementById("nightMode").style.backgroundColor = "white";
        document.getElementById("nightMode").value = "NightMode - Off"
        document.getElementById("gameCanvas").style.border = "5px solid black";
        document.getElementById("gameCanvas").style.boxShadow = "2px 2px 15px black";
    }
}
