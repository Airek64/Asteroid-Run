Game.Player = function(game) {
    
    this.game = game;
    this.health = 100;
    this.level = 1;
    this.xp = 0;
    this.sprite = null;
    this.hitboxes = null;
    this.cursors = null;
    this.hurtSound = null;
    this.alive = false;
    
}

Game.Player.prototype = {
 
    add: function (x,y) {
        // check if a player object already exists
        if (!this.alive) {
            
            // add sprite
            this.sprite = this.game.add.sprite(x, y, 'player');

            // change sprite properites
            this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.immovable = true;
            this.sprite.body.collideWorldBounds = true;
//            this.sprite.scale.x = 2;
//            this.sprite.scale.y = 2;
//            this.sprite.body.setSize(100, 100);
            this.sprite.anchor.set(0.5,0.6);
        
            // add sound
            this.hurtSound = this.game.add.audio('hurt');

            // add cursors
            this.cursors = this.game.input.keyboard.createCursorKeys();

            // set alive
            this.alive = true;
        }
    },
    
    update: function () {
        
        // MOVE UP / MOVE DOWN
        
        if (this.cursors.up.isDown){
            this.sprite.body.acceleration.y = -250;
        }
        else if (this.cursors.down.isDown){
            this.sprite.body.acceleration.y = 250;
        }
        else if (this.cursors.up.isUp && this.cursors.down.isUp){
            this.sprite.body.acceleration.y = 0;
            if (this.sprite.body.velocity.y > 0)
                this.sprite.body.velocity.y -= 5;
            if (this.sprite.body.velocity.y < 0)
                this.sprite.body.velocity.y += 5;
        }
        
        if (this.sprite.body.velocity.y > 250) {
            this.sprite.body.velocity.y = 250;
            this.sprite.body.acceleration.y = 0;
        }
        if (this.sprite.body.velocity.y < -250) {
            this.sprite.body.velocity.y = -250;
            this.sprite.body.acceleration.y = 0;
        }
        // ACCELERATE / DECCELERATE
        
        if (this.cursors.left.isDown){
            
        }
        else if (this.cursors.right.isDown){
            
        }
        
    }
    
}