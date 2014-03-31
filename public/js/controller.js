// var x = y = 1;
var x = y = 3;
var grid_rows = 5;
var grid_columns = 6;
var map = {
	38: 0, 	// Up
	39: 1, 	// Right
	40: 2, 	// Down
	37: 3,	// Left
	32: 4 	// Spacebar
};

var player = new Player({ x : x, y : y });
move();

var grid = new GameBoard(grid_rows, grid_columns);
grid.displayGameBoard();

document.addEventListener('keydown', function(event) {
	var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
	var mapped = map[event.which];
	var position = player.getPosition();

	if(!modifiers) {
		event.preventDefault();
		switch(mapped) {
			case 0:
				if(position.x > 1)
					position.x--;
				break;
			case 1:
				if(position.y < grid_columns)	
					position.y++;
				break;
			case 2:
				if(position.x < grid_rows)
					position.x++;
				break;
			case 3:
				if(position.y > 1)
					position.y--;
				break;
			case 4:
				grid.validateTile(position.x, position.y);
				break;
		}

		player.setPosition(position);
		move();
	}
});

function move() {
	var position = player.getPosition();
	var pos_class = 'position-' + position.x + '-' + position.y;
	$('#player').removeClass().addClass(pos_class);
}