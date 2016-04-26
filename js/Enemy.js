Game.Enemy = function(game) {
    this.game=game;
    this.health=200;
    this.fireRate=400;
    this.specialFireRate=2000;
    this.fireTimer=0;
    this.specialFireTimer=0;
    this.sprite=null;
    this.lasers=null;
    this.wait1=0;
    this.wait2=0;
    this.wait3=0;
}
Game.Enemy.prototype = {
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
    update: function () {
        if (this.game.time.now-this.specialFireTimer>this.specialFireRate) {
            //fire special attack
        }
        if (this.game.time.now-this.fireTimer>this.fireRate) {
            var laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x + 5, this.sprite.y + 10);
            laser.body.velocity.x = 500;
            laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x + 5, this.sprite.y - 10);
            laser.body.velocity.x = 500;
            this.fireTimer = this.game.time.now + this.fireRate;   
        }
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
    update2: function() {
        this.sprite.body.velocity.x=-25;
        if (this.game.time.now-this.specialFireTimer>this.specialFireRate) {
            //fire special attack
        }
        if (this.game.time.now-this.fireTimer>this.fireRate) {
            var laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x - 35, this.sprite.y + 10);
            laser.body.velocity.x = -500;
            laser=this.lasers.getFirstExists(false);
            laser.reset(this.sprite.x - 35, this.sprite.y - 10);
            laser.body.velocity.x = -500;
            this.fireTimer = this.game.time.now + this.fireRate;   
        }
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
    }
};