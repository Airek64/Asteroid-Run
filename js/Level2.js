Game.Level2 = function (game) {
    this.fullScreenToggle = null;
    this.healthbar = null;
    this.hitTimer = null;
    this.style = null;
    this.text = null;
    this.bg1 = null;
    this.bg2 = null;
    var enemy1;
};

Game.Level2.prototype = {

    create: function () {
        this.fullScreenToggle = this.input.keyboard.addKey(Phaser.Keyboard.F);
        this.fullScreenToggle.onUp.add(this.goFull, this);
        
        this.quitButton = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.quitButton.onUp.add(this.quitGame, this);
        
        this.bg1 = this.game.add.sprite(0,0, 'bg');
        this.bg2 = this.game.add.sprite(this.bg1.width, 0, 'bg');
        
        this.healthbar = this.add.graphics();
        this.healthbar.beginFill(0xFF0000);
        this.healthbar.drawRect(50, 20, Game.player.health * 5, 16);
        
        this.style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        this.text = this.game.add.text(10, 20, "Hull", this.style);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        Game.player.add(100, 100);
        Game.enemy.add(900, 100, "left");
    },
    update: function () {
        Game.player.update();
        Game.enemy.update2();
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
    }
};