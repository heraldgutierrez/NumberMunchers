window.onload = function() {
	// create muncher
	var _MUNCHER = new Character(true, '#muncher');

	// create playing board
	var _BOARD = new GameBoard();

	// on key down event
	document.addEventListener('keydown', function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
		var direction = _MAP[event.which];
		var position = _MUNCHER.getPosition();

		if(!modifiers) {
			event.preventDefault();
			// if 'Spacebar', check tile value if it matches current objective
			if(direction == _DIRECTION.SPACE) {
				_BOARD.validateTile(position.y, position.x);
			} else {
				// otherwise move the muncher
				_MUNCHER.move(direction);
			}
		}
	});
}