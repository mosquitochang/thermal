noise.seed(Math.random());

var shaderFrag = `
	precision mediump float;

	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;

	// #define C_0 vec3(0.0000,0.0000,0.0039)
	#define C_0 vec3(0.0035,0.0019,0.2247)
	#define C_1 vec3(0.0000,0.3137,0.6118)
	#define C_2 vec3(0.0000,0.6588,0.8549)
	#define C_3 vec3(0.0980,0.9333,0.6588)
	#define C_4 vec3(0.4275,0.9333,0.1804)
	#define C_5 vec3(0.7882,0.9882,0.0000)
	#define C_6 vec3(1.0000,0.9843,0.0000)
	#define C_7 vec3(1.0000,0.7686,0.0000)
	#define C_8 vec3(1.0000,0.3529,0.0000)
	#define C_9 vec3(1.0000,0.2118,0.2000)
	#define C_10 vec3(1.0000,0.9569,0.9686)

	// #define C_0 vec3(0.0000,0.0353,0.0745)
	// #define C_1 vec3(0.0000,0.0353,0.0784)
	// #define C_2 vec3(0.2431,0.0000,0.5647)
	// #define C_3 vec3(0.5294,0.0000,0.6353)
	// #define C_4 vec3(0.8118,0.0000,0.5608)
	// #define C_5 vec3(0.9569,0.1176,0.3176)
	// #define C_6 vec3(1.0000,0.3804,0.0000)
	// #define C_7 vec3(1.0000,0.5843,0.0000)
	// #define C_8 vec3(1.0000,0.7686,0.0000)
	// #define C_9 vec3(1.0000,0.9333,0.1608)
	// #define C_10 vec3(1.0000,1.0000,0.9529)


	void main(void)
	{
		vec4 fg = texture2D(uSampler, vTextureCoord);


		// fg.r = fg.r * fg.a;
		// fg.g = fg.g * fg.a;
		// fg.b = fg.b * fg.a;

		// fg.a = 1.0;
		

		float gray = (fg.r+fg.g+fg.b)/3.0;

		float grayPercent = (gray - (0.1 * floor(gray/0.1)))*10.0;

		vec3 mixedColor;

		if(gray < 0.1) {
			mixedColor = mix(C_10, C_9, grayPercent);
		} else if (gray < 0.2) {
			mixedColor = mix(C_9, C_8, grayPercent);
		} else if (gray < 0.3) {
			mixedColor = mix(C_8, C_7, grayPercent);
		} else if (gray < 0.4) {
			mixedColor = mix(C_7, C_6, grayPercent);
		} else if (gray < 0.5) {
			mixedColor = mix(C_6, C_5, grayPercent);
		} else if (gray < 0.6) {
			mixedColor = mix(C_5, C_4, grayPercent);
		} else if (gray < 0.7) {
			mixedColor = mix(C_4, C_3, grayPercent);
		} else if (gray < 0.8) {
			mixedColor = mix(C_3, C_2, grayPercent);
		} else if (gray < 0.9) {
			mixedColor = mix(C_2, C_1, grayPercent);
		} else if (gray <= 1.0) {
			mixedColor = mix(C_1, C_0, grayPercent);
		}

		fg.r = mixedColor[0];
		fg.g = mixedColor[1];
		fg.b = mixedColor[2];

		gl_FragColor = fg;
		if(gl_FragColor.a < 1.0) discard;
	}
`;
var filter = new PIXI.Filter(null, shaderFrag);



var shaderFrag = `
	precision mediump float;

	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;

	// #define C_0 vec3(0.1607,0.0000,0.2666)
	// #define C_1 vec3(0.4313,0.0000,0.7098)

	#define C_0 vec3(0.1,0.0,0.2)
	#define C_1 vec3(0.8,0.0,0.9)


	void main(void)
	{
		vec4 fg = texture2D(uSampler, vTextureCoord);		

		float gray = (fg.r+fg.g+fg.b)/3.0;

		vec3 mixedColor;

		mixedColor = mix(C_1, C_0, gray);

		fg.r = mixedColor[0];
		fg.g = mixedColor[1];
		fg.b = mixedColor[2];

		gl_FragColor = fg;
		if(gl_FragColor.a < 1.0) discard;
	}
`;
var bgfilter = new PIXI.Filter(null, shaderFrag);





var thermalObjects = [];

//pixi本體
var app = new PIXI.Application($(".screen").width(), $(".screen").height(), { view: $(".screen")[0], transparent: true });

