Game.AsteroidSpawner = function (game) {
    
    this.game = game;
    this.asteroids = null;
    
}

Game.AsteroidSpawner.prototype = {
    
    init: function () {
        this.asteroids = this.game.add.group();
        this.asteroids.enableBody = true;
        this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 100; i++) {
            var a = this.asteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
    },
    
    update: function () {
        this.asteroids.setAll("body.velocity.x", -250);
    },
    
    spawnAsteroid: function (){
        
        var asteroid = this.asteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            asteroid.body.velocity.x = -250;
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    }

    
}