Game.RammingEnemy = function(game) {
    this.game=game;
    this.health=100;
    this.sprite=null;
    this.rate=7500;
    this.counter=0;
    this.attackSwitch=false;
    this.playerY=0;
}
Game.RammingEnemy.prototype= {
    add:function(x,y) {
        this.sprite = this.game.add.sprite(x, y, 'rammingShip');
        // change sprite properites
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = false;
        this.sprite.body.allowGravity = false;
        this.sprite.body.setSize(this.sprite.width * 0.7, this.sprite.height * 0.8);
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.rotation=(Math.PI/2);
    },
    update: function() {
        this.game.physics.arcade.overlap(Game.player.sprite, this.sprite, this.hitPlayer, null, this);
        if (this.sprite.x<100) {
            this.sprite.body.velocity.x=100;
        }
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
    //call back for player colliding with enemy ramming ship
    hitPlayer: function (player) {
        if (this.game.time.now>Game.Level1.hitTimer)
        Game.player.health-=25;
        Game.player.damage(25);
        Game.Level1.hitTimer=this.game.time.now+250;
        this.sprite.body.velocity.x=-200;
        this.attackSwitch=false;
    },
}