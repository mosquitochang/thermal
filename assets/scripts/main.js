var colors = [];

var imgColors = new Image();
imgColors.onload = function () {
	var canvasColors = document.createElement("canvas");
	var ctxColors = canvasColors.getContext("2d");
	var w = imgColors.width;
	var h = imgColors.height;
	canvasColors.width = w;
	canvasColors.height = h;
	ctxColors.drawImage(imgColors,0,0);

	var imageData = ctxColors.getImageData(0,0,w,h);

	for (var i = 0; i < w*4; i+=4) {
		var color = tinycolor({r:imageData.data[i], g:imageData.data[i+1], b:imageData.data[i+2]});
		colors.push(color);
	}
}
imgColors.src = "assets/images/color-mini.png";


var c = $(".screen")[0];
var ctx = c.getContext("2d");

var handColors = [];
var outputColors = [];

var handTemperture = [];

// var imgHand = new Image();
// imgHand.onload = function () {
// 	var w = imgHand.width;
// 	var h = imgHand.height;
// 	c.width = w;
// 	c.height = h;
// 	ctx.drawImage(imgHand,0,0);

// 	var imageData = ctx.getImageData(0,0,w,h);
// 	// console.log(imageData);



// 	var cOutput = $(".output")[0];
// 	var ctxOutput = cOutput.getContext("2d");
// 	cOutput.width = w;
// 	cOutput.height = h;
// 	var outputImageData = ctxOutput.createImageData(w, h);

// 	for (var i = 0; i < w*h*4; i+=4) {
// 		var color = tinycolor({r:imageData.data[i], g:imageData.data[i+1], b:imageData.data[i+2], a:imageData.data[i+3]});
// 		handColors.push(color);

// 		if(color.getAlpha() != 0) {
// 			// console.log("!");
// 			// outputImageData.data[i] = 0;
// 			// outputImageData.data[i+1] = 0;
// 			// outputImageData.data[i+2] = 0;
// 			// outputImageData.data[i+3] = 255;

// 			var diffs = [];
// 			for (var j = 0; j < colors.length; j++) {
// 				diffs.push(getDiffDeltaE(color,colors[j]));
// 			}
// 			var minDiff = Math.min(...diffs);
// 			var index = diffs.indexOf(minDiff);

// 			// console.log(percent);

// 			outputImageData.data[i+3] = 255*index/100;

// 			// var newColor = colors[index];

// 			// outputImageData.data[i] = newColor.toRgb().r;
// 			// outputImageData.data[i+1] = newColor.toRgb().g;
// 			// outputImageData.data[i+2] = newColor.toRgb().b;
// 			// outputImageData.data[i+3] = 255;

// 			handTemperture.push(index);


// 		} else {
// 			handTemperture.push(-1);
// 		}
// 	}

// 	// console.log(outputImageData);

// 	ctxOutput.putImageData(outputImageData, 0, 0);
// }
// imgHand.src = "assets/images/hand.png";


function getDiff(color1,color2) {
	return 2*Math.pow(color1.toRgb().r - color2.toRgb().r,2) + 4*Math.pow(color1.toRgb().g - color2.toRgb().g,2) + 3*Math.pow(color1.toRgb().b - color2.toRgb().b,2);
}

function getDiffDeltaE(color1,color2) {
	return DeltaE.getDeltaE00(toLab(color1), toLab(color2));
}





function toLab(color) {
	var r = color.toRgb().r / 255.000; // rgb range: 0 ~ 1
	var g = color.toRgb().g / 255.000;
	var b = color.toRgb().b / 255.000;
	// gamma 2.2
	if ( r > 0.04045 ){
		r = Math.pow(( r + 0.055 ) / 1.055, 2.4);
	} else {
		r = r / 12.92;
	}
	if ( g > 0.04045 ){
		g = Math.pow(( g + 0.055 ) / 1.055, 2.4);
	} else {
		g = g / 12.92;
	}
	if ( b > 0.04045 ){
		b = Math.pow(( b + 0.055 ) / 1.055, 2.4);
	} else {
		b = b / 12.92;
	}
	// sRGB
	var X = r * 0.436052025 + g * 0.385081593 + b * 0.143087414;
	var Y = r * 0.222491598 + g * 0.716886060 + b * 0.060621486;
	var Z = r * 0.013929122 + g * 0.097097002 + b * 0.714185470;
	// XYZ range: 0~100
	X = X * 100.000;
	Y = Y * 100.000;
	Z = Z * 100.000;
	// Reference White Point
	var ref_X = 96.4221;
	var ref_Y = 100.000;
	var ref_Z = 82.5211;
	X = X / ref_X;
	Y = Y / ref_Y;
	Z = Z / ref_Z;
	// Lab
	if (X > 0.008856){
		X = Math.pow(X, 1/3.000);
	} else {
		X = ( 7.787 * X ) + ( 16 / 116.000 );
	}
	if (Y > 0.008856){
		Y = Math.pow(Y, 1/3.000);
	} else {
		Y = ( 7.787 * Y ) + ( 16 / 116.000 );
	}
	if (Z > 0.008856){
		Z = Math.pow(Z, 1/3.000);
	} else {
		Z = ( 7.787 * Z ) + ( 16 / 116.000 );
	}

	var lab_L = ( 116.000 * Y ) - 16.000;
	var lab_A = 500.000 * ( X - Y );
	var lab_B = 200.000 * ( Y - Z );

	return {L: lab_L, A: lab_A , B: lab_B};

}






