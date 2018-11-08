noise.seed(Math.random());
// var colors = [[0,0,1],[0,7,16],[0,15,31],[0,24,47],[0,31,63],[0,39,78],[0,47,94],[0,55,109],[0,63,125],[0,71,139],[0,80,156],[0,86,170],[0,95,186],[0,102,201],[0,111,216],[0,118,228],[0,130,225],[0,139,224],[0,150,222],[0,158,220],[0,168,218],[0,178,217],[0,189,215],[0,199,214],[0,208,212],[0,219,210],[0,228,208],[0,238,206],[7,238,194],[17,238,180],[25,238,168],[34,238,157],[41,238,144],[50,238,132],[58,238,120],[68,238,107],[76,238,94],[84,238,83],[93,238,70],[101,238,59],[109,238,46],[118,238,34],[127,238,21],[136,238,8],[144,239,0],[153,241,0],[163,244,0],[173,245,0],[183,248,0],[192,250,0],[201,252,0],[211,255,0],[222,255,0],[230,255,0],[240,255,0],[250,255,0],[255,255,0],[255,255,0],[255,255,0],[255,255,0],[255,251,0],[255,245,0],[255,240,0],[255,234,0],[255,229,0],[255,223,0],[255,218,0],[255,211,0],[255,206,0],[255,202,0],[255,196,0],[255,191,0],[255,185,0],[255,179,0],[255,167,0],[255,153,0],[255,141,0],[255,129,0],[255,116,0],[255,103,0],[255,90,0],[255,77,0],[255,65,0],[255,53,0],[255,40,0],[255,28,0],[255,14,0],[255,0,0],[255,16,11],[255,36,31],[255,54,51],[255,76,72],[255,94,92],[255,118,115],[255,136,135],[255,162,161],[255,182,181],[255,202,201],[255,220,216],[255,237,244]];

// colors.forEach((color) => {
// 	color[0] = color[0]/255;
// 	color[1] = color[1]/255;
// 	color[2] = color[2]/255;
// })