var crt = new PIXI.filters.CRTFilter({
	curvature: 5,
	lineWidth: 1,
	lineContrast: 0.2,
	noise: 0.15,
	vignetting: 0.4,
	vignettingAlpha: 0.7
})

// app.stage.filters = [crt];



var backgroundLayer = new PIXI.Container();
app.stage.addChild(backgroundLayer);

var frontLayer = new PIXI.Container();
app.stage.addChild(frontLayer);

backgroundLayer.filters = [filter];
frontLayer.filters = [filter];

PIXI.loader
    .add('assets/images/h3.png')
    .load(init);

var shadowSprite;
var realSprite;
function init() {
	shadowSprite = PIXI.Sprite.fromImage("assets/images/h3.png");
	// backgroundLayer.addChild(shadowSprite);

	shadowSprite.anchor.set(0.5);
	var ratio = shadowSprite.width / shadowSprite.height;
	shadowSprite.height = app.screen.height;
	shadowSprite.width = app.screen.height * ratio;
	shadowSprite.x = app.screen.width / 2;
	shadowSprite.y = app.screen.height / 2;
	shadowSprite.alpha = 0.6;

	realSprite = PIXI.Sprite.fromImage("assets/images/h3.png");
	// frontLayer.addChild(realSprite);

	realSprite.anchor.set(0.5);
	var ratio = realSprite.width / realSprite.height;
	realSprite.height = app.screen.height;
	realSprite.width = app.screen.height * ratio;
	realSprite.x = app.screen.width / 2;
	realSprite.y = app.screen.height / 2;
	realSprite.alpha = 1;

	noiseSprite.anchor.set(0.5);
	noiseSprite.width = noiseSprite.height = Math.max(app.screen.width,app.screen.height)
	noiseSprite.x = app.screen.width / 2;
	noiseSprite.y = app.screen.height / 2;
	// frontLayer.addChild(noiseSprite);

	// frontLayer.addChild(mouseHeatSprite);
}



var noiseMap;

//bg
var backgroundCanvas = $("<canvas>")[0];
var backgroundCtx = backgroundCanvas.getContext("2d");
backgroundCanvas.width = backgroundCanvas.height = 500;

var backgroundTexture = PIXI.BaseTexture.fromCanvas(backgroundCanvas);
var backgroundSprite = PIXI.Sprite.from(backgroundTexture);
backgroundLayer.addChild(backgroundSprite);

backgroundSprite.width = $(".screen").width()*3;
backgroundSprite.height = $(".screen").height();

//noise
var noiseCanvas = $("<canvas>")[0];
var noiseCtx = noiseCanvas.getContext("2d");
noiseCanvas.width = noiseCanvas.height = 500;

var noiseTexture = PIXI.BaseTexture.fromCanvas(noiseCanvas);
var noiseSprite = PIXI.Sprite.from(noiseTexture);

//heat
var mouseHeat = new MouseHeat();
var mouseHeatTexture = PIXI.BaseTexture.fromCanvas(mouseHeat.view);
var mouseHeatSprite = PIXI.Sprite.from(mouseHeatTexture);


$("body").on("mousemove", function(e) {
	mouseHeat.mouseMove(e);
})

var el = $("body")[0];

el.addEventListener("touchstart", function(e){
	mouseHeat.mouseMove(e.targetTouches[0]);
}, false);

el.addEventListener("touchmove", function(e){
	mouseHeat.mouseMove(e.targetTouches[0]);
}, false);


// $("body").on("keypress", function(e) {
// 	if(e.which == 122) {
// 		var nowX = app.stage.x;
// 		TweenMax.to(thermal1.pixiApp.stage,1,{x:nowX-$(".screen").width()});
// 	} else if(e.which == 120) {
// 		var nowX = thermal1.pixiApp.stage.x;
// 		TweenMax.to(thermal1.pixiApp.stage,1,{x:nowX+$(".screen").width()});
// 	}
// })


