Game.Repair = function (game) {
    
    this.ground = null;
    this.fullScreenToggle = null;
    this.quitButton = null;
    this.confirmButton = null;
    this.cursors = null;
    this.whiteStyle = null;
    this.redStyle = null;
    this.smallRedStyle = null;
    this.yellowStyle = null;
    this.text = null;
    this.selection = null;
    this.options = null;
    this.moneyDisp = null;
    this.upPressed = null;
    this.downPressed = null;
};

Game.Repair.prototype = {

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
        this.smallRedStyle = { font: "bold 16px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
        this.yellowStyle = { font: "bold 16px Arial", fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle"};

        this.moneyDisp = this.game.add.text(900, 20, "Money: " + Game.player.money, this.yellowStyle);        
        this.text = this.game.add.text(130, 100, "Select Damage to Fix", this.whiteStyle);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        var line = 260;
        this.options = [];
        for (var i = 0; i < Game.player.damages.length; i++){
            this.options.push(this.game.add.text(150, line, Game.player.damages[i], this.whiteStyle));
            line += 80;
        }
        
        this.options.push(this.game.add.text(150, line, "Leave", this.whiteStyle));
        
        this.options.push(this.game.add.text(150, 180, "25% Hull - 200g", this.whiteStyle));
        
        this.selection = this.options.length - 1;
        
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
            this.moneyDisp.setStyle(this.yellowStyle);
            this.selection--;
            this.upPressed = false;
        }
        
        if (Game.player.cursors.down.isUp && this.downPressed){
            this.options[this.selection].setStyle(this.whiteStyle);
            this.moneyDisp.setStyle(this.yellowStyle);
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
        if (this.selection < this.options.length - 2) {
            if (Game.player.money >= 150){
                Game.player.money -= 150;
                var size = Game.player.damages.length;
                Game.player.damages = [];
                for (var i = 0; i < size; i++){
                    if (this.selection != i)
                        Game.player.damages.push(this.options[i].text);
                }
                this.moneyDisp.setText("Money: " + Game.player.money);
            }
            else 
                this.moneyDisp.setStyle(this.smallRedStyle);
        }
        else if (this.selection == this.options.length - 1){
            if (Game.player.money >= 200) {
                Game.player.money -= 200;
                Game.player.health += 20;
                if (Game.player.health > 100) Game.player.health = 100;
                this.moneyDisp.setText("Money: " + Game.player.money);
            }
            else 
                this.moneyDisp.setStyle(this.smallRedStyle);
        }
        else 
		  this.state.start('LevelComplete');
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