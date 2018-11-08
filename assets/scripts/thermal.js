noise.seed(Math.random());
var colors = [[0,0,1],[0,7,16],[0,15,31],[0,24,47],[0,31,63],[0,39,78],[0,47,94],[0,55,109],[0,63,125],[0,71,139],[0,80,156],[0,86,170],[0,95,186],[0,102,201],[0,111,216],[0,118,228],[0,130,225],[0,139,224],[0,150,222],[0,158,220],[0,168,218],[0,178,217],[0,189,215],[0,199,214],[0,208,212],[0,219,210],[0,228,208],[0,238,206],[7,238,194],[17,238,180],[25,238,168],[34,238,157],[41,238,144],[50,238,132],[58,238,120],[68,238,107],[76,238,94],[84,238,83],[93,238,70],[101,238,59],[109,238,46],[118,238,34],[127,238,21],[136,238,8],[144,239,0],[153,241,0],[163,244,0],[173,245,0],[183,248,0],[192,250,0],[201,252,0],[211,255,0],[222,255,0],[230,255,0],[240,255,0],[250,255,0],[255,255,0],[255,255,0],[255,255,0],[255,255,0],[255,251,0],[255,245,0],[255,240,0],[255,234,0],[255,229,0],[255,223,0],[255,218,0],[255,211,0],[255,206,0],[255,202,0],[255,196,0],[255,191,0],[255,185,0],[255,179,0],[255,167,0],[255,153,0],[255,141,0],[255,129,0],[255,116,0],[255,103,0],[255,90,0],[255,77,0],[255,65,0],[255,53,0],[255,40,0],[255,28,0],[255,14,0],[255,0,0],[255,16,11],[255,36,31],[255,54,51],[255,76,72],[255,94,92],[255,118,115],[255,136,135],[255,162,161],[255,182,181],[255,202,201],[255,220,216],[255,237,244]];


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
// 	}
// 	console.log(JSON.stringify(colors));
// }
// imgColors.src = "assets/images/color-mini.png";

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


var count = 0;
var noiseMap;
function draw() {
	requestAnimationFrame(draw);

	if(count++%2 == 0) {
		noiseMap = getPerlinNoiseImage(512,512,0.1,count/50);

		for (var i = 0; i < thermals.length; i++) {
			thermals[i].update();
		}
	}
}
draw();





function Thermal(option) {
	var _this = this;

	this.targetCanvas = option.target;
	this.targetCtx = this.targetCanvas.getContext("2d");

	this.processCanvas = $("<canvas>")[0];
	this.processCtx = this.processCanvas.getContext("2d");

	this.width = this.height = undefined;

	this.colorArray = colors;

	this.orgData = undefined;

	this.debug = option.debug || false;

	this.time = 0;

	this.processImageData = undefined;
	this.colorImageData = undefined;

	this.imageSourse = new Image();
	this.imageSourse.onload = init;
	this.imageSourse.src = option.src;

	this.isLoaded = false;

	function init() {
		_this.width = _this.targetCanvas.width = _this.processCanvas.width = _this.imageSourse.width;
		_this.height = _this.targetCanvas.height = _this.processCanvas.height = _this.imageSourse.height;

		_this.processCtx.drawImage(_this.imageSourse,0,0);

		_this.orgData = _this.processCtx.getImageData(0,0,_this.width,_this.height);

		_this.colorImageData = _this.processCtx.createImageData(_this.width, _this.height);

		_this.isLoaded = true;

		_this.update();
	}

	this.update = function() {
		if(!this.isLoaded) return;

		this.processCtx.putImageData(this.orgData, 0, 0);
		// this.processCtx.drawImage(getPerlinNoiseImage(this.width,this.height,0.2,this.time/50),0,0);
		this.processCtx.drawImage(noiseMap,0,0,this.width,this.height);

		// var nowProcessImageData = this.processCtx.getImageData(0,0,this.width,this.height);
		this.processImageData = this.processCtx.getImageData(0,0,this.width,this.height);
		this.targetCtx.putImageData(this.processImageData, 0, 0);


		// var colorImageData = this.getImageDataFromGrayToColor(nowProcessImageData);
		// this.targetCtx.putImageData(colorImageData, 0, 0);

		// this.getImageDataFromGrayToColor(this.processImageData);
		// this.targetCtx.putImageData(this.colorImageData, 0, 0);


		if(this.debug) {
			this.targetCtx.putImageData(this.processImageData, 0, 0);
		}

		// this.time++;
	}

	this.getImageDataFromGrayToColor = function(grayImageData) {
		// var colorImageData = this.processCtx.createImageData(this.width, this.height);

		var allImageDataAmount = this.width * this.height * 4;

		for (var i = 0; i < allImageDataAmount; i+=4) {

			if(this.orgData.data[i+3] != 0) {
				var index = 99 - Math.ceil(grayImageData.data[i]*100/255);
				var newColor = this.colorArray[index];
				if( newColor !== undefined) {
					this.colorImageData.data[i] = newColor[0];
					this.colorImageData.data[i+1] = newColor[1];
					this.colorImageData.data[i+2] = newColor[2];
					this.colorImageData.data[i+3] = this.orgData.data[i+3];
				}
			}
		}

		// return colorImageData;
	}
}