// var colors = [0,0,0.00392156862745098,0,0.027450980392156862,0.06274509803921569,0,0.058823529411764705,0.12156862745098039,0,0.09411764705882353,0.1843137254901961,0,0.12156862745098039,0.24705882352941178,0,0.15294117647058825,0.3058823529411765,0,0.1843137254901961,0.3686274509803922,0,0.21568627450980393,0.42745098039215684,0,0.24705882352941178,0.49019607843137253,0,0.2784313725490196,0.5450980392156862,0,0.3137254901960784,0.611764705882353,0,0.33725490196078434,0.6666666666666666,0,0.37254901960784315,0.7294117647058823,0,0.4,0.788235294117647,0,0.43529411764705883,0.8470588235294118,0,0.4627450980392157,0.8941176470588236,0,0.5098039215686274,0.8823529411764706,0,0.5450980392156862,0.8784313725490196,0,0.5882352941176471,0.8705882352941177,0,0.6196078431372549,0.8627450980392157,0,0.6588235294117647,0.8549019607843137,0,0.6980392156862745,0.8509803921568627,0,0.7411764705882353,0.8431372549019608,0,0.7803921568627451,0.8392156862745098,0,0.8156862745098039,0.8313725490196079,0,0.8588235294117647,0.8235294117647058,0,0.8941176470588236,0.8156862745098039,0,0.9333333333333333,0.807843137254902,0.027450980392156862,0.9333333333333333,0.7607843137254902,0.06666666666666667,0.9333333333333333,0.7058823529411765,0.09803921568627451,0.9333333333333333,0.6588235294117647,0.13333333333333333,0.9333333333333333,0.615686274509804,0.1607843137254902,0.9333333333333333,0.5647058823529412,0.19607843137254902,0.9333333333333333,0.5176470588235295,0.22745098039215686,0.9333333333333333,0.47058823529411764,0.26666666666666666,0.9333333333333333,0.4196078431372549,0.2980392156862745,0.9333333333333333,0.3686274509803922,0.32941176470588235,0.9333333333333333,0.3254901960784314,0.36470588235294116,0.9333333333333333,0.27450980392156865,0.396078431372549,0.9333333333333333,0.23137254901960785,0.42745098039215684,0.9333333333333333,0.1803921568627451,0.4627450980392157,0.9333333333333333,0.13333333333333333,0.4980392156862745,0.9333333333333333,0.08235294117647059,0.5333333333333333,0.9333333333333333,0.03137254901960784,0.5647058823529412,0.9372549019607843,0,0.6,0.9450980392156862,0,0.6392156862745098,0.9568627450980393,0,0.6784313725490196,0.9607843137254902,0,0.7176470588235294,0.9725490196078431,0,0.7529411764705882,0.9803921568627451,0,0.788235294117647,0.9882352941176471,0,0.8274509803921568,1,0,0.8705882352941177,1,0,0.9019607843137255,1,0,0.9411764705882353,1,0,0.9803921568627451,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0.984313725490196,0,1,0.9607843137254902,0,1,0.9411764705882353,0,1,0.9176470588235294,0,1,0.8980392156862745,0,1,0.8745098039215686,0,1,0.8549019607843137,0,1,0.8274509803921568,0,1,0.807843137254902,0,1,0.792156862745098,0,1,0.7686274509803922,0,1,0.7490196078431373,0,1,0.7254901960784313,0,1,0.7019607843137254,0,1,0.6549019607843137,0,1,0.6,0,1,0.5529411764705883,0,1,0.5058823529411764,0,1,0.4549019607843137,0,1,0.403921568627451,0,1,0.35294117647058826,0,1,0.30196078431372547,0,1,0.2549019607843137,0,1,0.20784313725490197,0,1,0.1568627450980392,0,1,0.10980392156862745,0,1,0.054901960784313725,0,1,0,0,1,0.06274509803921569,0.043137254901960784,1,0.1411764705882353,0.12156862745098039,1,0.21176470588235294,0.2,1,0.2980392156862745,0.2823529411764706,1,0.3686274509803922,0.3607843137254902,1,0.4627450980392157,0.45098039215686275,1,0.5333333333333333,0.5294117647058824,1,0.6352941176470588,0.6313725490196078,1,0.7137254901960784,0.7098039215686275,1,0.792156862745098,0.788235294117647,1,0.8627450980392157,0.8470588235294118,1,0.9294117647058824,0.9568627450980393];

// console.log(JSON.stringify(_.flatten(colors)));


// var imgColors = new Image();
// imgColors.onload = function () {
// 	var canvasColors = document.createElement("canvas");
// 	var ctxColors = canvasColors.getContext("2d");
// 	var w = imgColors.width;
// 	var h = imgColors.height;
// 	canvasColors.width = w;
// 	canvasColors.height = h;
// 	ctxColors.drawImage(imgColors,0,0);

// 	var imageData = ctxColors.getImageData(0,0,w,h);

// 	for (var i = 0; i < w*4; i+=4) {
// 		// var color = tinycolor({r:imageData.data[i], g:imageData.data[i+1], b:imageData.data[i+2]});
// 		var color = [ imageData.data[i], imageData.data[i+1], imageData.data[i+2] ];
// 		colors.push(color);
// }
// 	console.log(JSON.stringify(colors));
// }
// imgColors.src = "assets/images/color-mini.png";

// var scaleUpCanvas = $("<canvas>")[0];
// var scaleUpCtx = scaleUpCanvas.getContext("2d");


// var app = new PIXI.Application(800, 800, { transparent: true });
// document.body.appendChild(app.view);

// // create a new Sprite from an image path
// var bunny = PIXI.Sprite.fromImage('assets/images/hand-gray2.png');

// updatePerlinNoiseImage(800,800,0.1,0);
// var noiseTexture = PIXI.BaseTexture.fromCanvas(scaleUpCanvas);
// var noiseSprite = PIXI.Sprite.from(noiseTexture);

