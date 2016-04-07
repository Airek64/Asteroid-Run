Game.LevelComplete = function (game) {

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

    this.ground = null;
    this.fullScreenToggle = null;
    this.quitButton = null;
    this.confirmButton = null;
    this.cursors = null;
    this.style = null;
    this.style2 = null;
    this.text = null;
    this.selection = null;
    this.options = null;
    this.upPressed = null;
    this.downPressed = null;
};

Game.LevelComplete.prototype = {

    create: function () {
        

        this.fullScreenToggle = this.input.keyboard.addKey(Phaser.Keyboard.F);
        this.fullScreenToggle.onUp.add(this.goFull, this);
        
        this.quitButton = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.quitButton.onUp.add(this.quitGame, this);
    
        this.confirmButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.confirmButton.onUp.add(this.startGame, this);
        
        this.style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.style2 = { font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };

        this.text = this.game.add.text(130, 100, "Select Damage to Fix", this.style);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        if (Game.level == 4){
            this.text = this.game.add.text(130, 50, "Holy Shit! Did you just do that??", this.style);
            this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        }
        
        var line = 260;
        this.options = [];
        for (var i = 0; i < Game.player.damages.length; i++){
            this.options.push(this.game.add.text(150, line++, Game.player.damages[i], this.style));
            line += 80;
        }
        
        this.options.push(this.game.add.text(150, 180, "Hull", this.style));
        
        this.selection = this.options.length - 1;
        
        this.upPressed = false;
        this.downPressed = false;
    },

    update: function () {
        
        if (Game.player.cursors.up.isDown){
//            this.options[this.selection].setStyle(this.style);
//            this.selection++;
            this.upPressed = true;

        }
        else if (Game.player.cursors.down.isDown){
//            this.options[this.selection].setStyle(this.style);
//            this.selection--;
            this.downPressed = true;
        }
        
        if (Game.player.cursors.up.isUp && this.upPressed){
            this.options[this.selection].setStyle(this.style);
            this.selection--;
            this.upPressed = false;
        }
        
        if (Game.player.cursors.down.isUp && this.downPressed){
            this.options[this.selection].setStyle(this.style);
            this.selection++;
            this.downPressed = false;
        }
        
        if (this.selection >= this.options.length)
            this.selection = 0;
        if (this.selection < 0)
            this.selection = this.options.length - 1;
        
        this.options[this.selection].setStyle(this.style2);
    },
    
    startGame: function (pointer) {
        if (this.selection != this.options.length) {
            var size = Game.player.damages.length;
            Game.player.damages = [];
            for (var i = 0; i < size; i++){
                if (this.selection != i)
                    Game.player.damages.push(this.options[i].text);
            }
        }
        else {
            Game.player.health += 20;
            if (Game.player.health > 100) Game.player.health = 100;
        }
		this.state.start('Level1');
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

    }
};