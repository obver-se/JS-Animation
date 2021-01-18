var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("carSprites.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

	gameEngine.init(ctx);

    gameEngine.addEntity(new BackDrop(gameEngine));
    gameEngine.addEntity(new Car(gameEngine, 200, 200));

	gameEngine.start();
});
