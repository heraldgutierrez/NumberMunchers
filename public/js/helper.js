var _GRID_ROWS = $('#grid').data('rows');
var _GRID_COLS = $('#grid').data('columns');

var _MAP = {
	38: 0, 	// Up
	39: 1, 	// Right
	40: 2, 	// Down
	37: 3,	// Left
	32: 4 	// Spacebar
};

var _DIRECTION = {
	UP:    0,
	RIGHT: 1,
	DOWN:  2,
	LEFT:  3,
	SPACE: 4
};

var _GAMETYPES = {
	'multiple': 0,
	'factor': 	1,
	'prime': 	2,
	'equal': 	3
}

var _MIN_SOLUTIONS = 12;