// var perlinNoiseImageData = perlinNoiseCtx.createImageData(50,50);
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







//-----old------//

var c = $(".screen")[0];
var ctx = c.getContext("2d");

var cOutput = $(".output")[0];
var ctxOutput = cOutput.getContext("2d");


var orgData;

var isLoad = false;

var imgGrayHand = new Image();
imgGrayHand.onload = function () {
	isLoad = true;
	var w = imgGrayHand.width;
	var h = imgGrayHand.height;
	c.width = w;
	c.height = h;
	ctx.drawImage(imgGrayHand,0,0);

	orgData = ctx.getImageData(0,0,w,h);

	cOutput.width = w;
	cOutput.height = h;
}
imgGrayHand.src = "assets/images/hand-gray2.png";
// imgGrayHand.src = "assets/images/b.png";


var heats = [];

var lastPoint;
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


// 	// $(".cursor").css({
// 	// 	top: e.clientY + "px",
// 	// 	left: e.clientX + "px"
// 	// })
// })

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
	this.life = 60;
	this.wave = 0;

	this.draw = function() {
		var innerRadius = 5;
		var outerRadius = 70*this.life/60 + 30;
		var radius = 70*this.life/60 + 30;
		var alpha = 0.15*this.life/60;
		if(this.index == heats.length - 1) {
			outerRadius = radius = 150+this.wave;
			alpha = 0.7+this.wave/100;
		}


		var gradient = ctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
		gradient.addColorStop(0, 'rgba(0,0,0,'+alpha+')');
		gradient.addColorStop(0.7, 'rgba(0,0,0,'+alpha/4+')');
		gradient.addColorStop(1, 'rgba(0,0,0,0)');

		ctx.beginPath();
		ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		// ctx.beginPath();
		// ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
		// ctx.fillStyle = "#000";
		ctx.fill();
	}

	this.lifeCount = function() {
		this.life--;

		// if(this.life%3 == 0) {
		// 	this.wave = noise.perlin3(this.life, 0, height)*20;
		// }
		this.wave = Math.sin(this.life/20) * 10;

		if(this.life <= 0) {
			if(this.index != heats.length - 1) {
				this.dispose();
			}
		}
	}

	this.dispose = function() {
		heats[this.index] = undefined;
	}
}




function drawColorHand() {
	var w = c.width;
	var h = c.height;
	ctxOutput.clearRect(0, 0, w, h);
	var imageData = ctx.getImageData(0,0,w,h);

	var outputImageData = ctxOutput.createImageData(w, h);

	for (var i = 0; i < w*h*4; i+=4) {
		if(orgData.data[i+3] != 0) {
			var index = 99 - Math.ceil(imageData.data[i]*100/255);
			// var index = Math.ceil(imageData.data[i+3]*100/255) - 1;

			var newColor = colors[index];
			if( newColor !== undefined) {
				outputImageData.data[i] = newColor[0];
				outputImageData.data[i+1] = newColor[1];
				outputImageData.data[i+2] = newColor[2];
				outputImageData.data[i+3] = orgData.data[i+3];
			}
		}
	}
	ctxOutput.putImageData(outputImageData, 0, 0);
}


var height = 0;
// var bgImageData;
// var scaleUpCanvas = $("<canvas>")[0];
// var scaleUpCtx = scaleUpCanvas.getContext("2d");
var noiseScale = 5;
function drawNoise() {
	var w = Math.floor(c.width/noiseScale);
	var h = Math.floor(c.height/noiseScale);
	var imageData = ctx.createImageData(w, h);

	// var max = -Infinity, min = Infinity;

	for (var x = 0; x < w; x++) {
	  for (var y = 0; y < h; y++) {
	  	var value = noise.perlin3(x / (50/noiseScale), y / (50/noiseScale), height);

	  	// if (max < value) max = value;
	  	// if (min > value) min = value;

	  	// if(value>=0) {

	  	// 	imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 255;
	  	// } else {
	  	// 	value = -value;
	  	// 	imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 0;
	  	// }

	  	// console.log(value);

	  	value = (1.6+value) * 30;
	  	// value = value * 200;

	  	var cell = (x + y * w) * 4;
	  	// imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 255;
	  	imageData.data[cell + 3] = value;
	  }
	}

	var scaleUpCanvas = $("<canvas>")[0];
	var scaleUpCtx = scaleUpCanvas.getContext("2d");

	scaleUpCanvas.width = c.width;
	scaleUpCanvas.height = c.height;
	scaleUpCtx.putImageData(imageData, 0, 0);
	scaleUpCtx.scale(noiseScale,noiseScale);
	scaleUpCtx.drawImage(scaleUpCanvas, 0, 0);

	ctx.drawImage(scaleUpCanvas, 0, 0);

	// bgImageData = imageData;

	height += 0.03;



}

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


