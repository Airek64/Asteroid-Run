Game.Store = function (game) {
    
    this.ground = null;
    this.fullScreenToggle = null;
    this.quitButton = null;
    this.confirmButton = null;
    this.cursors = null;
    this.whiteStyle = null;
    this.redStyle = null;
    this.yellowStyle = null;
    this.text = null;
    this.selection = null;
    this.options = null;
    this.upPressed = null;
    this.downPressed = null;
};

Game.Store.prototype = {

    create: function () {
        
        // system buttons
        this.fullScreenToggle = this.input.keyboard.addKey(Phaser.Keyboard.F);
        this.fullScreenToggle.onUp.add(this.goFull, this);
        
        this.quitButton = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.quitButton.onUp.add(this.quitGame, this);
    
        // used to confirm selection
        this.confirmButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.confirmButton.onUp.add(this.select, this);
        
        
        this.whiteStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.redStyle = { font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
        this.yellowStyle = { font: "bold 16px Arial", fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle"};
        
        this.text = this.game.add.text(300, 20, "Money: " + Game.player.money, this.yellowStyle);
        
        this.options = [];
        
        this.options.push(this.game.add.text(150, 180, "Repair", this.whiteStyle));
        
        this.options.push(this.game.add.text(150, 180, "Shop", this.whiteStyle));
        
        this.options.push(this.game.add.text(150, 180, "Broker", this.whiteStyle));
        
        this.options.push(this.game.add.text(150, 180, "Leave", this.whiteStyle));
        
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
    
    select: function (pointer) {
        if (selection == 0)
            this.state.start('Repair');
        else if (selection == 1)
            this.state.start('Store');
        else if (selection == 2)
            this.state.start('Broker');
        else if (selection == 3) {
            //TODO check if cargo is null
            this.state.start('level1');
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