function Html() {
	this.scoreContainer = document.querySelector('#score');
	this.loadingContainer = document.querySelector('.main-menu');
};

// show score
Html.prototype.displayScore = function(score) {
	this.scoreContainer.textContent = score;
};

// clear tile with a ' '
Html.prototype.clearTile = function(position) {
	var tile = document.querySelector('.row:nth-child(' + position.y + ') .tile:nth-child(' + position.x + ') span');
	tile.textContent = '';
};

// display board values
Html.prototype.displayBoard = function(board) {
	var rows = document.querySelectorAll('.row');	// get all the rows
	var column;										// column per row

	for(var y = 1; y < rows.length - 1; y++) {
		// tiles per row
		columns = rows[y].querySelectorAll('.tile');

		for(var x = 1; x < columns.length - 1; x++) {
			// for each column (tile), it will equal the corresponding board value
			columns[x].querySelector('.tile-inner span').textContent = board.board[y][x];
		}
	}
};

// remove a specific class from an element
Html.prototype.removeClass = function(element, myClass) {
	document.querySelector(element).classList.remove(myClass);
};

// add a specific class to an element
Html.prototype.addClass = function(element, myClass) {
	document.querySelector(element).classList.add(myClass);
};

Html.prototype.displayLoad = function(show) {
	var rows = this.loadingContainer.children;
	for(var i = 0; i < rows.length; i++) {
		if(show)
			rows[i].classList.add('load');
		else
			rows[i].classList.remove('load');
	}

};