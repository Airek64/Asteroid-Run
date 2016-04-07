Game.Level1 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //my properties
    this.ground = null;
    this.fullScreenToggle = null;
    this.asteroids = null;
    this.asteroidTimer = null;
    this.asteroidSpawnRate = null;
    this.healthbar = null;
    this.hitTimer = null;
    this.style = null;
    this.text = null;
    this.bg1 = null;
    this.bg2 = null;
    
    
    //for testing purposes
    this.tester = null;
    
    
    
};

Game.Level1.prototype = {

    create: function () {
        
        
        //world size
        //this.world.resize(4096, 4096);

        //system buttons
        this.fullScreenToggle = this.input.keyboard.addKey(Phaser.Keyboard.F);
        this.fullScreenToggle.onUp.add(this.goFull, this);
        
        this.quitButton = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.quitButton.onUp.add(this.quitGame, this);
        
        this.bg1 = this.game.add.sprite(0,0, 'bg');
        this.bg2 = this.game.add.sprite(this.bg1.width, 0, 'bg');
        
        Game.player.add(100, 100);
        
        Game.asteroidSpawner.init();
        
        this.asteroidTimer = 800;
        this.asteroidSpawnRate = 150;
        
        this.tester = 0;
        
        this.healthbar = this.add.graphics();
        this.healthbar.beginFill(0xFF0000);
        this.healthbar.drawRect(50, 20, Game.player.health * 5, 16);
        
        
        this.style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        this.text = this.game.add.text(10, 20, "Hull", this.style);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        this.hitTimer = 0;
    },

    update: function () {
        
        this.bg1.x += Game.asteroidSpawner.speed / 1000;
        this.bg2.x += Game.asteroidSpawner.speed / 1000;
        
        if (this.bg1.x + this.bg1.width < 0)
            this.bg1.x = this.bg2.x + this.bg2.height;
        if (this.bg2.x + this.bg2.width < 0)
            this.bg2.x = this.bg1.x + this.bg1.height;
        
        
        
        Game.player.update();
        Game.asteroidSpawner.update();
        
        //this.game.physics.arcade.collide(Game.player.sprite, Game.asteroidSpawner.asteroids);
        this.game.physics.arcade.collide(Game.asteroidSpawner.asteroids, Game.asteroidSpawner.asteroids);
        this.game.physics.arcade.collide(Game.player.lasers, Game.asteroidSpawner.asteroids, this.laserHitAsteroid, null, this);
        
        if (this.game.time.now > this.asteroidTimer){
            Game.asteroidSpawner.spawnAsteroid();
            this.asteroidTimer = this.game.time.now + this.asteroidSpawnRate;
            this.tester +=1;
        }
        
        this.game.physics.arcade.overlap(Game.player.sprite, Game.asteroidSpawner.asteroids, this.playerHitAsteroid, null, this);
        
        this.healthbar.width = Game.player.health * 5;
        
        Game.distance += -Game.asteroidSpawner.speed / 100;
        
        if (Game.distance >= 10000 * Game.level) {
            Game.level++;
            this.state.start('LevelComplete');
        }
        else if (Game.distance >= 10000 * Game.level - 600) {
            this.asteroidSpawnRate = 100000;
        }
        else if (Game.distance >= 6000 * (Game.level - 1) + 250) {
            this.asteroidSpawnRate = 250 / Game.level;
        }
        
        if (Game.player.health <= 0) {
            Game.distance = 0;
            Game.level = 1;
            Game.player.health = 100;
            Game.player.damages = [];
            this.state.start('GameOver');
        }
        
    },
    
    playerHitAsteroid: function (player, asteroid) {
        if (this.game.time.now > this.hitTimer) {
            Game.player.health -= asteroid.scale.x * 2.5 + (-asteroid.body.velocity.x / 100) * 1.5;
            Game.player.damage();
            this.hitTimer = this.game.time.now + 100;
        }
        if (asteroid.y > player.y) {
            asteroid.y += 2;
            asteroid.body.angularVelocity = 50;
        }
        else if (asteroid.y < player.y) {
            asteroid.y -= 2;
            asteroid.body.angularVelocity = -50;
        }
        
    },
    
    laserHitAsteroid: function (laser, asteroid) {
        asteroid.kill();
        laser.kill();
    },

    quitGame: function () {
        //reset variables
        Game.level = 1;
        Game.player.health = 100;
        Game.player.damages = [];
        this.state.start('MainMenu');
    },
    
    goFull: function() {
        if (this.scale.isFullScreen)
            this.scale.stopFullScreen();
        else
            this.scale.startFullScreen(false);
    },
    
    render: function() {
//        this.game.debug.text("test asteroids: " + this.tester +
//                             "\ntime: " + this.game.time.now + 
//                             "\nasteroidTimer: " + this.asteroidTimer, 32, 500);
        this.game.debug.text("Distance: " + Math.floor(Game.distance), 800, 20);
        //this.game.debug.text("damage types: " + Game.player.damageTypes, 10, 680);
        this.game.debug.text("damages: " + Game.player.damages, 10, 700);
    }
};