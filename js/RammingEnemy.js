Game.RammingEnemy = function(game) {
    this.game=game;
    this.health=200;
    this.sprite=null;
}
Game.RammingEnemy.prototype= {
    add:function(x,y,direction) {
        this.sprite = this.game.add.sprite(x, y, 'player');
        // change sprite properites
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
        this.sprite.body.allowGravity = false;
        this.sprite.body.setSize(this.sprite.width * 0.7, this.sprite.height * 0.8);
        if (direction=="left") {
            this.sprite.scale.setTo(-1,1);
        }
        this.sprite.anchor.set(0.5,0.5);
    },
    update: function() {
        this.sprite.body.collideWorldBounds=false;
        this.sprite.body.velocity.x=100;
        if (this.sprite.y<Game.player.sprite.y+10 && this.sprite.y>Game.player.sprite.y-10) {
            if (this.wait1>30) {
                this.sprite.body.velocity.y=0;
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
                this.wait=0;
            }
            else {
                this.wait3++;
            }
            this.wait1=0;
            this.wait2=0;
        }
    }
}