var gametypes = {
	'mult': 	0,
	'factors': 	1,
	'prime': 	2,
	'equal': 	3
}

function GameBoard(rows, columns) {
	this.grid = new Array(rows);
	this.gametype = gametypes['mult'];

	for (var i = 0; i < rows; i++) {
		this.grid[i] = new Array(columns);
		for(var j = 0; j < columns; j++) {
			this.grid[i][j] = '('+i +','+j+')';
		}
	}	
}

GameBoard.prototype.displayGameBoard = function() {
	var self = this;
	$('.row').each(function(rowIndex, row) {
		$(row).children('.tile').each(function(colIndex, col) {
			$(col).children('.tile-inner').children('span').html(self.grid[rowIndex][colIndex]);
		});
	});
}

GameBoard.prototype.validateTile = function(x, y) {
	// console.log('Position: (' + x + ', ' + y +')');
	alert(this.grid[x-1][y-1]);
}