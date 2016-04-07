
Game.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Game.Preloader.prototype = {

	preload: function () {

        this.load.image('title', 'assets/Title.png');
        this.load.image('bg', 'assets/Background.png');
        this.load.image('player', 'assets/spaceship.png');
        this.load.image('asteroid', 'assets/Asteroid.png');
        this.load.image('laser', 'assets/Laser.png');
	},

	create: function () {
        Game.player = new Game.Player(this.game);
        Game.asteroidSpawner = new Game.AsteroidSpawner(this.game);
        Game.distance = 0;
        Game.level = 1;
        Game.highscore = 0;

	},

	update: function () {

			this.state.start('MainMenu');

	}

};