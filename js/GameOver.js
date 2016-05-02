Game.GameOver = function (game) {
    
    this.fullScreenToggle = null;
    this.cursors = null;
    this.confirmButton = null;
    this.style = null;
    this.text = null;
};

Game.GameOver.prototype = {

    create: function () {
        
        // eneable toggling
        this.fullScreenToggle = this.input.keyboard.addKey(Phaser.Keyboard.F);
        this.fullScreenToggle.onUp.add(this.goFull, this);
        
        // enable quit to menu
        this.quitButton = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.quitButton.onUp.add(this.quitGame, this);
        
        // eneble selection button
        this.confirmButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.confirmButton.onUp.add(this.startGame, this);
        
        // add a new style for text
        this.style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        // add text
        this.text = this.game.add.text(150, 250, "Your High Score: " + Game.highscore, this.style);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        this.text = this.game.add.text(150, 350, "Press Enter to Start Again", this.style);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        this.text = this.game.add.text(150, 450, "Press Q to Quit to Main Menu", this.style);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
    },

    update: function () {
        // nothing needed. callbacks handle most things
    },
    
    startGame: function (pointer) {
		this.state.start('Level1'); //start from beginnning
	},   

    quitGame: function () {
        this.state.start('MainMenu');
    },
    
    goFull: function() {
        // check if full screen already, if so, exit full screen
        if (this.scale.isFullScreen)
        {
            this.scale.stopFullScreen();
        }
        // if not then go full screen
        else
        {
            this.scale.startFullScreen(false);
        }

    }
};