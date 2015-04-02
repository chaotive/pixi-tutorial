function Main() {
	console.log("init() successfully called.");
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = PIXI.autoDetectRenderer(
		512,
		384,
		{view:document.getElementById("game-canvas")}
	);

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

	this.scroller = new Scroller(this.stage);

	//renderer.render(stage);		  
	requestAnimFrame(this.update.bind(this));
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {  
  //far.position.x -= 0.128;
  //scroller.update();		  
  this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};