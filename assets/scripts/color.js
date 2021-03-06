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

	var imageData = ctxColors.getImageData(0,0,w,1);
	console.log(imageData);


	for (var i = 0; i < w*4; i+=(w*4/10)) {
		console.log(i);
		var color = [imageData.data[i],imageData.data[i+1],imageData.data[i+2],imageData.data[i+3]];
		colors.push(color);
	}
	var color = [imageData.data[imageData.data.length-4],imageData.data[imageData.data.length-3],imageData.data[imageData.data.length-2],imageData.data[imageData.data.length-1]];
	colors.push(color);


	console.log(JSON.stringify(colors),colors.length);

	var glsl = [];
	for (var i = colors.length-1; i >= 0; i--) {
		var string = `#define C_${i} vec3(${(colors[i][0]/255).toFixed(4)},${(colors[i][1]/255).toFixed(4)},${(colors[i][2]/255).toFixed(4)})`;
		glsl.push(string);

		console.log(string);
	}

}
imgColors.src = "assets/images/c2.png";


// // var colors = [[0,16,33,255],[0,55,106,255],[0,94,190,255],[1,138,224,255],[0,190,216,255],[3,232,199,255],[42,239,146,255],[84,237,80,255],[126,238,24,255],[171,245,0,255],[223,254,2,255],[254,255,0,255],[255,240,0,255],[255,212,0,255],[255,183,0,255],[255,130,1,255],[255,65,9,255],[255,0,0,255],[255,95,92,255],[255,203,203,255],[0,16,33,255]];
// var colors = [[0,0,1,255],[0,80,156,255],[0,168,218,255],[25,238,168,255],[109,238,46,255],[201,252,0,255],[255,251,0,255],[255,196,0,255],[255,90,0,255],[255,54,51,255],[255,244,247,255]];
// var colors = [[255,255,243,255],[255,238,41,255],[255,196,0,255],[255,149,0,255],[255,97,0,255],[244,30,81,255],[207,0,143,255],[135,0,162,255],[62,0,144,255],[0,9,20,255],[0,9,19,255]];


// var glsl = [];
// for (var i = colors.length-1; i >= 0; i--) {
// 	var string = `#define C_${i} vec3(${(colors[i][0]/255).toFixed(4)},${(colors[i][1]/255).toFixed(4)},${(colors[i][2]/255).toFixed(4)})`;
// 	glsl.push(string);

// 	console.log(string);
// }

// #define C_10 vec4(0.0000,0.0353,0.0745, 1.0)
// #define C_9 vec4(0.0000,0.0353,0.0784, 1.0)
// #define C_8 vec4(0.2431,0.0000,0.5647, 1.0)
// #define C_7 vec4(0.5294,0.0000,0.6353, 1.0)
// #define C_6 vec4(0.8118,0.0000,0.5608, 1.0)
// #define C_5 vec4(0.9569,0.1176,0.3176, 1.0)
// #define C_4 vec4(1.0000,0.3804,0.0000, 1.0)
// #define C_3 vec4(1.0000,0.5843,0.0000, 1.0)
// #define C_2 vec4(1.0000,0.7686,0.0000, 1.0)
// #define C_1 vec4(1.0000,0.9333,0.1608, 1.0)
// #define C_0 vec4(1.0000,1.0000,0.9529, 1.0)

//c1
// #define C_10 vec3(0.0980,0.0667,0.3373)
// #define C_9 vec3(0.1961,0.0471,0.6706)
// #define C_8 vec3(0.4039,0.0824,0.8078)
// #define C_7 vec3(0.6706,0.1373,0.8078)
// #define C_6 vec3(0.8941,0.2510,0.6824)
// #define C_5 vec3(0.9725,0.5216,0.1725)
// #define C_4 vec3(0.9922,0.6196,0.0039)
// #define C_3 vec3(0.9882,0.7490,0.0353)
// #define C_2 vec3(0.9647,0.6745,0.2039)
// #define C_1 vec3(0.9608,0.5255,0.2667)
// #define C_0 vec3(0.9882,0.3216,0.0941)


//c2
// #define C_10 vec3(0.0980,0.0667,0.3451)
// #define C_9 vec3(0.1961,0.0471,0.6784)
// #define C_8 vec3(0.4118,0.0824,0.8118)
// #define C_7 vec3(0.6745,0.1373,0.8078)
// #define C_6 vec3(0.8941,0.2549,0.6745)
// #define C_5 vec3(0.9725,0.5255,0.1608)
// #define C_4 vec3(0.9922,0.6196,0.0039)
// #define C_3 vec3(0.9882,0.7490,0.0353)
// #define C_2 vec3(0.9647,0.6706,0.2078)
// #define C_1 vec3(0.9569,0.7137,0.2627)
// #define C_0 vec3(0.9961,0.9765,0.0863)


// console.log(glsl);


// var colorStrings = [];
// for (var i = 0; i < colors.length; i++) {
// 	var colorString = `rgb(${colors[i][0]},${colors[i][1]},${colors[i][2]})`;
// 	colorStrings.push(colorString);
// }

// console.log(colorStrings);

// var css = `linear-gradient(to top,${colorStrings[0]},${colorStrings[1]},${colorStrings[2]},${colorStrings[3]},${colorStrings[4]},${colorStrings[5]},${colorStrings[6]},${colorStrings[7]},${colorStrings[8]},${colorStrings[9]},${colorStrings[10]})`;
// console.log(css);

// $("header").css({
// 	"background": css
// });