// bunny.anchor.set(0.5);
// bunny.x = app.screen.width / 2;
// bunny.y = app.screen.height / 2;

// app.stage.addChild(bunny);
// app.stage.addChild(noiseSprite);

// app.stop();

// PIXI.loader.add('shader', 'assets/scripts/shader.frag')
//     .load(onLoaded);

// var filter;

// // Handle the load completed
// function onLoaded (loader,res) {
//     filter = new PIXI.Filter(null, res.shader.data);
//     app.stage.filters = [filter];
//     filter.uniforms.colors = colors;
//     app.start();
// }

// var counter = 0;

// // Animate the filter
// app.ticker.add(function(delta) {
//     updatePerlinNoiseImage(800,800,0.1,counter/100);
//     noiseTexture.update();

//     counter++;
// });



// function updatePerlinNoiseImage(width,height,resolution,time) {
// 	var perlinNoiseImage = $("<canvas>")[0];
// 	var perlinNoiseCtx = perlinNoiseImage.getContext("2d");
// 	perlinNoiseImage.width = width*resolution;
// 	perlinNoiseImage.height = height*resolution;

// 	var perlinNoiseImageData = perlinNoiseCtx.createImageData(perlinNoiseImage.width,perlinNoiseImage.height);


// 	for (var x = 0; x < perlinNoiseImage.width; x++) {
// 	  for (var y = 0; y < perlinNoiseImage.height; y++) {
// 	  	var value = noise.perlin3(x / (50*resolution), y / (50*resolution), time);

// 	  	value = (1.6+value) * 30;

// 	  	var cell = (x + y * perlinNoiseImage.width) * 4;
// 	  	perlinNoiseImageData.data[cell + 3] = value;
// 	  }
// 	}
// 	perlinNoiseCtx.putImageData(perlinNoiseImageData,0,0);

// 	// var scaleUpCanvas = $("<canvas>")[0];
// 	// var scaleUpCtx = scaleUpCanvas.getContext("2d");
// 	scaleUpCanvas.width = width;
// 	scaleUpCanvas.height = height;
// 	scaleUpCtx.scale(1/resolution,1/resolution);
// 	scaleUpCtx.drawImage(perlinNoiseImage, 0, 0);

// 	// return scaleUpCanvas;
// }


// var filter;
// PIXI.loader.add('shader', 'assets/scripts/shader.frag').load(shaderOnLoad);
// function shaderOnLoad(loader,res) {
//     filter = new PIXI.Filter(null, res.shader.data);
//     filter.uniforms.colors = colors;
// }

