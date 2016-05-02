Game.RammingEnemy = function(game) {
    this.game=game;
    this.health=100;
    this.sprite=null;
    this.rate=10000;
    this.counter=0;
    this.attackSwitch=false;
    this.playerY=0;
}
Game.RammingEnemy.prototype= {
    add:function(x,y) {
        this.sprite = this.game.add.sprite(x, y, 'player');
        // change sprite properites
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
        this.sprite.body.allowGravity = false;
        this.sprite.body.setSize(this.sprite.width * 0.7, this.sprite.height * 0.8);
        this.sprite.anchor.set(0.5,0.5);
    },
    update: function() {
        this.game.physics.arcade.collide(Game.player.lasers, this, this.damage, null, this);
        if (this.game.time.now-this.rate>this.counter) {
            this.counter+=this.rate;
            playerY=Game.player.sprite.y;
            this.attackSwitch=true;
            this.sprite.body.velocity.x=100;
        }
        if (this.attackSwitch==true) {
            this.sprite.body.velocity.x+=(1000/(Game.player.sprite.x-this.sprite.x));
            this.sprite.body.velocity.y=playerY-this.sprite.y;
            if (this.sprite.x>Game.player.sprite.x) {
                this.attackSwitch=false;
            }
        }
        else if (this.attackSwitch==false && this.sprite.x>100) {
            this.sprite.body.velocity.x=-200;
            this.sprite.body.velocity.y=0;
        }
        else {
            this.sprite.body.velocity.x=0;
        }
    },
    damage: function(laser) {
        this.health-=25;
        laser.kill();
        if (this.health<=0) {
            this.kill();
        }
    }
}