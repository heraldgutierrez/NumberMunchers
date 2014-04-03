function GameBoard() {
	this.rows = _GRID_ROWS; 				// number of rows
	this.columns = _GRID_COLS;				// number of columns

	this.level = 1;							// current game level
	this.solutions = 0;						// number of solutions left to clear the objective

	// board which will contain the values for the objective
	this.board = new Array(_GRID_ROWS);		
	for (var i = 0; i < _GRID_ROWS; i++) {
		this.board[i] = new Array(_GRID_COLS);
	}	

	// game mode: Multiplication, Factors, Prime Numbers, Equation
	this.gameMode = whichGameType(_GAMETYPES['prime']);
	// this.whichGameType(_GAMETYPES['mult']);

	// generate the board with values
	this.generateBoard();
}

// generate the board with values for the objective
// and display the board after
GameBoard.prototype.generateBoard = function() {
	this.board = this.gameMode.generateBoard(this.board, this.level);
	this.displayGameBoard();
}

// display the game board
// iterate through the board to display each value except the outer (empty) tiles
GameBoard.prototype.displayGameBoard = function() {
	this.gameMode.displayHeading(this.level);

	var self = this;
	$('.row').each(function(rowIndex, row) {
		$(row).children('.tile').each(function(colIndex, col) {
			// skip outer/empty tiles
			if(rowIndex > 0 && colIndex > 0 && rowIndex < 6 && colIndex < 7) {
				$(col).children('.tile-inner').children('span').html(self.board[rowIndex][colIndex]);
			}
		});
	});
}

// validate tile if it passes the current objective
GameBoard.prototype.validateTile = function(x, y) {
	var value = this.board[x-1][y-1];					// value to be checked
	var isSolution = this.gameMode.isSolution(value);	// check if value is a solution

	if(isSolution) {
		// if a solution, reduce solution count
		this.gameMode.reduceSolutionsLeft();
	} else if(value != -1 && !isSolution) {
		// else, lose a life
		alert('Died');

/**********************
/**********************
// need to check if there are any lives left to keep playing
/**********************
**********************/
	}

	// mark off tile with -1 so we know its been checked already
	this.board[x-1][y-1] = -1;

	// erase tile with a ' '
	$('.row:nth-child(' + x + ') .tile:nth-child(' + y + ') span').html('&nbsp;');

	// check if the level has been completed
	this.levelComplete();
}


// if the level has been completed, increase level and generate a new board
GameBoard.prototype.levelComplete = function() {
	if(this.gameMode.solutionsLeft() == 0) {
		this.level++;
		this.generateBoard();
	}
}

// which game type are we playing?
function whichGameType(type) {
	var mode = null;
	switch(type) {
		case 0:
			mode = new Multiple();
			break;
		case 1:
			mode = new Factor();
			break;
		case 2:
			mode = new Prime();
			break;
		case 3:
			mode = new Multiple();
			break;
	}

	return mode;
}