var shaderFrag = `
	precision mediump float;

	varying vec2 vTextureCoord;

	uniform sampler2D uSampler;

	// uniform float colors[300];

	#define C_0 vec4(0.0000,0.0000,0.0039, 1.0)
	#define C_1 vec4(0.0000,0.3137,0.6118, 1.0)
	#define C_2 vec4(0.0000,0.6588,0.8549, 1.0)
	#define C_3 vec4(0.0980,0.9333,0.6588, 1.0)
	#define C_4 vec4(0.4275,0.9333,0.1804, 1.0)
	#define C_5 vec4(0.7882,0.9882,0.0000, 1.0)
	#define C_6 vec4(1.0000,0.9843,0.0000, 1.0)
	#define C_7 vec4(1.0000,0.7686,0.0000, 1.0)
	#define C_8 vec4(1.0000,0.3529,0.0000, 1.0)
	#define C_9 vec4(1.0000,0.2118,0.2000, 1.0)
	#define C_10 vec4(1.0000,0.9569,0.9686, 1.0)


	void main(void)
	{
		vec4 fg = texture2D(uSampler, vTextureCoord);

		float gray = (fg.r+fg.g+fg.b)/3.0;

		float grayPercent = (gray - (0.1 * floor(gray/0.1)))*10.0;

		vec4 mixedColor;

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






var thermals = [];

var thermal1 = new Thermal({
	target: $(".canvas-hand")[0],
	src: "assets/images/hand-gray2.png",
	debug: false
})
thermals.push(thermal1);

var thermal2 = new Thermal({
	target: $(".canvas-banana")[0],
	src: "assets/images/b.png",
	debug: false
})
thermals.push(thermal2);

var thermal3 = new Thermal({
	target: $(".canvas-banana2")[0],
	src: "assets/images/b.png",
	debug: false
})
thermals.push(thermal3);


function draw() {
	requestAnimationFrame(draw);

	for (var i = 0; i < thermals.length; i++) {
		thermals[i].update();
	}
}
draw();

$("body").on("mousemove", function(e) {
	// thermals[0].mouseMove(e);
	for (var i = 0; i < thermals.length; i++) {
		thermals[i].mouseMove(e);
	}
})





function Thermal(option) {
	var _this = this;

	this.targetCanvas = option.target;

	this.processCanvas = $("<canvas>")[0];
	this.processCtx = this.processCanvas.getContext("2d");

	//pixi本體
	this.pixiApp = new PIXI.Application(1024, 1024, { view: this.targetCanvas, transparent: true });
	this.processTexture = PIXI.BaseTexture.fromCanvas(this.processCanvas);
	this.processSprite = PIXI.Sprite.from(this.processTexture);
	this.pixiApp.stage.addChild(this.processSprite);

	//pixi shader
	this.pixiApp.stage.filters = [filter];
	// filter.uniforms.colors = colors;
	
	this.width = this.height = undefined;

	this.debug = option.debug || false;

	this.time = 0;

	this.imageSourse = new Image();
	this.imageSourse.onload = init;
	this.imageSourse.src = option.src;

	this.isLoaded = false;

	function init() {
		_this.width = _this.targetCanvas.width = _this.processCanvas.width = _this.imageSourse.width;
		_this.height = _this.targetCanvas.height = _this.processCanvas.height = _this.imageSourse.height;

		_this.pixiApp.renderer.resize(_this.width,_this.height);

		_this.isLoaded = true;

		_this.update();
	}

	this.update = function() {
		if(!this.isLoaded) return;

		this.processCtx.clearRect(0,0,this.width,this.height);
		this.processCtx.drawImage(this.imageSourse,0,0);

		var noiseMap = getPerlinNoiseImage(500,500,0.1,this.time);
		this.processCtx.drawImage(noiseMap,0,0,this.width,this.height);

		for (var i = 0; i < this.heats.length; i++) {
			if(this.heats[i] !== undefined) {
				this.heats[i].draw();
				this.heats[i].lifeCount();
			}
		}

		this.processTexture.update();

		this.time += 0.02;
	}

	this.heats = [];

	this.lastPoint = undefined;

	this.mouseMove = function(e) {
		if(!this.isLoaded) return;

		var currentPoint = { 
			x: (e.pageX-$(option.target).offset().left) * (this.width/$(option.target).width()), 
			y: (e.pageY-$(option.target).offset().top) * (this.height/$(option.target).height())
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

			_this.processCtx.beginPath();
			_this.processCtx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
			_this.processCtx.fillStyle = gradient;
			_this.processCtx.fill();
		}

		this.lifeCount = function() {
			this.life--;
			this.wave = Math.sin(this.life/20) * 10;

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

	function getPerlinNoiseImage(width,height,resolution,time) {
		var perlinNoiseImage = $("<canvas>")[0];
		var perlinNoiseCtx = perlinNoiseImage.getContext("2d");
		perlinNoiseImage.width = width*resolution;
		perlinNoiseImage.height = height*resolution;

		var perlinNoiseImageData = perlinNoiseCtx.createImageData(perlinNoiseImage.width,perlinNoiseImage.height);

		for (var x = 0; x < perlinNoiseImage.width; x++) {
		  for (var y = 0; y < perlinNoiseImage.height; y++) {
		  	var value = noise.perlin3(x / (50*resolution), y / (50*resolution), time);

		  	value = (1.6+value) * 30;

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





//-----old------//

// var c = $(".screen")[0];
// var ctx = c.getContext("2d");

// var cOutput = $(".output")[0];
// var ctxOutput = cOutput.getContext("2d");


// var orgData;

// var isLoad = false;

// var imgGrayHand = new Image();
// imgGrayHand.onload = function () {
// 	isLoad = true;
// 	var w = imgGrayHand.width;
// 	var h = imgGrayHand.height;
// 	c.width = w;
// 	c.height = h;
// 	ctx.drawImage(imgGrayHand,0,0);

// 	orgData = ctx.getImageData(0,0,w,h);

// 	cOutput.width = w;
// 	cOutput.height = h;
// }
// // imgGrayHand.src = "assets/images/hand-gray2.png";
// imgGrayHand.src = "assets/images/b.png";


// var heats = [];

// var lastPoint;
// $("body").on("mousemove", function(e) {
// 	var currentPoint = { x: e.pageX-$(".output").offset().left, y: e.pageY-$(".output").offset().top };
// 	if(lastPoint !== undefined) {
// 		var dist = distanceBetween(lastPoint, currentPoint);
// 		var angle = angleBetween(lastPoint, currentPoint);

// 		for (var i = 0; i < dist; i+=15) {

// 			x = lastPoint.x + (Math.sin(angle) * i);
// 			y = lastPoint.y + (Math.cos(angle) * i);

// 			var heat = new Heat(x,y,heats.length);
// 			heats.push(heat);
// 		}

// 		lastPoint = currentPoint;
// 	} else {
// 		var heat = new Heat(currentPoint.x,currentPoint.y,heats.length);
// 		heats.push(heat);

// 		lastPoint = currentPoint;
// 	}

// 	// ctx.clearRect(0, 0, c.width, c.height);
// 	// ctx.drawImage(imgGrayHand,0,0);

// 	for (var i = 0; i < heats.length; i++) {
// 		if(heats[i] !== undefined) {
// 			// heats[i].draw();
// 			heats[i].lifeCount();
// 		}
		
// 	}

// })

// function distanceBetween(point1, point2) {
//   return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
// }
// function angleBetween(point1, point2) {
//   return Math.atan2( point2.x - point1.x, point2.y - point1.y );
// }

// function Heat(x,y,index) {
// 	this.x = x;
// 	this.y = y;
// 	this.index = index;
// 	this.life = 60;
// 	this.wave = 0;

// 	this.draw = function() {
// 		var innerRadius = 5;
// 		var outerRadius = 70*this.life/60 + 30;
// 		var radius = 70*this.life/60 + 30;
// 		var alpha = 0.15*this.life/60;
// 		if(this.index == heats.length - 1) {
// 			outerRadius = radius = 150+this.wave;
// 			alpha = 0.7+this.wave/100;
// 		}


// 		var gradient = ctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
// 		gradient.addColorStop(0, 'rgba(0,0,0,'+alpha+')');
// 		gradient.addColorStop(0.7, 'rgba(0,0,0,'+alpha/4+')');
// 		gradient.addColorStop(1, 'rgba(0,0,0,0)');

// 		ctx.beginPath();
// 		ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
// 		ctx.fillStyle = gradient;
// 		// ctx.beginPath();
// 		// ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
// 		// ctx.fillStyle = "#000";
// 		ctx.fill();
// 	}

// 	this.lifeCount = function() {
// 		this.life--;

// 		// if(this.life%3 == 0) {
// 		// 	this.wave = noise.perlin3(this.life, 0, height)*20;
// 		// }
// 		this.wave = Math.sin(this.life/20) * 10;

// 		if(this.life <= 0) {
// 			if(this.index != heats.length - 1) {
// 				this.dispose();
// 			}
// 		}
// 	}

// 	this.dispose = function() {
// 		heats[this.index] = undefined;
// 	}
// }




// function drawColorHand() {
// 	var w = c.width;
// 	var h = c.height;
// 	ctxOutput.clearRect(0, 0, w, h);
// 	var imageData = ctx.getImageData(0,0,w,h);

// 	var outputImageData = ctxOutput.createImageData(w, h);

// 	for (var i = 0; i < w*h*4; i+=4) {
// 		if(orgData.data[i+3] != 0) {
// 			var index = 99 - Math.ceil(imageData.data[i]*100/255);
// 			// var index = Math.ceil(imageData.data[i+3]*100/255) - 1;

// 			var newColor = colors[index];
// 			if( newColor !== undefined) {
// 				outputImageData.data[i] = newColor[0];
// 				outputImageData.data[i+1] = newColor[1];
// 				outputImageData.data[i+2] = newColor[2];
// 				outputImageData.data[i+3] = orgData.data[i+3];
// 			}
// 		}
// 	}
// 	ctxOutput.putImageData(outputImageData, 0, 0);
// }


// var height = 0;
// // var bgImageData;
// // var scaleUpCanvas = $("<canvas>")[0];
// // var scaleUpCtx = scaleUpCanvas.getContext("2d");
// var noiseScale = 5;
// function drawNoise() {
// 	var w = Math.floor(c.width/noiseScale);
// 	var h = Math.floor(c.height/noiseScale);
// 	var imageData = ctx.createImageData(w, h);

// 	// var max = -Infinity, min = Infinity;

// 	for (var x = 0; x < w; x++) {
// 	  for (var y = 0; y < h; y++) {
// 	  	var value = noise.perlin3(x / (50/noiseScale), y / (50/noiseScale), height);

// 	  	// if (max < value) max = value;
// 	  	// if (min > value) min = value;

// 	  	// if(value>=0) {

// 	  	// 	imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 255;
// 	  	// } else {
// 	  	// 	value = -value;
// 	  	// 	imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 0;
// 	  	// }

// 	  	// console.log(value);

// 	  	value = (1.6+value) * 30;
// 	  	// value = value * 200;

// 	  	var cell = (x + y * w) * 4;
// 	  	// imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 255;
// 	  	imageData.data[cell + 3] = value;
// 	  }
// 	}

// 	var scaleUpCanvas = $("<canvas>")[0];
// 	var scaleUpCtx = scaleUpCanvas.getContext("2d");

// 	scaleUpCanvas.width = c.width;
// 	scaleUpCanvas.height = c.height;
// 	scaleUpCtx.putImageData(imageData, 0, 0);
// 	scaleUpCtx.scale(noiseScale,noiseScale);
// 	scaleUpCtx.drawImage(scaleUpCanvas, 0, 0);

// 	ctx.drawImage(scaleUpCanvas, 0, 0);

// 	// bgImageData = imageData;

// 	height += 0.03;



// }

// var count = 0;
// function draw() {
// 	requestAnimationFrame(draw);

// 	if(count++%2 == 0) {
// 		if(isLoad) {
// 			ctx.clearRect(0, 0, c.width, c.height);
			
// 			ctx.drawImage(imgGrayHand,0,0);
// 			drawNoise();

// 			for (var i = 0; i < heats.length; i++) {
// 				if(heats[i] !== undefined) {
// 					heats[i].draw();
// 					heats[i].lifeCount();
// 				}
				
// 			}

// 			drawColorHand();

// 			// $(cOutput).css("filter",'blur('+(Math.sin(count/30)+1)*50+'px)');
// 			// $(cOutput).css("opacity",(Math.cos(count/30)+1)/2);
// 			// var imageData = ctxOutput.getImageData(0,0,c.width, c.height);

// 			// var temp = cOutput;
// 			// ctxOutput.clearRect(0, 0, c.width, c.height);
// 			// ctxOutput.putImageData(imageData, 0, 0)
			
// 		}
// 	}
	

	
// }
// draw();



// $("body").on("mousemove", function(e) {
// 	$(".cursor").css({
// 		top: e.pageY + "px",
// 		left: e.pageX + "px"
// 	})
// })


//stat
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()


