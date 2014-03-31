
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index');
};

exports.portfolio = function(req, res) {
	res.render('portfolio');
};

exports.resume = function(req, res) {
	res.render('resume');
};

/*************************************
		Portfolio Pages
*************************************/

/***** Scoreboard *****/
// All Scoreboards
exports.scoreboard = function(req, res) {
	// res.render('portfolio/scoreboard');
	res.redirect('/Portfolio');
};

// Simplified
exports.simpleScoreboard = function(req, res) {
	res.render('portfolio/simple-scoreboard');
};

// LED
exports.LEDScoreboard = function(req, res) {
	res.render('portfolio/led-scoreboard');
};

// LED: Display + Controller (Simple)
exports.LEDSimple = function(req, res) {
	res.render('portfolio/led-simple');
};


/***** Cards *****/
exports.Cards = function(req, res) {
	res.render('portfolio/cards');
};

/***** Casino *****/
exports.videoPoker = function(req, res) {
	res.render('portfolio/casino')
}

/***** GymLocker *****/
exports.GymLocker = function(req, res) {
	res.render('portfolio/gymlocker');
};

/***** MIPS *****/
exports.MIPS = function(req, res) {
	res.render('portfolio/mips');
};