$(window).on("resize", function() {
	app.renderer.resize($(".screen").width(), $(".screen").height());

	backgroundSprite.width = app.screen.width * 3;
	backgroundSprite.height = app.screen.height;

	var ratio = shadowSprite.width / shadowSprite.height;
	shadowSprite.height = app.screen.height;
	shadowSprite.width = app.screen.height * ratio;
	shadowSprite.x = app.screen.width / 2;
	shadowSprite.y = app.screen.height / 2;

	var ratio = realSprite.width / realSprite.height;
	realSprite.height = app.screen.height;
	realSprite.width = app.screen.height * ratio;
	realSprite.x = app.screen.width / 2;
	realSprite.y = app.screen.height / 2;

	noiseSprite.width = noiseSprite.height = Math.max(app.screen.width,app.screen.height);
	noiseSprite.x = app.screen.width / 2;
	noiseSprite.y = app.screen.height / 2;

	mouseHeatSprite.width = app.screen.width;
	mouseHeatSprite.height = app.screen.height;

	mouseHeat.resize();

})


var time = 0;
app.ticker.add(function(delta) {
	noiseMap = getPerlinNoiseImage(500,500,0.1,1,1,time);

	backgroundCtx.fillStyle = "#fff";
	backgroundCtx.fillRect(0,0,backgroundCanvas.width,backgroundCanvas.height);

	backgroundCtx.globalAlpha = 0.15;
	backgroundCtx.drawImage(noiseMap,0,0,backgroundCanvas.width,backgroundCanvas.height);
	backgroundCtx.globalAlpha = 1;

	noiseCtx.clearRect(0,0,noiseCanvas.width,noiseCanvas.height);
	noiseCtx.drawImage(noiseMap,0,0,noiseCanvas.width,noiseCanvas.height);

	backgroundTexture.update();
	noiseTexture.update();

	mouseHeat.update();
	mouseHeatTexture.update();

	time += 0.01;
});

function getPerlinNoiseImage(width,height,resolution,diff,scale,time) {
	var perlinNoiseImage = $("<canvas>")[0];
	var perlinNoiseCtx = perlinNoiseImage.getContext("2d");
	perlinNoiseImage.width = width*resolution;
	perlinNoiseImage.height = height*resolution;

	var perlinNoiseImageData = perlinNoiseCtx.createImageData(perlinNoiseImage.width,perlinNoiseImage.height);

	for (var x = 0; x < perlinNoiseImage.width; x++) {
	  for (var y = 0; y < perlinNoiseImage.height; y++) {
	  	var value = noise.perlin3(x / (50*resolution*diff), y / (50*resolution*diff), time);

	  	value = (1.6+value) * 30 * scale;

	  	var cell = (x + y * perlinNoiseImage.width) * 4;
	  	perlinNoiseImageData.data[cell + 3] = value;
	  }
	}
	perlinNoiseCtx.putImageData(perlinNoiseImageData,0,0);

	var scaleUpCanvas = $("<canvas>")[0];
	var scaleUpCtx = scaleUpCanvas.getContext("2d");
	scaleUpCanvas.width = width;
	scaleUpCanvas.height = height;
	scaleUpCtx.scale(1/resolution,1/resolution);
	scaleUpCtx.drawImage(perlinNoiseImage, 0, 0);

	return scaleUpCanvas;
}

function MouseHeat() {
	var _this = this;

	this.view = $("<canvas>")[0];
	this.viewCtx = this.view.getContext("2d");

	this.width = this.view.width = $(".screen").width();
	this.height = this.view.height = $(".screen").height();

	this.time = 0;

	this.update = function() {
		this.viewCtx.clearRect(0,0,this.width,this.height);


		for (var i = 0; i < this.heats.length; i++) {
			if(this.heats[i] !== undefined) {
				this.heats[i].draw();
				this.heats[i].lifeCount();
			}
		}

		this.time += 0.02;
	}

	this.resize = function() {
		this.width = this.view.width = $(".screen").width();
		this.height = this.view.height = $(".screen").height();
	}

	this.heats = [];

	this.lastPoint = undefined;

	this.mouseMove = function(e) {
		var currentPoint = { 
			x: e.pageX - $(".screen").offset().left, 
			y: e.pageY - $(".screen").offset().top
		};

		if(this.lastPoint !== undefined) {
			var dist = distanceBetween(this.lastPoint, currentPoint);
			var angle = angleBetween(this.lastPoint, currentPoint);

			for (var i = 0; i < dist; i+=15) {

				var x = this.lastPoint.x + (Math.sin(angle) * i);
				var y = this.lastPoint.y + (Math.cos(angle) * i);

				var heat = new Heat(x,y,this.heats.length);
				this.heats.push(heat);
			}

			this.lastPoint = currentPoint;
		} else {
			var heat = new Heat(currentPoint.x,currentPoint.y,this.heats.length);
			this.heats.push(heat);

			this.lastPoint = currentPoint;
		}
	}

	function distanceBetween(point1, point2) {
	  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}
	function angleBetween(point1, point2) {
	  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
	}

	function Heat(x,y,index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.life = 30;
		this.wave = 0;

		this.draw = function() {
			var innerRadius = 5;
			var outerRadius = Math.max(70*this.life/30 + 30, 0);
			// var radius = 70*this.life/60 + 30;
			var alpha = 0.15*this.life/30;
			if(this.index == _this.heats.length - 1) {
				outerRadius = radius = 100+this.wave;
				alpha = 0.7+this.wave/100;
			}

			var gradient = _this.viewCtx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
			gradient.addColorStop(0, 'rgba(0,0,0,'+alpha+')');
			gradient.addColorStop(0.7, 'rgba(0,0,0,'+alpha/4+')');
			gradient.addColorStop(1, 'rgba(0,0,0,0)');

			_this.viewCtx.beginPath();
			_this.viewCtx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
			_this.viewCtx.fillStyle = gradient;
			_this.viewCtx.fill();
		}

		this.lifeCount = function() {
			this.life--;
			this.wave = Math.sin(_this.time) * 6;

			if(this.life <= 0) {
				if(this.index != _this.heats.length - 1) {
					this.dispose();
				}
			}
		}

		this.dispose = function() {
			_this.heats[this.index] = undefined;
		}
	}
}





















