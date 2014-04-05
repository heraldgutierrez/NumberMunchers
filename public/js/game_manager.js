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
		this.score += this.board.addScore();
		this.html.displayScore(this.score);
		this.levelComplete();
	} else if(valid != null){
		this.muncherDied();
	}
};

// given a direction, move the muncher
GameManager.prototype.moveMuncher = function(direction) {
	this.move(this.muncher, direction);
};

// given a character (muncher or troggle), move in a direction
// if direction is a space: clear tile, and validate tile
// else: remove old position css, move character in the direction, and then add new position css
GameManager.prototype.move = function(character, direction) {
	var position = character.getPosition();

	if(direction == _DIRECTION.SPACE) {
		this.html.clearTile(position);
		this.validateTile(position);
	} else {
		var myClass = 'position-' + position.x + '-' + position.y;
		var id = character.getElementID();
		this.html.removeClass(id, myClass);
		character.move(direction);
		this.displayCharacter(character);
	}
};

// given a character, display then on the board using their position
GameManager.prototype.displayCharacter = function(character) {
	var position = character.getPosition();
	var myClass = 'position-' + position.x + '-' + position.y;
	this.html.addClass(character.getElementID(), myClass);
}

// when a user validates an incorrect answer, they lose a life
// if they run out of lives, its game over
GameManager.prototype.muncherDied = function() {
	this.muncher.died();
	if(this.muncher.getLivesLeft() < 1)
		alert('Game Over');
}

// generate and display the game board
// also display the muncher
GameManager.prototype.generateBoard = function() {
	this.board.generateBoard();
	this.html.displayBoard(this.board);
	this.displayCharacter(this.muncher);
}

// if the current level is complete, generate a board for the next level
GameManager.prototype.levelComplete = function() {
	if(this.board.levelComplete())
		this.generateBoard();
}