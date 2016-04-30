Game.ExplosiveMine = function(game){

    this.game = game;
    
    //Gameplay properties
    this.health = 100;
    this.sprite;
    
    

    this.alive = false;
    this.baseSpeed = -250;

    this.initX = null;
    this.initY = null;
    
    //State machine properties - going up or down
    
    this.goingDown = true;
    this.goingUp = !this.goingDown;
    
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
        
        this.sprite = this.game.add.sprite(x,y,'explosiveMine');
        
        //Physics for the sprite here!
        
        
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
        this.sprite.body.collideWorldBounds = false;
        this.sprite.body.allowGravity = false;
        
        //Sprite display properties (scale, size, etc.)
        
        
        //Other properties?
        
        //Sound properties!
    },
    
    
    update: function(){
        
        this.oscillate();
        
        
        
        
        
        
        
    },
    
    oscillate: function(){
        
        if(this.goingDown){
            this.sprite.body.velocity.y = this.baseSpeed;
        }
        
        else if(this.goingUp){
            this.sprite.body.velocity.y = -this.baseSpeed;
        }
        
        if(this.sprite.y < 0){
            this.goingDown = true;
        }
        
        else if(this.sprite.y > this.game.world.height){   
            this.goingDown = false;
            
        }
    },
    
    explode: function(){
        
        
        
        
        
    } 
    

}