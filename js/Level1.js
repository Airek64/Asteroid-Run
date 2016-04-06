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
    //this.cursors = null;
    
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
        
        Game.player.add(100, 100);
        
        Game.asteroidSpawner.init();
        
        this.asteroidTimer = 0;
        this.asteroidSpawnRate = 200;
        
        this.tester = 0;
    },

    update: function () {
        
        Game.player.update();
        Game.asteroidSpawner.update();
        
        this.game.physics.arcade.collide(Game.player.sprite, Game.asteroidSpawner.asteroids);
        this.game.physics.arcade.collide(Game.asteroidSpawner.asteroids, Game.asteroidSpawner.asteroids);
        
        if (this.game.time.now > this.asteroidTimer){
            Game.asteroidSpawner.spawnAsteroid();
            this.asteroidTimer = this.game.time.now + this.asteroidSpawnRate;
            this.tester +=1;
        }
        
    },

    quitGame: function () {
        //reset variables
        this.state.start('MainMenu');

    },
    
    goFull: function() {
        
        if (this.scale.isFullScreen)
        {
            this.scale.stopFullScreen();
        }
        else
        {
            this.scale.startFullScreen(false);
        }

    },
    
    render: function() {
//        this.game.debug.text("test asteroids: " + this.tester +
//                             "\ntime: " + this.game.time.now + 
//                             "\nasteroidTimer: " + this.asteroidTimer, 32, 500);
    }
};