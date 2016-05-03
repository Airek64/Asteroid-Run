Game.Player = function(game) {
    
    this.game = game;
    this.health = 100;
    this.money = 100;
    this.notoriety = 0;
    this.cargo = 150;
    this.sprite = null;
    this.hitboxes = null;
    this.cursors = null;
    this.hurtSound = null;
    this.alive = false;
    this.lasers = null;
    this.fireRate = null;
    this.fireTimer = null;
    this.fireButton = null;
    
    this.maxSpeed = -400;
    this.minSpeed = -150;
    this.baseSpeed = -250;
    this.posOffsetX = null;
    
    this.initX = null;
    this.initY = null;
    
    this.damageTypes = ['slowTurning', 'reverseTurning' , 'lowerFireRate', 'brokeLaser1', 'brokeLaser2', 'lowerSpeed',
                                'stuckThrottle'];
    this.damages = [];
    this.upgrades = [];
}

Game.Player.prototype = {
 
    add: function (x,y) {
        // check if a player object already exists
        if (!this.alive) {
            
            this.initX = x;
            this.initY = y;
            this.posOffset = x;
            
            // add sprite
            this.sprite = this.game.add.sprite(x, y, 'player');

            // change sprite properites
            this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.immovable = true;
            this.sprite.body.collideWorldBounds = true;
            this.sprite.body.allowGravity = false;
//            this.sprite.scale.x = 2;
//            this.sprite.scale.y = 2;
            this.sprite.body.setSize(this.sprite.width * 0.7, this.sprite.height * 0.8);
            this.sprite.anchor.set(0.5,0.5);
            
            // add sound
            this.hurtSound = this.game.add.audio('hurt');

            // add cursors
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            // add lasers
            this.lasers = this.game.add.group();
            this.lasers.enableBody = true;
            this.lasers.physicsBodyType = Phaser.Physics.ARCADE;
            this.lasers.createMultiple(30, 'laser', null, false);
            this.lasers.setAll('checkWorldBounds', true);
            this.lasers.setAll('outOfBoundsKill', true);
            
            this.fireRate = 500;
            this.fireTimer = 0;
            
//            this.damageTypes = ['slowTurning', 'reverseTurning' , 'lowerFireRate', 'brokeLaser1', 'brokeLaser2', 'lowerSpeed',
//                                'stuckThrottle'];
//            
//            this.damages = [];
            
            // set alive
            this.alive = true;
        }
    },
    
    update: function () {
        
        // MOVE UP / MOVE DOWN
        var multiplier = 1;
        if (this.checkForDamageType('reverseTurning'))
            multiplier = -1;
        
        if (this.cursors.up.isDown){
            
            if (this.checkForDamageType('slowTurning'))
                this.sprite.body.acceleration.y = -100 * multiplier;
            else
                this.sprite.body.acceleration.y = -250 * multiplier;
        }
        else if (this.cursors.down.isDown){
            if (this.checkForDamageType('slowTurning'))
                this.sprite.body.acceleration.y = 100 * multiplier;
            else
                this.sprite.body.acceleration.y = 250 * multiplier;
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
        
        if (this.posOffset - this.sprite.body.x > 0.004)
            this.sprite.body.velocity.x = 100;
        else if (this.posOffset - this.sprite.body.x < 0.004)
            this.sprite.body.velocity.x = -100;
        else
            this.sprite.body.velocity.x = 0;
        
        if (this.cursors.right.isDown){
            //Game.asteroidSpawner.speed -= 25;
            //this.sprite.body.x = this.posOffset + 5;
            if (Game.asteroidSpawner.speed > this.maxSpeed)
                //Game.asteroidSpawner.speed = this.maxSpeed;
                Game.asteroidSpawner.speed -= 25;
        }
        else if (this.cursors.left.isDown){
            //Game.asteroidSpawner.speed += 25;
            //this.sprite.body.x = this.posOffset - 5;
            if (Game.asteroidSpawner.speed < this.minSpeed)
                //Game.asteroidSpawner.speed = this.minSpeed;
                Game.asteroidSpawner.speed += 25;
        }
        else {
            //this.sprite.body.x = this.posOffset;
            if (Game.asteroidSpawner.speed > this.baseSpeed)
                Game.asteroidSpawner.speed -= 25;
            else if (Game.asteroidSpawner.speed < this.baseSpeed)
                Game.asteroidSpawner.speed += 25;
        }
        
        // FIRE
        if (this.fireButton.isDown){
            if (this.game.time.now > this.fireTimer){
                var laser = this.lasers.getFirstExists(false);
                
                if (laser && !this.checkForDamageType('brokeLaser1')){
                    laser.reset(this.sprite.x + 5, this.sprite.y + 10);
                    laser.body.velocity.x = 500;
                    this.fireTimer = this.game.time.now + this.fireRate;
                }
                laser = this.lasers.getFirstExists(false);
                if (laser && !this.checkForDamageType('brokeLaser2')){
                    laser.reset(this.sprite.x + 5, this.sprite.y - 10);
                    laser.body.velocity.x = 500;
                    this.fireTimer = this.game.time.now + this.fireRate;
                }
            }
        }
        
        // CHECK DAMAGES
        
        
        
        if (this.checkForDamageType('lowerSpeed')){
            this.maxSpeed = -250;
            this.baseSpeed = -175;
        } else {
            this.maxSpeed = -400;
            this.baseSpeed = -250;
        }
        
        if (this.checkForDamageType('stuckThrottle')){
            this.minSpeed = -250;
            this.baseSpeed = -350;
        } else {
            this.minSpeed = -150;
            this.baseSpeed = -250;
        }
        
        if (this.checkForDamageType('lowerSpeed') && this.checkForDamageType('stuckThrottle')) {
            this.baseSpeed = -250;
            this.sprite.body.x = this.initX
        }
        
        
        if (this.checkForDamageType('lowerFireRate')){
            this.fireRate = 1500;
        } else {
            this.fireRate = 500;
        }
        
        
        
        this.alive = false;
        
        
    },
    
    damage: function() {
        if (Math.floor(Math.random() * 3)== 1){
            if (this.damages.length == this.damageTypes.length) //avoid infinite loop
                return;
            do {//find a new damage if type already exists in damages
                var i = Math.floor(Math.random() * this.damageTypes.length);
            } while (this.checkForDamageType(this.damageTypes[i]));
            this.damages.push(this.damageTypes[i]);
            
        } 
    },
    
    checkForDamageType: function(damageType){
        for (var i = 0; i < this.damages.length; i++){
            if (damageType == this.damages[i])
                return true;
        }
        return false;
    }
    
}