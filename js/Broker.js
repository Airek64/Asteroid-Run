Game.Broker = function (game) {
    
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
    
    this.tier1 = null;
    this.tier2 = null;
    this.tier3 = null;
};

Game.Broker.prototype = {

    create: function () {
        
        this.game.add.sprite(0, 0, 'bg');
        
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
        
        this.text = this.game.add.text(900, 20, "Money: " + Game.player.money, this.yellowStyle);
        this.text = this.game.add.text(130, 100, "Choose Cargo", this.whiteStyle);
        
        this.tier1 = ['Bovia Salts', 'Bell Eals', 'Snog Weed', 'Red Powder' , 'Odin Oil', 'Garden Gnomes'];
        this.tier2 = ['Pelpitine', 'Silvertounge', 'Yogson White Greens', 'Fullgain', 'Bomb Powder'];
        this.tier3 = ['Military-grade Missiles', 'Hyper Fuel', 'Z Matter', 'Dragon\'s Blood', 'God Hand'];
        
        var line = 260;
        this.options = [];
        this.amount = []
        for (var i = 0; i < 4; i++){
            var rand = Math.floor(Math.random() * 3 + 1);
            if (Game.player.notoriety >= 20 && rand == 3) {
                this.options.push(this.game.add.text(150, line, this.tier3[Math.floor(Math.random() * (this.tier3.length - 1))] , this.whiteStyle));
                this.amount.push(600);
                this.game.add.text(600, line, "600", this.whiteStyle);
            }
            else if (rand == 2) {
                this.options.push(this.game.add.text(150, line, this.tier2[Math.floor(Math.random() * (this.tier2.length -1))] , this.whiteStyle));
                this.amount.push(300);
                this.game.add.text(600, line, '300', this.whiteStyle);
            }
            else {
                this.options.push(this.game.add.text(150, line, this.tier1[Math.floor(Math.random() * (this.tier1.length - 1))] , this.whiteStyle));
                this.game.add.text(600, line, '150', this.whiteStyle);
                this.amount.push(150);
            }
            line += 80;
        }
        
        this.options.push(this.game.add.text(150, line, "Leave", this.whiteStyle));
        
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
        if (this.selection != this.options.length - 1 && Game.player.cargoAmount == 0){
            Game.player.cargoAmount = this.amount[this.selection];
            Game.player.cargo = this.options[this.selection].text;
            if (Game.player.cargoAmount >= 600) Game.player.notoriety += 20;
            if (600 > Game.player.cargoAmount > 100) Game.player.notoriety +=10;
            else Game.player.notoriety += 5;
        }
        //else if (this.selection == this.options.length - 1)
            this.state.start('LevelComplete');
	}, 

    quitGame: function () {
        this.state.start('MainMenu');
    },
    
    goFull: function() {
        if (this.scale.isFullScreen)
            this.scale.stopFullScreen();
        else
            this.scale.startFullScreen(false);
    }
};