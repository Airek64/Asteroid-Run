
Game.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Game.Preloader.prototype = {

	preload: function () {

        this.load.image('title', 'assets/Title.png');
        this.load.image('asteroid', 'assets/fireball.png');
	},

	create: function () {
        Game.player = new Game.Player(this.game);
        Game.asteroidSpawner = new Game.AsteroidSpawner(this.game);

	},

	update: function () {

			this.state.start('MainMenu');

	}

};