var thermals = [];

// var thermal1 = new Thermal({
// 	target: $(".screen")[0],
// 	src: "assets/images/h2.png",
// 	debug: false
// })
// thermals.push(thermal1);

// var thermal2 = new Thermal({
// 	target: $(".canvas-banana")[0],
// 	src: "assets/images/b.png",
// 	debug: false
// })
// thermals.push(thermal2);

// var thermal3 = new Thermal({
// 	target: $(".canvas-banana2")[0],
// 	src: "assets/images/b.png",
// 	debug: false
// })
// thermals.push(thermal3);


// function draw() {
// 	requestAnimationFrame(draw);

// 	for (var i = 0; i < thermals.length; i++) {
// 		thermals[i].update();
// 	}
// }
// draw();

// $("body").on("mousemove", function(e) {
// 	// thermals[0].mouseMove(e);
// 	for (var i = 0; i < thermals.length; i++) {
// 		thermals[i].mouseMove(e);
// 	}
// })

// var el = $("body")[0];

// el.addEventListener("touchstart touchmove", function(e){
// 	e.preventDefault();
// 	for (var i = 0; i < thermals.length; i++) {
// 		thermals[i].mouseMove(e.targetTouches[0]);
// 	}
// }, false);

// $(window).on("resize", function() {
// 	for (var i = 0; i < thermals.length; i++) {
// 		thermals[i].resize();
// 	}
// })

// $("body").on("keypress", function(e) {
// 	if(e.which == 122) {
// 		var nowX = thermal1.pixiApp.stage.x;
// 		TweenMax.to(thermal1.pixiApp.stage,1,{x:nowX-$(".screen").width()});
// 	} else if(e.which == 120) {
// 		var nowX = thermal1.pixiApp.stage.x;
// 		TweenMax.to(thermal1.pixiApp.stage,1,{x:nowX+$(".screen").width()});
// 	}
// })


