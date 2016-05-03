
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
        this.load.image('rammingShip', 'assets/Pirate.png');
        this.load.image('enemy1', 'assets/Chaser.png');
        this.load.spritesheet('explosiveMine', 'assets/ExplosiveMine.png', 64,64);
        this.load.spritesheet('explosion', 'assets/Explosion_MetroidFusion.png', 105, 103);
        
        //Music loadan'
        this.load.audio('explosionSound', 'assets/explosionSound.mp3', true);
        this.load.audio('laserCannon', 'assets/laserCannon_Uncropped.mp3', true);
        this.load.audio('asteroidBreak', 'assets/rockBreak_USETHIS.mp3');
        this.load.audio('accelerate', 'assets/powerUp.mp3');
        
        this.load.audio('LevelTheme', 'assets/Mistake_the_Getaway.mp3');
	},

	create: function () {
        Game.player = new Game.Player(this.game);
        Game.enemy = new Game.Enemy(this.game);
        Game.rammingEnemy = new Game.RammingEnemy(this.game);
        Game.explosivemine = new Game.ExplosiveMine(this.game);
        Game.asteroidSpawner = new Game.AsteroidSpawner(this.game);
        Game.distance = 0;
        Game.level = 1;
        Game.highscore = 0;

	},

	update: function () {

			this.state.start('MainMenu');

	}

};
