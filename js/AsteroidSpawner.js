Game.AsteroidSpawner = function (game) {
    
    this.game = game;
//    this.asteroids = null;
    this.largeAsteroids = null;
    this.standardAsteroids = null;
    this.smallAsteroids = null;
    this.tinyAsteroids = null;
    this.mines = null;
    this.speed = null;
    
}

Game.AsteroidSpawner.prototype = {
    
    init: function () {
//        this.asteroids = this.game.add.group();
//        this.asteroids.enableBody = true;
//        this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
//        
//        for (var i = 0; i < 60; i++) {
//            var a = this.asteroids.create(0, 0, 'asteroid');
//            a.name = 'asteroid' + i;
//            a.exists = false;
//            a.visible = false;
//            a.anchor.set(0.5,0.5);
//            var mass = Math.random() * 1.5 - 0.25;
//            a.scale.x = mass;
//            a.scale.y = mass;
//            a.body.setSize(a.width * 0.9, a.height * 0.9);
//            a.body.bounce.setTo(1,1);
//            a.body.allowRotation = true;
//            a.checkWorldBounds = true;
//            a.outOfBoundsKill = true;
//        }
        
        this.largeAsteroids = this.game.add.group();
        this.largeAsteroids.enableBody = true;
        this.largeAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 30; i++) {
            var a = this.largeAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * (1.4 - 1.1) + 1.1;
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        this.standardAsteroids = this.game.add.group();
        this.standardAsteroids.enableBody = true;
        this.standardAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 30; i++) {
            var a = this.standardAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * (.9 - 0.6) + 0.6;
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        this.smallAsteroids = this.game.add.group();
        this.smallAsteroids.enableBody = true;
        this.smallAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 100; i++) {
            var a = this.smallAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * (0.7) + 0.2;
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        this.tinyAsteroids = this.game.add.group();
        this.tinyAsteroids.enableBody = true;
        this.tinyAsteroids.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 100; i++) {
            var a = this.tinyAsteroids.create(0, 0, 'asteroid');
            a.name = 'asteroid' + i;
            a.exists = false;
            a.visible = false;
            a.anchor.set(0.5,0.5);
            var mass = Math.random() * 0.2 - 0.2;
            a.scale.x = mass;
            a.scale.y = mass;
            a.body.setSize(a.width * 0.9, a.height * 0.9);
            a.body.bounce.setTo(1,1);
            a.body.allowRotation = true;
            a.checkWorldBounds = true;
            a.outOfBoundsKill = true;
        }
        
        this.mines = [];
        
        for(var i = 0; i < 10; i++){
            var mine = new Game.ExplosiveMine(this.game);
            mine.name = 'mine'+i;
            mine.exists = false;
            mine.visible = false;
            
            mine.checkWorldBounds = true;
            mine.outOfBoundsKill = true;
            this.mines.push(mine);
        }
        
        this.speed = -250;
    },
    
    update: function () {
//        this.asteroids.setAll("body.velocity.x", this.speed);
        this.largeAsteroids.setAll("body.velocity.x", this.speed);
        this.standardAsteroids.setAll("body.velocity.x", this.speed);
        this.smallAsteroids.setAll("body.velocity.x", this.speed);
        this.tinyAsteroids.setAll("body.velocity.x", this.speed);

        //The Mine speed loop; If the mine isn't in pursuit of the player,
        //then it drifts slowly to the left.
        for(var i = 0; i < this.mines.length; i++){
            
            if(this.mines[i].exists && !this.mines[i].targetAcquired){
                this.mines[i].sprite.body.velocity.x = this.speed;
            }
            
        }
        
        
        
    },
    
//    spawnAsteroid: function (){
//        
//        var asteroid = this.asteroids.getFirstExists(false);
//        
//        if (asteroid) {
//            asteroid.reset(1024, Math.random() * 768);
//            //asteroid.body.velocity.x = -250;
//            asteroid.body.velocity.y = Math.random() * 40 - 20;
//        }
//    },
    
    spawnLargeAsteroid: function (){
        
        var asteroid = this.largeAsteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    },
    
    spawnStandardAsteroid: function (){
        
        var asteroid = this.standardAsteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    },
    
    spawnSmallAsteroid: function (){
        
        var asteroid = this.smallAsteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    },
    
    spawnTinyAsteroid: function (){
        
        var asteroid = this.tinyAsteroids.getFirstExists(false);
        
        if (asteroid) {
            asteroid.reset(1024, Math.random() * 768);
            asteroid.body.velocity.y = Math.random() * 40 - 20;
        }
    },
    
    spawnExplosiveMine: function(){
        
        var explosiveMine;
        for(var i = 0; i < this.mines.length; i++){
            if(!this.mines[i].exists){
                this.mines[i].exists = true;
                this.mines[i].add(1024, Math.random() * 768);
                //console.log("Spawned explosivemine at "+this.mines[i].initX+" "+ this.mines[i].initY);
            
                return;
                
            }
        }
        
    }
    

    
}