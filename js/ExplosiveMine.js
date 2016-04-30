Game.ExplosiveMine = function(game){

    this.game = game;
    
    //Gameplay properties
    this.health = 100;
    this.sprite;
    this.explosionSprite;
    

    this.alive = false;
    this.baseSpeed = 250;
    this.pursuitSpeed = 450;

    this.initX = null;
    this.initY = null;
    
    //State machine properties - going up or down
    
    this.goingDown = true;
    
    //Target acquired?
    this.targetAcquired;
    
    //SFX properties
    
    //The explosion!
    this.deathSound;
    
    //When the mine's about to explode!
    this.beepBeep;

    





}

Game.ExplosiveMine.prototype = {
    
    
    add: function(x,y){
        
        this.initX = x;
        this.initY = y;
        
        this.targetAcquired = false;

        
        this.sprite = this.game.add.sprite(x,y,'explosiveMine');
        
        this.sprite.animations.add('lightBlink', [0,1], 2, true);
        this.sprite.animations.add('lightBlinkFast', [0,1], 6, true);
        
        //Physics for the sprite here!
        
        
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
        this.sprite.body.collideWorldBounds = false;
        this.sprite.body.allowGravity = false;
        
        //Sprite display/animation properties (scale, size, etc.)
        
        this.sprite.animations.play('lightBlink');
        
        //Other properties?
        
        //Sound properties!
    },
    
    
    update: function(player){
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        
        //First phase, search for target if none in sight, oscillating.
        if(this.targetAcquired == false){
            this.targetAcquired = this.checkForPlayer(player);
            this.oscillate();
        }
        
        //Target acquired, so charge!
        else{
            this.sprite.body.velocity.x = -1 * this.pursuitSpeed;
            this.sprite.animations.play('lightBlinkFast');
        }
        
        //this.checkIfMustExplode(player);
        this.game.physics.arcade.overlap(player.sprite, this.sprite, this.explode, null, this);

        
        
        
        
    },
    
    //This function makes it oscillate up and down the screen.
    oscillate: function(){
        
        if(this.goingDown){
            this.sprite.body.velocity.y = this.baseSpeed;
        }
        
        else if(!this.goingDown){
            this.sprite.body.velocity.y = -this.baseSpeed;
        }
        
        if(this.sprite.body.y < 0){
            this.goingDown = true;
        }
        
        else if(this.sprite.body.y > this.game.world.height - 64){   
            this.goingDown = false;
            
        }
    },
    
    explode: function(playerSprite, mineSprite){
        this.explosionSprite = this.game.add.sprite(mineSprite.body.x, mineSprite.body.y, 'explosion');
        this.explosionSprite.animations.add('explodeAnim', [0,1,2,3,4,5,6,7,8,9], 5, false);
        this.explosionSprite.animations.play('explodeAnim');
        
        this.explosionSprite.kill();
        mineSprite.kill();
        
        console.log('I have exploded!');
        
        
    },
    
    checkForPlayer: function(player){
        
        var angle = this.game.physics.arcade.angleBetween(this.sprite, player.sprite);
        console.log(angle);
        
        //Angle is calculated in radians, so checking if the player is directly to the left of the mine.
        //The system they have for 
        if(this.game.math.fuzzyEqual(angle, 3.1, 0.05)){
            return true;
            console.log('Target acquired!');
        }
        
        return false;
        
    },
    
    moveTowardsPlayer: function(player){
        
        this.game.physics.arcade.accelerateToObject(this.sprite, player.sprite, this.pursuitSpeed );
        
        this.sprite.animations.stop();
        this.sprite.animations.play('lightBlinkFast');
        
    },
    
    checkIfMustExplode: function(player){
        this.game.physics.arcade.collide(player.sprite, this.sprite, this.explode, null, this);
        
    },
    

}