function Thermal(option) {
	var _this = this;

	this.targetCanvas = option.target;

	this.processCanvas = $("<canvas>")[0];
	this.processCtx = this.processCanvas.getContext("2d");

	this.backgroundCanvas = $("<canvas>")[0];
	this.backgroundCtx = this.backgroundCanvas.getContext("2d");
	this.backgroundCanvas.width = $(".screen").width()*3;
	this.backgroundCanvas.height = $(".screen").height();

	//pixi本體
	this.pixiApp = new PIXI.Application($(".screen").width(), $(".screen").height(), { view: this.targetCanvas, transparent: true });
	this.processTexture = PIXI.BaseTexture.fromCanvas(this.processCanvas);
	this.processSprite = PIXI.Sprite.from(this.processTexture);

	this.backgroundTexture = PIXI.BaseTexture.fromCanvas(this.backgroundCanvas);
	this.backgroundSprite = PIXI.Sprite.from(this.backgroundTexture);
	this.pixiApp.stage.addChild(this.backgroundSprite);

	//pixi shader
	// var pixelate = new PIXI.filters.BlurFilter(100,50);
	// this.pixiApp.stage.filters = [filter];

	var crt = new PIXI.filters.CRTFilter({
		curvature: 5,
		lineWidth: 1,
		lineContrast: 0.2,
		noise: 0.15,
		vignetting: 0.4,
		vignettingAlpha: 0.7
	})

	this.backgroundSprite.filters = [filter];
	this.processSprite.filters = [filter];

	this.pixiApp.stage.filters = [crt];
	
	this.width = this.height = undefined;

	this.debug = option.debug || false;

	this.time = 0;

	this.imageSourse = new Image();
	this.imageSourse.onload = init;
	this.imageSourse.src = option.src;

	this.isLoaded = false;

	function init() {
		// _this.width = _this.targetCanvas.width = _this.processCanvas.width = _this.imageSourse.width;
		// _this.height = _this.targetCanvas.height = _this.processCanvas.height = _this.imageSourse.height;
		_this.width = _this.processCanvas.width = _this.imageSourse.width;
		_this.height = _this.processCanvas.height = _this.imageSourse.height;

		_this.processTexture.update();

		_this.processSprite.anchor.set(0.5);
		_this.processSprite.scale.x = _this.pixiApp.screen.height / _this.imageSourse.height;
		_this.processSprite.scale.y = _this.pixiApp.screen.height / _this.imageSourse.height;
		_this.processSprite.x = _this.pixiApp.screen.width / 2;
		_this.processSprite.y = _this.pixiApp.screen.height / 2;
		_this.pixiApp.stage.addChild(_this.processSprite);

		// _this.pixiApp.renderer.resize(_this.width,_this.height);

		_this.isLoaded = true;

		_this.update();
	}

	this.resize = function() {
		_this.pixiApp.renderer.resize($(".screen").width(), $(".screen").height());
		_this.processSprite.scale.x = _this.pixiApp.screen.height / _this.imageSourse.height;
		_this.processSprite.scale.y = _this.pixiApp.screen.height / _this.imageSourse.height;
		_this.processSprite.x = _this.pixiApp.screen.width / 2;
		_this.processSprite.y = _this.pixiApp.screen.height / 2;

		_this.backgroundCanvas.width = $(".screen").width()*3;
		_this.backgroundCanvas.height = $(".screen").height();
	}

	this.update = function() {
		if(!this.isLoaded) return;


		// this.processCtx.fillStyle = "#fff";
		// this.processCtx.fillRect(0,0,this.width,this.height);
		this.processCtx.clearRect(0,0,this.width,this.height);
		this.processCtx.drawImage(this.imageSourse,0,0);

		var noiseMap = getPerlinNoiseImage(500,500,0.1,1,1,this.time/2);
		this.processCtx.globalCompositeOperation = "source-atop";
		this.processCtx.drawImage(noiseMap,0,0,this.width,this.height);
		this.processCtx.globalCompositeOperation = "source-out";

		// this.processCtx.drawImage(this.imageSourse,0,0);


		// var noiseMap = getPerlinNoiseImage(this.backgroundCanvas.width/2,this.backgroundCanvas.height/2,0.1,0.8,0.5,this.time/10);
		this.backgroundCtx.fillStyle = "#fff";
		this.backgroundCtx.fillRect(0,0,this.backgroundCanvas.width,this.backgroundCanvas.height);

		this.backgroundCtx.globalAlpha = 0.6;
		this.backgroundCtx.drawImage(this.imageSourse,(this.processSprite.x - this.processSprite.width/2 + 0),(this.processSprite.y - this.processSprite.height/2 + 0),this.processSprite.width - 0,this.processSprite.height - 0);
		this.backgroundCtx.globalAlpha = 0.6;
		this.backgroundCtx.drawImage(noiseMap,0,0,this.backgroundCanvas.width,this.backgroundCanvas.height);
		this.backgroundCtx.globalAlpha = 1;

		for (var i = 0; i < this.heats.length; i++) {
			if(this.heats[i] !== undefined) {
				this.heats[i].draw();
				this.heats[i].lifeCount();
			}
		}

		this.processTexture.update();
		this.backgroundTexture.update();

		this.time += 0.02;

		// crt.time = this.time;
		crt.seed = Math.random();
	}

	this.heats = [];

	this.lastPoint = undefined;

	this.mouseMove = function(e) {
		if(!this.isLoaded) return;

		// var currentPoint = { 
		// 	x: (e.pageX-$(option.target).offset().left) * (this.width/$(option.target).width()), 
		// 	y: (e.pageY-$(option.target).offset().top) * (this.height/$(option.target).height())
		// };

		var currentPoint = { 
			x: (e.pageX - $(".screen").offset().left -  (this.processSprite.x - this.processSprite.width/2)) / this.processSprite.scale.x, 
			y: (e.pageY - $(".screen").offset().top - (this.processSprite.y - this.processSprite.height/2)) / this.processSprite.scale.y
		};

		if(this.lastPoint !== undefined) {
			var dist = distanceBetween(this.lastPoint, currentPoint);
			var angle = angleBetween(this.lastPoint, currentPoint);

			for (var i = 0; i < dist; i+=15) {

				var x = this.lastPoint.x + (Math.sin(angle) * i);
				var y = this.lastPoint.y + (Math.cos(angle) * i);

				var heat = new Heat(x,y,this.heats.length);
				this.heats.push(heat);
			}

			this.lastPoint = currentPoint;
		} else {
			var heat = new Heat(currentPoint.x,currentPoint.y,this.heats.length);
			this.heats.push(heat);

			this.lastPoint = currentPoint;
		}
	}

	function distanceBetween(point1, point2) {
	  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}
	function angleBetween(point1, point2) {
	  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
	}

	function Heat(x,y,index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.life = 30;
		this.wave = 0;

		this.draw = function() {
			var innerRadius = 5;
			var outerRadius = Math.max(70*this.life/30 + 30, 0);
			// var radius = 70*this.life/60 + 30;
			var alpha = 0.15*this.life/30;
			if(this.index == _this.heats.length - 1) {
				outerRadius = radius = 150+this.wave;
				alpha = 0.7+this.wave/100;
			}

			var gradient = _this.processCtx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
			gradient.addColorStop(0, 'rgba(0,0,0,'+alpha+')');
			gradient.addColorStop(0.7, 'rgba(0,0,0,'+alpha/4+')');
			gradient.addColorStop(1, 'rgba(0,0,0,0)');

			_this.processCtx.globalCompositeOperation = "source-atop";
			_this.processCtx.beginPath();
			_this.processCtx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
			_this.processCtx.fillStyle = gradient;
			_this.processCtx.fill();
			_this.processCtx.globalCompositeOperation = "source-out";

			// _this.backgroundCtx.globalAlpha = 0.1;
			// _this.backgroundCtx.beginPath();
			// _this.backgroundCtx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
			// _this.backgroundCtx.fillStyle = gradient;
			// _this.backgroundCtx.fill();
			// _this.backgroundCtx.globalAlpha = 1;
		}

		this.lifeCount = function() {
			this.life--;
			this.wave = Math.sin(_this.time) * 6;

			if(this.life <= 0) {
				if(this.index != _this.heats.length - 1) {
					this.dispose();
				}
			}
		}

		this.dispose = function() {
			_this.heats[this.index] = undefined;
		}
	}

	function getPerlinNoiseImage(width,height,resolution,diff,scale,time) {
		var perlinNoiseImage = $("<canvas>")[0];
		var perlinNoiseCtx = perlinNoiseImage.getContext("2d");
		perlinNoiseImage.width = width*resolution;
		perlinNoiseImage.height = height*resolution;

		var perlinNoiseImageData = perlinNoiseCtx.createImageData(perlinNoiseImage.width,perlinNoiseImage.height);

		for (var x = 0; x < perlinNoiseImage.width; x++) {
		  for (var y = 0; y < perlinNoiseImage.height; y++) {
		  	var value = noise.perlin3(x / (50*resolution*diff), y / (50*resolution*diff), time);

		  	value = (1.6+value) * 30 * scale;

		  	var cell = (x + y * perlinNoiseImage.width) * 4;
		  	perlinNoiseImageData.data[cell + 3] = value;
		  }
		}
		perlinNoiseCtx.putImageData(perlinNoiseImageData,0,0);

		var scaleUpCanvas = $("<canvas>")[0];
		var scaleUpCtx = scaleUpCanvas.getContext("2d");
		scaleUpCanvas.width = width;
		scaleUpCanvas.height = height;
		scaleUpCtx.scale(1/resolution,1/resolution);
		scaleUpCtx.drawImage(perlinNoiseImage, 0, 0);

		return scaleUpCanvas;
	}
}

//stat
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()