noise.seed(Math.random());

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
	// console.log(imageData);

	cOutput.width = w;
	cOutput.height = h;
	// var outputImageData = ctxOutput.createImageData(w, h);

	// for (var i = 0; i < w*h*4; i+=4) {
	// 	// var color = tinycolor({r:orgData.data[i], g:orgData.data[i+1], b:orgData.data[i+2], a:orgData.data[i+3]});
	// 	// handColors.push(color);

	// 	if(orgData.data[i+3] != 0) {
	// 		// var index = 100 - Math.ceil(orgData.data[i]*100/255);
	// 		var index = Math.ceil(orgData.data[i+3]*100/255) - 1;

	// 		var newColor = colors[index];
	// 		if( newColor !== undefined) {
	// 			outputImageData.data[i] = newColor.toRgb().r;
	// 			outputImageData.data[i+1] = newColor.toRgb().g;
	// 			outputImageData.data[i+2] = newColor.toRgb().b;
	// 			outputImageData.data[i+3] = 255;
	// 		}
	// 	} 
	// }

	// ctxOutput.putImageData(outputImageData, 0, 0);
}
imgGrayHand.src = "assets/images/hand-gray.png";
// imgGrayHand.src = "assets/images/1.png";


var heats = [];

var lastPoint;
$("body").on("mousemove", function(e) {
	var currentPoint = { x: e.clientX-$(".output").offset().left, y: e.clientY-$(".output").offset().top };
	if(lastPoint !== undefined) {
		var dist = distanceBetween(lastPoint, currentPoint);
		var angle = angleBetween(lastPoint, currentPoint);

		for (var i = 0; i < dist; i+=15) {

			x = lastPoint.x + (Math.sin(angle) * i);
			y = lastPoint.y + (Math.cos(angle) * i);

			var heat = new Heat(x,y,heats.length);
			heats.push(heat);
		}

		lastPoint = currentPoint;
	} else {
		var heat = new Heat(currentPoint.x,currentPoint.y,heats.length);
		heats.push(heat);

		// lastPoint = currentPoint;
	}
	



	

	// ctx.clearRect(0, 0, c.width, c.height);
	// ctx.drawImage(imgGrayHand,0,0);

	for (var i = 0; i < heats.length; i++) {
		if(heats[i] !== undefined) {
			// heats[i].draw();
			heats[i].lifeCount();
		}
		
	}
})

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
			alpha = 0.7;
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
		this.wave = Math.sin(this.life/10) * 10;

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
		// var color = tinycolor({r:imageData.data[i], g:imageData.data[i+1], b:imageData.data[i+2], a:imageData.data[i+3]});
		// handColors.push(color);

		if(orgData.data[i+3] != 0) {
			// var index = 100 - Math.ceil(imageData.data[i]*100/255);
			var index = Math.ceil(imageData.data[i+3]*100/255) - 1;

			var newColor = colors[index];
			if( newColor !== undefined) {
				outputImageData.data[i] = newColor.toRgb().r;
				outputImageData.data[i+1] = newColor.toRgb().g;
				outputImageData.data[i+2] = newColor.toRgb().b;
				outputImageData.data[i+3] = 255;
			}
		}
	}
	ctxOutput.putImageData(outputImageData, 0, 0);
}

var height = 0;
var bgImageData;
function drawBackGround() {
	// count++;
	// var start = Date.now();
	var w = c.width;
	var h = c.height;
	var imageData = ctx.createImageData(w, h);

	var max = -Infinity, min = Infinity;

	for (var x = 0; x < w; x++) {
	  for (var y = 0; y < h; y++) {
	  	var value = noise.perlin3(x / 50, y / 50, height);

	  	if (max < value) max = value;
	  	if (min > value) min = value;

	  	// if(value>=0) {

	  	// 	imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 255;
	  	// } else {
	  	// 	value = -value;
	  	// 	imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 0;
	  	// }

	  	value = (1.6+value) * 1.1 * 20;

	  	var cell = (x + y * w) * 4;
	  	// imageData.data[cell] = imageData.data[cell + 1] = imageData.data[cell + 2] = 255;
	  	imageData.data[cell + 3] = value;
	  }
	}

	ctx.putImageData(imageData, 0, 0);

	bgImageData = imageData;

	height += 0.03;



}

var count = 0;
function draw() {
	requestAnimationFrame(draw);

	if(isLoad) {
		ctx.clearRect(0, 0, c.width, c.height);
		drawBackGround();
		ctx.drawImage(imgGrayHand,0,0);

		for (var i = 0; i < heats.length; i++) {
			if(heats[i] !== undefined) {
				heats[i].draw();
				heats[i].lifeCount();
			}
			
		}

		drawColorHand();
		
	}

	
}
draw();

//stat
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()


