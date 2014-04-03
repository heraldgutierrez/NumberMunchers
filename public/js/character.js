function Character(isMuncher, id) {
	this.is_muncher = isMuncher;		// is the character a muncher or troggle (enemy)?

	// set movement limits
	// if a muncher, only movable area is the game area
	// if troggle, movable area is game area + 1 tile in each direction (to enter and exit)
	this.x_min = isMuncher ? 2 : 1;	
	this.x_max = isMuncher ? 7 : 8;
	this.y_min = isMuncher ? 2 : 1;
	this.y_max = isMuncher ? 6 : 7;

	// starting at a random location
	this.x = Math.floor(Math.random() * (this.x_max - this.x_min) + this.x_min);
	this.y = Math.floor(Math.random() * (this.y_max - this.y_min) + this.y_min);

	this.element = $(id);	// which html element does this character belong to
	this.lives = 4;			// number of lives before a game over
	this.display();			// display the character

	this.moving = false;
}

// move the character in the direction given
Character.prototype.move = function(direction) {
	if(!this.moving) {
		// remove the current class of a tile
		var pos_class = 'position-' + this.x + '-' + this.y;
		$(this.element).removeClass(pos_class);

		// the character can only move within its bound area
		switch(direction) {
			case _DIRECTION.UP:
				if(this.y > this.y_min)
					this.y--;
				break;
			case _DIRECTION.RIGHT:
				if(this.x < this.x_max)	
					this.x++;
				break;
			case _DIRECTION.DOWN:
				if(this.y < this.y_max)
					this.y++;
				break;
			case _DIRECTION.LEFT:
				if(this.x > this.x_min)
					this.x--;
				break;
		}

		this.display();
	}
}

// add the class of a tile to the character, this will animate the movement
Character.prototype.display = function() {
	this.moving = true;
	var self = this;
	var pos_class = 'position-' + this.x + '-' + this.y;
	$(this.element).addClass(pos_class);
	var timeout = window.setTimeout(function() {
		self.moving = false;
		window.clearTimeout(timeout);
	}, 175);
}

// get current position of the character
Character.prototype.getPosition = function() {
	return { x: this.x, y: this.y };
}