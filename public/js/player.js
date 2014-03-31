function Player(position) {
	this.x = position.x;
	this.y = position.y;
}

Player.prototype.getPosition = function() {
	return { x: this.x, y: this.y };
}

Player.prototype.setPosition = function(position) {
	this.x = position.x;
	this.y = position.y;
}