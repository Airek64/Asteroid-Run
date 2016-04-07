Game.AsteroidSpawner = function (game) {
    
    this.game = game;
    this.asteroids = null;
    this.speed = null;
    
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
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * 1.5 - 0.25;
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        this.speed = -250;
    },
    
    update: function () {
        this.asteroids.setAll("body.velocity.x", this.speed);
    },
    
    spawnAsteroid: function (){
        
        var asteroid = this.asteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            //asteroid.body.velocity.x = -250;
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    }

    
}