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

    
    //Control Variables: Quit, Confirm, and Up-Pressed, Down-Pressed
    this.cursors = null;

    
    this.quitButton = null;
    this.confirmButton = null;

    this.upPressed = null;
    this.downPressed = null;
    
    //Text Variables:
    this.style = null;
    this.style2 = null;

    
    this.ground = null;
    this.fullScreenToggle = null;
    this.quitButton = null;
    this.confirmButton = null;
    this.cursors = null;
    this.whiteStyle = null;
    this.redStyle = null;
    this.yellowStyle = null;
    this.text = null;
    
    
    
    this.ground = null;
    this.fullScreenToggle = null;
    
    //Selection Variables:
    this.selection = null;
    this.options = null;
};

Game.LevelComplete.prototype = {

    create: function () {
        
        // system buttons
        this.fullScreenToggle = this.input.keyboard.addKey(Phaser.Keyboard.F);
        this.fullScreenToggle.onUp.add(this.goFull, this);
        
        this.quitButton = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.quitButton.onUp.add(this.quitGame, this);
    
        // used to confirm selection
        this.confirmButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.confirmButton.onUp.add(this.select, this);
        
        this.game.add.sprite(0, 0, 'bg');
        
        this.whiteStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.redStyle = { font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
        this.yellowStyle = { font: "bold 16px Arial", fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle"};
        
        this.text = this.game.add.text(900, 20, "Money: " + Game.player.money, this.yellowStyle);
        
        this.options = [];
        
        this.options.push(this.game.add.text(150, 180, "Repair", this.whiteStyle));
        
        this.options.push(this.game.add.text(150, 260, "Shop", this.whiteStyle));
        
        this.options.push(this.game.add.text(150, 340, "Broker", this.whiteStyle));
        
        this.options.push(this.game.add.text(150, 420, "Leave", this.whiteStyle));
        
        this.selection = 0;
        
        this.upPressed = false;
        this.downPressed = false;
        
    },

    update: function () {
        
        if (Game.player.cursors.up.isDown){
            this.upPressed = true;

        }
        else if (Game.player.cursors.down.isDown){
            this.downPressed = true;
        }
        
        if (Game.player.cursors.up.isUp && this.upPressed){
            this.options[this.selection].setStyle(this.whiteStyle);
            this.selection--;
            this.upPressed = false;
        }
        
        if (Game.player.cursors.down.isUp && this.downPressed){
            this.options[this.selection].setStyle(this.whiteStyle);
            this.selection++;
            this.downPressed = false;
        }
        
        if (this.selection >= this.options.length)
            this.selection = 0;
        if (this.selection < 0)
            this.selection = this.options.length - 1;
        
        this.options[this.selection].setStyle(this.redStyle);
    },
    
    startGame: function (pointer) {
        if (this.selection != this.options.length -1) {
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
},

    select: function (pointer) {
        if (this.selection == 0)
            this.state.start('Repair');
        else if (this.selection == 1)
            //this.state.start('Store');
            return;
        else if (this.selection == 2)
            this.state.start('Broker');
        else if (this.selection == 3) {
            if (Game.player.cargo != 0)
                this.state.start('Level1');
            else 
                this.game.add.text(300, 420, "Broker For Cargo First!", this.redStyle)
        }
	}, 

    quitGame: function () {
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