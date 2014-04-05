function GameManager() {
	this.html = new Html();

	// game board
	this.board = new GameBoard();

	// keyboard input
	this.inputManager = new KeyboardInputManager();
	this.inputManager.on('moveMuncher', this.moveMuncher.bind(this));
	this.inputManager.on('move', this.move.bind(this));

	// game characters
	this.muncher = new Character(true, '#muncher');

	this.isLoading = false;


/***************************************************
// should prompt user for game selection
***************************************************/
	this.restart(0);
};

// reset the game board
GameManager.prototype.restart = function(gametype) {
	this.score = 0;
	this.board.setGameType(gametype);
	this.generateBoard();
};

// given a position on the board, check if it is a valid solution
// if(valid): add score, and check if level is complete
// else if(not null): not a solution
// else: checking -1 which is an empty tile
GameManager.prototype.validateTile = function(position) {
	var valid = this.board.validateTile(position.y, position.x);
	if(valid) {
		this.score += this.board.addScore();		// increment score
		this.html.displayScore(this.score);			// display updated score
		this.levelComplete();						// check if level is complete
	} else if(valid != null){
		this.muncherDied();							// muncher lost a life
	}
};

// given a direction, move the muncher
GameManager.prototype.moveMuncher = function(direction) {
	if(!this.isLoading)
		this.move(this.muncher, direction);
};

// given a character (muncher or troggle), move in a direction
// if direction is a space: clear tile, and validate tile
// else: remove old position css, move character in the direction, and then add new position css
GameManager.prototype.move = function(character, direction) {
	var position = character.getPosition();

	if(direction == _DIRECTION.SPACE) {
		this.html.clearTile(position);			// clear tile value
		this.validateTile(position);			// validate tile value
	} else {
		this.removeCharacter(character);		// remove old position class
		character.move(direction);				// move character to new position
		this.displayCharacter(character);		// display character at new position
	}
};

// given a character, remove its position class so it can move when a new position class is added
GameManager.prototype.removeCharacter = function(character) {
	var position = character.getPosition();
	var myClass = getPositionClass(position);
	this.html.removeClass(character.getElementID(), myClass);
};

// given a character, display then on the board using their position
GameManager.prototype.displayCharacter = function(character) {
	var position = character.getPosition();
	var myClass = getPositionClass(position);
	this.html.addClass(character.getElementID(), myClass);
};

// when a user validates an incorrect answer, they lose a life
// if they run out of lives, its game over
GameManager.prototype.muncherDied = function() {
	this.muncher.died();						// reduce life by 1
	if(this.muncher.getLivesLeft() < 1)			// if no more lives, end game
		alert('Game Over');
};

// generate and display the game board
// also display the muncher
GameManager.prototype.generateBoard = function() {
	// display load screen used in between levels
	this.isLoading = true;
	this.displayLoadingScreen(true);

	var self = this;

	// need a timeout, generate board when load screen is half way done
	var timeout = window.setTimeout(function() {
		self.board.generateBoard();				// generate new board
		self.html.displayBoard(self.board);		// display new board
		self.removeCharacter(self.muncher);		// remove position class
		self.muncher.randomPosition();			// new random position for muncher
		self.displayCharacter(self.muncher);	// display muncher
		window.clearTimeout(timeout);			// clear timeout
	}, 1000);

	// after load screen is done, reset load screen to original position so it can be used again
	var clearLoad = window.setTimeout(function() {
		self.isLoading = false;					// done loading
		self.displayLoadingScreen(false);		// reset loading position
		window.clearTimeout(clearLoad);			// clear loading
	}, 3000);
};

// if the current level is complete, generate a board for the next level
GameManager.prototype.levelComplete = function() {
	if(this.board.levelComplete())
		this.generateBoard();
};

// display load screen in between levels
GameManager.prototype.displayLoadingScreen = function(show) {
	this.html.displayLoad(show);
};

// get the class used for moving a character
function getPositionClass(position) {
	return 'position-' + position.x + '-' + position.y;
}

