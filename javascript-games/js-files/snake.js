//8:13
// Size of the Game Area
var COLS = 26, ROWS = 26;

//Object IDs
var EMPTY = 0, SNAKE = 1, FRUIT = 1;

// The grid that would be the game area
var grid = {

    width: null,
    height: null,
    _grid: null,

    init: function(d, c, r) {
        this.width = c;
        this.height = r;

        this._grid = [];

        // Creates the grid
        for (var x = 0; x < c; x++) {
            this._grid.push([]);
            for (var y = 0; y < r; y++){
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

};

// The Snake
var snake = {

    direction: null,
    _queue: null,

    init: function(d, x, y) {

    },

    insert: function(x, y) {

    },

    remove: function() {

    }

}

// Makes food on the grid
function generateFood() {

}

// GAME FUNCTIONS
function main() {
    // The game's main function, it starts here
    window.alert("Testing 1...2...3... SKT WIN WORLDS!!!")
}

function init() {
    // Runs when the game starts
}

function loop() {
    // Loops the update & draw functions
}

function update() {
    // Updates game logic (score, positions, etc.)
}

function draw() {
    // Displays the game/graphics on the screen
}

main();
