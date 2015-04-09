function Main() {
	console.log("init() successfully called.");
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = PIXI.autoDetectRenderer(
		512,
		384,
		{view:document.getElementById("game-canvas")}
	);
	
	this.loadSpriteSheet();
	
	/*
	var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
	//far = new PIXI.Sprite(farTexture);
	far = new PIXI.TilingSprite(farTexture, 512, 256);		  
	far.position.x = 0;
	far.position.y = 0;
	far.tilePosition.x = 0;
	far.tilePosition.y = 0;
	stage.addChild(far);
	*/

}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {  
  //far.position.x -= 0.128;
  //scroller.update();		  
  this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
  //var assetsToLoad = ["resources/wall.json"];
  var assetsToLoad = ["resources/wall.json", "resources/bg-mid.png", 
	"resources/bg-far.png"];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();
};

Main.prototype.spriteSheetLoaded = function() {	
	this.scroller = new Scroller(this.stage);
	//renderer.render(stage);		  
	requestAnimFrame(this.update.bind(this));
	
	//this.pool = new WallSpritesPool();
	//this.wallSlices = [];
  
	/*
	var slice1 = PIXI.Sprite.fromFrame("edge_01");
	slice1.position.x = 32;
	slice1.position.y = 64;
	this.stage.addChild(slice1);
	
	var slice2 = PIXI.Sprite.fromFrame("decoration_03");
	slice2.position.x = 128;
	slice2.position.y = 64;
	this.stage.addChild(slice2);
	*/
};

Main.prototype.borrowWallSprites = function(num) {
  for (var i = 0; i < num; i++)
  {
    //var sprite = this.pool.borrowWindow();
	if (i % 2 == 0) {
      var sprite = this.pool.borrowWindow();
    } else {
      var sprite = this.pool.borrowDecoration();
    }
    sprite.position.x = -32 + (i * 64);
    sprite.position.y = 128;

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};

Main.prototype.returnWallSprites = function() {
  for (var i = 0; i < this.wallSlices.length; i++)
  {
    var sprite = this.wallSlices[i];
    this.stage.removeChild(sprite);
    //this.pool.returnWindow(sprite);
	if (i % 2 == 0) {
      this.pool.returnWindow(sprite);
    } else {
      this.pool.returnDecoration(sprite);
    }
  }

  this.wallSlices = [];
};
