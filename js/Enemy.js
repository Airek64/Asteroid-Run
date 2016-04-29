Game.Enemy = function(game) {
    this.game=game;
    this.health=200;
    this.fireRate=400;
    this.specialFireRate=2000;
    this.fireTimer=0;
    this.specialFireTimer=0;
    this.sprite=null;
    this.lasers=null;
    //these variables are for the delay in the enemy movement
    this.wait1=0;
    this.wait2=0;
    this.wait3=0;
}
Game.Enemy.prototype = {
    //direction is "left" or "right"
    add: function (x,y,direction) {
        // add sprite
        this.sprite = this.game.add.sprite(x, y, 'player');
        // change sprite properites
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
        if (direction=="right") {
            this.sprite.body.collideWorldBounds = true;
        }
        this.sprite.body.allowGravity = false;
        this.sprite.body.setSize(this.sprite.width * 0.7, this.sprite.height * 0.8);
        if (direction=="left") {
            this.sprite.scale.setTo(-1,1);
        }
        this.sprite.anchor.set(0.5,0.5);
        
        this.lasers=this.game.add.group();
        this.lasers.enableBody = true;
        this.lasers.physicsBodyType = Phaser.Physics.ARCADE;
        this.lasers.createMultiple(30, 'laser', null, false);
        this.lasers.setAll('checkWorldBounds', true);
        this.lasers.setAll('outOfBoundsKill', true);
    },
    //this is the enemy that tails you and fires lasers at a constant rate
    update: function () {
        if (this.game.time.now-this.specialFireTimer>this.specialFireRate) {
            //fire special attack
        }
        //fire lasers at a constant rate
        if (this.game.time.now-this.fireTimer>this.fireRate) {
            var laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x + 5, this.sprite.y + 10);
            laser.body.velocity.x = 500;
            laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x + 5, this.sprite.y - 10);
            laser.body.velocity.x = 500;
            this.fireTimer = this.game.time.now + this.fireRate;   
        }
        //if the enemy is mostly in line with the player, it stops 
        if (this.sprite.y<Game.player.sprite.y+10 && this.sprite.y>Game.player.sprite.y-10) {
            //30ms delay
            if (this.wait1>30) {
                this.sprite.body.velocity.y=0;
                this.fireRate=300;
            }
            else {
                this.wait1++;
            }
            this.wait2=0;
            this.wait3=0;
        }
        //go down if the player is below the enemy
        else if (this.sprite.y>Game.player.sprite.y) {
            //30ms delay
            if (this.wait2>30) {
                this.sprite.body.velocity.y=-200;
                this.fireRate=400;
            }
            else {
                this.wait2++;
            }
            this.wait1=0;
            this.wait3=0;
        }
        //go up if the player is above the enemy
        else if (this.sprite.y<Game.player.sprite.y) {
            //30ms delay
            if (this.wait3>30) {
                this.sprite.body.velocity.y=200;
                this.fireRate=400;
                this.wait=0;
            }
            else {
                this.wait3++;
            }
            this.wait1=0;
            this.wait2=0;
        }
    },
    //this is the enemy that attacks you from in front 
    update2: function() {
        //move away from the player if too close
        if (this.sprite.x-Game.player.x<200) {
            this.sprite.body.velocity.x=25;
        }
        //move towards the player if too far away
        else if (this.sprite.x-Game.player.x>500) {
            this.sprite.body.velocity.x=-25;
        }
        else if (this.sprite.body.velocity.x==0) {
            this.sprite.body.velocity.x=-25;
        }
        if (this.game.time.now-this.specialFireTimer>this.specialFireRate) {
            //fire special attack
        }
        //fire lasers at a constant rate
        if (this.game.time.now-this.fireTimer>this.fireRate) {
            var laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x - 35, this.sprite.y + 10);
            laser.body.velocity.x = -500;
            laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x - 35, this.sprite.y - 10);
            laser.body.velocity.x = -500;
            this.fireTimer = this.game.time.now + this.fireRate;   
        }
        //the movement patterns are the same as the previous enemy
        if (this.sprite.y<Game.player.sprite.y+10 && this.sprite.y>Game.player.sprite.y-10) {
            if (this.wait1>30) {
                this.sprite.body.velocity.y=0;
                this.fireRate=300;
            }
            else {
                this.wait1++;
            }
            this.wait2=0;
            this.wait3=0;
        }
        else if (this.sprite.y>Game.player.sprite.y) {
            if (this.wait2>30) {
                this.sprite.body.velocity.y=-200;
                this.fireRate=400;
            }
            else {
                this.wait2++;
            }
            this.wait1=0;
            this.wait3=0;
        }
        else if (this.sprite.y<Game.player.sprite.y) {
            if (this.wait3>30) {
                this.sprite.body.velocity.y=200;
                this.fireRate=400;
                this.wait=0;
            }
            else {
                this.wait3++;
            }
            this.wait1=0;
            this.wait2=0;
        }
    },
    //this is a prototype for a large enemy ship that asteroids break on that stays still and shoots a lot of lasers at you
    update3: function() {
        if (this.game.time.now-this.fireTimer>this.fireRate) {
            var laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x + 50, this.sprite.y - 100);
            laser.body.velocity.x = 500;
            laser.body.velocity.y = ((Game.player.sprite.x-this.sprite.x)/(Game.player.sprite.y-this.sprite.y));
        }
    }
};