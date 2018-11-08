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
		// var color = tinycolor({r:imageData.data[i], g:imageData.data[i+1], b:imageData.data[i+2]});
		var color = [imageData.data[i],imageData.data[i+1],imageData.data[i+2],imageData.data[i+3]];
		colors.push(color);
	}
}
imgColors.src = "assets/images/color-mini.png";


var c = $(".screen")[0];
var ctx = c.getContext("2d");

var handColors = [];
var outputColors = [];

var handTemperture = [];

var imgHand = new Image();
imgHand.onload = function () {
	var w = imgHand.width;
	var h = imgHand.height;
	c.width = w;
	c.height = h;
	ctx.drawImage(imgHand,0,0);

	var imageData = ctx.getImageData(0,0,w,h);

	var cOutput = $(".output")[0];
	var ctxOutput = cOutput.getContext("2d");
	cOutput.width = w;
	cOutput.height = h;
	var outputImageData = ctxOutput.createImageData(w, h);

	for (var i = 0; i < w*h*4; i+=4) {
		var color = [imageData.data[i],imageData.data[i+1],imageData.data[i+2],imageData.data[i+3]];
		// tinycolor({r:imageData.data[i], g:imageData.data[i+1], b:imageData.data[i+2], a:imageData.data[i+3]});

		if(color[3] != 0) {

			var diffs = [];
			for (var j = 0; j < colors.length; j++) {
				diffs.push(getDiffDeltaE(color,colors[j]));
			}
			var minDiff = Math.min(...diffs);
			var index = diffs.indexOf(minDiff);

			outputImageData.data[i] = outputImageData.data[i+1] = outputImageData.data[i+2] = 255 - (255*index/100);
			outputImageData.data[i+3] = 255;

		} 
	}

	ctxOutput.putImageData(outputImageData, 0, 0);
}
imgHand.src = "assets/images/hand.png";


// function getDiff(color1,color2) {
// 	return 2*Math.pow(color1.toRgb().r - color2.toRgb().r,2) + 4*Math.pow(color1.toRgb().g - color2.toRgb().g,2) + 3*Math.pow(color1.toRgb().b - color2.toRgb().b,2);
// }

function getDiffDeltaE(color1,color2) {
	return DeltaE.getDeltaE00(toLab(color1), toLab(color2));
}

function toLab(color) {
	var r = color[0] / 255.000; // rgb range: 0 ~ 1
	var g = color[1] / 255.000;
	var b = color[2] / 255.000;
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
