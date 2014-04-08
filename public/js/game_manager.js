function GameManager() {
	this.html = new Html();

	// game board
	this.board = new GameBoard();

	// keyboard input
	this.inputManager = new KeyboardInputManager();
	this.inputManager.on('action', this.keyboardAction.bind(this));

	// game characters
	this.muncher = new Character(true, '#muncher');

	// loading screen is not being displayed
	this.isLoading = false;			
	
	// start a new game
	this.restart();
};

// Start a new game with resetted settings
GameManager.prototype.restart = function() {
	this.html.displayElement('.main-screen', true);			// show menu navigation
	this.navigation = _NAVIGATION.MENU;						// set navigation type to menu
	this.currentMenuSelect = 0;								// current menu selection is 0 (Multiples)
	this.html.changeMenuSelection(this.currentMenuSelect);	// highlight current selection
	this.muncher.resetLives();								// reset munchers lives
};


// reset the game board
GameManager.prototype.startGame = function(gametype) {
	this.score = 0;											// reset score
	this.board.setGameType(gametype);						// set game type
	this.generateBoard();									// generate a new board with the new game type
};

// perform an action based on the input given
GameManager.prototype.keyboardAction = function(input) {
	// if on the menu navigation
	// can only move 'Up', 'Down', or make a selection
	if(this.navigation == _NAVIGATION.MENU) {
		switch(input.action) {
			case _DIRECTION.UP:
				if(this.currentMenuSelect > 0)
					this.currentMenuSelect--;
				break;
			case _DIRECTION.DOWN:
				if(this.currentMenuSelect < 3)
					this.currentMenuSelect++;
				break;
			case _DIRECTION.SELECT:
				this.startGame(this.currentMenuSelect);		// create a new game with the highlighted game mode
				this.navigation = _NAVIGATION.GAME;			// set navigation controls to control the game

				var self = this;
				var timeout = window.setTimeout(function() {
					self.html.displayElement('.main-screen', false); 	// hide menu screen
					window.clearTimeout(timeout);			// clear timeout
				}, 1000);

				break;
		}

		// change highlighted menu navigation selection
		this.html.changeMenuSelection(this.currentMenuSelect);

	} else if(this.navigation == _NAVIGATION.GAME) {
	// input now controls the game/muncher
		this.moveMuncher(input.action);
	}
};


/*****************************************************
	Character Related Actions
******************************************************/
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

	if(direction == _DIRECTION.SELECT) {
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
	if(this.muncher.getLivesLeft() < 1)	{		// if no more lives, end game
		alert('Game Over');
		this.displayLoadingScreen(true);

		var self = this;
		// after load screen is done, reset load screen to original position so it can be used again
		var timeout = window.setTimeout(function() {
			self.restart();						// show menu
			window.clearTimeout(timeout);		// clear timeout	
		}, 1000);
	}
};


/*****************************************************
	Gameboard Related Actions
******************************************************/
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

// if the current level is complete, generate a board for the next level
GameManager.prototype.levelComplete = function() {
	if(this.board.levelComplete())
		this.generateBoard();
};

// display load screen in between levels
GameManager.prototype.displayLoadingScreen = function(show) {
	this.html.displayLoading(show);

	if(show) {
		var self = this;

		// after load screen is done, reset load screen to original position so it can be used again
		var timeout = window.setTimeout(function() {
			self.isLoading = false;					// done loading
			self.displayLoadingScreen(false);		// reset loading position
			window.clearTimeout(timeout);			// clear timeout
		}, 3000);
	}
};

// get the class used for moving a character
function getPositionClass(position) {
	return 'position-' + position.x + '-' + position.y;
}

