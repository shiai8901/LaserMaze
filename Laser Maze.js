var readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/********* Start the client *********/
console.log("Welcome! Please enter board layout string.");

var waitForInput = function() {
	rl.question('> ', function(answer) {
		var board = new Board();
		board.buildBoard(input);
		while (!board.isFinished()) {
			board.travel();
		}
		console.log(board.getCount());
		waitForInput();
	});
}

waitForInput();


/**
 * a Board "class" for instantiation, in order to start the game, you need to create a board instance with this class
 */
var Board = function() {
    this.cols;
    this.rows;
    this.razer; 
    this.layout;
    this.walls;
    this.current; // a pointer storing current row, col, and direction
    this.count = 0;
}

Board.prototype.buildBoard = function(boardString) {
	if (boardString.length === 0) return -1;
    var board = boardString.split("\n");
    this.rows = board.length - 1;
    this.cols = board[0].length - 1;
    this.layout = board.map(function(row) {
    	return row.split("");
    });
    this.findLaser();
}
/**
 * function to find the starting point
 */
Board.prototype.findLaser = function() {
	for (var row = 0; row <= this.rows; row++) {
		for (var col = 0; col <= this.cols; col++) {
			if (this.layout[row][col] === '@') {
				this.current = {
					row: row, 
					col: col,
					direction: "east"
				};
			}
		}
	}
}

/**
 * function to calculate the next move
 */
Board.prototype.travel = function() {
	if (this.layout[this.current.row][this.current.col] instanceof Mirror) {
		
		this.layout[this.current.row][this.current.col].saveVisit(this.current.direction);
		this.current.direction = this.layout[this.current.row][this.current.col].reflect(this.current.direction);
	
	} else if (this.isMirror(this.current.row, this.current.col)) {
		
		var mirror = new Mirror(this.layout[this.current.row][this.current.col]);
		this.layout[this.current.row][this.current.col] = mirror;
		mirror.saveVisit(this.current.direction);
		this.current.direction = mirror.reflect(this.current.direction);
	
	} else if (this.layout[this.current.row][this.current.col] instanceof Prisms) {
		
		this.layout[this.current.row][this.current.col].saveVisit(this.current.direction);
		this.current.direction = this.layout[this.current.row][this.current.col].alter(this.current.direction);
	
	} else if (this.isPrism(this.current.row, this.current.col)) {
		
		var prism = new Prisms(this.layout[this.current.row][this.current.col]);
		this.layout[this.current.row][this.current.col] = prism;
		prism.saveVisit(this.current.direction);
		this.current.direction = prism.alter(this.current.direction);
	}

	switch(this.current.direction) {
		case "west":
			this.current.col = this.current.col - 1;
			break;
		case "north":
			this.current.row = this.current.row - 1;
			break;
		case "south":
			this.current.row = this.current.row + 1;
			break;
		default:
			this.current.col = this.current.col + 1;
			break;
	}
	this.count++;
}	

/**
 * function to get the number of moves
 * @return {number} number of moves
 */
Board.prototype.getCount = function() {
	return this.count;
}

/**
 * function to check if the game is finished, either hit the wall or hit a loop
 *@return {boolean} 
 */
Board.prototype.isFinished = function() {
	if (this.isWall(this.current.row, this.current.col)) return true;
	if (this.isLoop(this.current.row, this.current.col, this.current.direction)) {
		this.count = -1;
		return true;
	}
	return false;
}

/**
 * function to check if the game hit a loop
 *@return {boolean} 
 */
Board.prototype.isLoop = function(row, col, direction) {
	var move = this.layout[row][col];
	if (move instanceof Mirror || move instanceof Prisms) {
		var visits = move.getPrevVisits();
		if (visits.includes(direction)) {
			return true;
		}
	}
	return false;
}

/**
 * function to check if the game hit a wall
 *@return {boolean} 
 */
Board.prototype.isWall = function(row, col) {
	if (row < 0 || row > this.rows || col < 0 || col > this.cols) return true;
	return false
}

/**
 * function to check if the current symbol is a mirror
 *@return {boolean} 
 */
Board.prototype.isMirror = function(row, col) {
	var string = this.layout[row][col];
	if (string === "/" || string === "\\" || string === "O") {
		return true;
	}
	return false;
}

/**
 * function to check if the current symbol is a prism
 *@return {boolean} 
 */
Board.prototype.isPrism = function(row, col) {
	var string = this.layout[row][col];
	if (string === "<" || string === "^" || string === ">" || string === "v") {
		return true;
	}
	return false
}

/** 
 * a Mirror "class" for instantiation
 */
var Mirror = function(direction) {
	this.direction = direction;
	this.reflections = {
		"/": {
				"east": "north",
				"west": "south",
				"north": "east",
				"south": "west"
			},
		"\\": {
				"east": "south",
				"west": "north",
				"north": "west",
				"south": "east"
			},
		"O": {
			"east": "west",
			"west": "east",
			"north": "south",
			"south": "north"
		}
	}
	this.prevVisits = [];
}

/**
 * function to set reflections for mirror
 *@params {string} mirrorString
 *@params {object} reflections
 */
Mirror.prototype.setReflections = function(mirrorString, reflections) {
	this.reflections[mirrorString] = reflections;
}

/**
 * function to get the direction after reflection
 *@return {string} direction
 */
Mirror.prototype.reflect = function(lightStringDirection) {
	return this.reflections[this.direction][lightStringDirection];
}

/**
 * function to get the directions of all visited moves
 *@return {array} 
 */
Mirror.prototype.getPrevVisits = function() {
	return this.prevVisits;
}

/**
 * function to save the directions of all visited moves
 *@params {string} lightStringDirection
 */
Mirror.prototype.saveVisit = function(lightStringDirection) {
	this.prevVisits.push(lightStringDirection);
}

/** 
 * a Prisms "class" for instantiation
 */
var Prisms = function(direction) {
	this.direction = direction;
	this.prevVisits = [];
	this.actions = {
		"^": "north",
		"v": "south",
		"<": "west",
		">": "east" 
	}
}

/**
 * function to get the direction after reflection
 *@return {string} direction
 */
Prisms.prototype.alter = function(lightStringDirection) {
	return this.actions[this.direction];
}

/**
 * function to save the directions of all visited moves
 *@params {string} lightStringDirection
 */
Prisms.prototype.saveVisit = function(lightStringDirection) {
	this.prevVisits.push(lightStringDirection);
}

/**
 * function to get the directions of all visited moves
 *@return {array} 
 */
Prisms.prototype.getPrevVisits = function() {
	return this.prevVisits;
}
