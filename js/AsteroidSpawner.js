Game.AsteroidSpawner = function (game) {
    
    this.game = game;
    this.largeAsteroids = null;
    this.standardAsteroids = null;
    this.smallAsteroids = null;
    this.tinyAsteroids = null;
    this.speed = null;
    
}

Game.AsteroidSpawner.prototype = {
    // initialize the asteroid groups
    init: function () {
        
        // init the large asteroids
        this.largeAsteroids = this.game.add.group();
        this.largeAsteroids.enableBody = true;
        this.largeAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 30; i++) { // loop to add 30 asteroids 
            var a = this.largeAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * (1.4 - 1.1) + 1.1; // random size between 1.4 and 1.1 scale
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        // init the medium size asteroids
        this.standardAsteroids = this.game.add.group();
        this.standardAsteroids.enableBody = true;
        this.standardAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 30; i++) { // 30 medium asteroids
            var a = this.standardAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * (.9 - 0.6) + 0.6; // range between .9 and .6 scale
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        // init small asteroids
        this.smallAsteroids = this.game.add.group();
        this.smallAsteroids.enableBody = true;
        this.smallAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 100; i++) { // 100 small 
            var a = this.smallAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * (0.7) + 0.2; // range between .7 and .2 scale
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        // init tiniest asteroids
        this.tinyAsteroids = this.game.add.group();
        this.tinyAsteroids.enableBody = true;
        this.tinyAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 100; i++) { // 100 tiny
            var a = this.tinyAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * (0.2 - (-0.2)) - 0.2; // between .2 and -.2
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        this.speed = -250; // initial speed (velocity) of asteroids
    },
    
    // moves asteroids (should probably move collision to here)
    update: function () {
        this.largeAsteroids.setAll("body.velocity.x", this.speed);
        this.standardAsteroids.setAll("body.velocity.x", this.speed);
        this.smallAsteroids.setAll("body.velocity.x", this.speed);
        this.tinyAsteroids.setAll("body.velocity.x", this.speed);
        
    },

    // method to spawn a large asteroid    
    spawnLargeAsteroid: function (){
        
        // find the first asteroid to not exist (one that is not currently on screen)
        var asteroid = this.largeAsteroids.getFirstExists(false);
        
        if (asteroid) { // check for null before spawning
            asteroid.reset(1024, Math.random() * 768); // random y range between 0 and 768
            asteroid.body.velocity.y = Math.random() * 40 - 20; // random velocity up and down
        }
    },
    
    // method to spawn a medium asteroid (refer to large asteroid spawner)
    spawnStandardAsteroid: function (){
        
        var asteroid = this.standardAsteroids.getFirstExists(false);
        
        if (asteroid) { 
            asteroid.reset(1024, Math.random() * 768); 
            asteroid.body.velocity.y = Math.random() * 40 - 20; 
        }
    },
    
    // method to spawn small asteroids (refer to large asteroid spawner)
    spawnSmallAsteroid: function (){
        
        var asteroid = this.smallAsteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    },
    
    // method to spawn tiny asteroids (refer to large asteroid spawner)
    spawnTinyAsteroid: function (){
        
        var asteroid = this.tinyAsteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    }
    

    
}