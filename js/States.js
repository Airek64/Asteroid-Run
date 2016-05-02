window.onload = function() {
	var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer');
	//	Add the States your game has.
	game.state.add('Boot', Game.Boot);
	game.state.add('Preloader', Game.Preloader);
	game.state.add('MainMenu', Game.MainMenu);
	game.state.add('Level1', Game.Level1);
    game.state.add('LevelComplete', Game.LevelComplete);
    game.state.add('Level2', Game.Level2);
    game.state.add('GameOver', Game.GameOver);
    game.state.add('Repair', Game.Repair);
    game.state.add('Store', Game.Store);
    game.state.add('Broker', Game.Broker);
	//	Start the Boot state.
	game.state.start('Boot');
};
